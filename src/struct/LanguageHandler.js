const { AkairoHandler } = require('discord-akairo');
const { Collection } = require('discord.js');
const Language = require('./Language');
const Queue = require('./Queue');
const childProcess = require('child_process');
const util = require('util');
const path = require('path');

const exec = util.promisify(childProcess.exec);

class LanguageHandler extends AkairoHandler {
    constructor(client, {
        directory,
        classToHandle = Language,
        extensions = ['.js', '.ts'],
        automateCategories,
        loadFilter = filepath =>
            !this.client.config.languages || this.client.config.languages.includes(path.parse(filepath).name)
    }) {
        super(client, {
            directory,
            classToHandle,
            extensions,
            automateCategories,
            loadFilter
        });

        this.aliases = new Collection();
        this.containers = new Collection();
        this.queues = new Collection();
    }

    register(language, filepath) {
        super.register(language, filepath);

        for (let alias of language.aliases) {
            const conflict = this.aliases.get(alias.toLowerCase());
            if (conflict) {
                throw new TypeError(`Alias conflict of ${alias} between ${language.id} and ${conflict}`);
            }

            alias = alias.toLowerCase();
            this.aliases.set(alias, language.id);
        }
    }

    deregister(language) {
        for (let alias of language.aliases) {
            alias = alias.toLowerCase();
            this.aliases.delete(alias);
        }

        super.deregister(language);
    }

    findLanguage(alias) {
        return this.modules.get(this.aliases.get(alias.toLowerCase()));
    }

    async buildDocker() {
        if (this.client.config.parallel) {
            await Promise.all(this.modules.map(({ loads }) => Promise.all(loads.map(dockerID => this.buildImage(dockerID)))));
            return;
        }

        for (const { loads } of this.modules.values()) {
            for (const dockerID of loads) {
                // eslint-disable-next-line no-await-in-loop
                await this.buildImage(dockerID);
            }
        }

        if (this.client.config.cleanup > 0) {
            setInterval(() => this.cleanup().catch(() => null), this.client.config.cleanup * 60 * 1000);
        }
    }

    async buildImage(dockerID) {
        const folder = path.join(__dirname, '../../docker', dockerID);
        await util.promisify(childProcess.exec)(`docker build -t "1computer1/comp_iler:${dockerID}" ${folder}`);
        // eslint-disable-next-line no-console
        console.log(`Built image 1computer1/comp_iler:${dockerID}.`);
        const concurrent = this.getCompilerConfig(dockerID, 'concurrent', 'number');
        this.queues.set(dockerID, { evalQueue: new Queue(concurrent), setupQueue: new Queue(1) });
        if (this.client.config.prepare) {
            await this.setupContainer(dockerID);
        }
    }

    async setupContainer(dockerID) {
        if (this.containers.has(dockerID)) {
            return this.containers.get(dockerID);
        }

        const cpus = this.getCompilerConfig(dockerID, 'cpus', 'string');
        const memory = this.getCompilerConfig(dockerID, 'memory', 'string');
        const name = `comp_iler-${dockerID}-${Date.now()}`;
        try {
            await exec([
                `docker run --rm --name=${name}`,
                '-u1000:1000 -w/tmp/ -dt',
                `--net=none --cpus=${cpus} -m=${memory} --memory-swap=${memory}`,
                `1computer1/comp_iler:${dockerID} /bin/sh`
            ].join(' '));

            await exec(`docker exec ${name} mkdir eval`);
            await exec(`docker exec ${name} chmod 711 eval`);
            this.containers.set(dockerID, { name });
            // eslint-disable-next-line no-console
            console.log(`Started container ${name}.`);
            return this.containers.get(dockerID);
        } catch (err) {
            throw err;
        }
    }

    evalCode({ language, code, options, retries = 0 }) {
        const { id: dockerID = language.id, env = {} } = language.runWith(options);
        const { evalQueue, setupQueue } = this.queues.get(dockerID);
        return evalQueue.enqueue(async () => {
            const { name } = await setupQueue.enqueue(() => this.setupContainer(dockerID));
            const now = Date.now();
            await exec(`docker exec ${name} mkdir eval/${now}`);
            await exec(`docker exec ${name} chmod 777 eval/${now}`);
            const proc = childProcess.spawn('docker', [
                'exec', '-u1001:1001', `-w/tmp/eval/${now}`,
                ...Object.entries(env).map(([k, v]) => `-e${k}=${v}`),
                name, '/bin/sh', '/var/run/run.sh', code
            ]);

            const timeout = this.getCompilerConfig(dockerID, 'timeout', 'number');
            try {
                const result = await this.handleSpawn(proc, timeout);
                await exec(`docker exec ${name} rm -rf eval/${now}`);
                return result;
            } catch (err) {
                this.containers.delete(dockerID);
                try {
                    await this.kill(name);
                } catch (err2) {
                    // The container was not alive to be killed, i.e. multiple evals were occuring,
                    // one of them caused the container to be killed, the remaining evals all fail.
                    // Retry those remaining ones until they work!
                    if (retries < this.getCompilerConfig(dockerID, 'retries', 'number')) {
                        return this.evalCode({ language, code, options, retries: retries + 1 });
                    }
                }

                throw err;
            }
        });
    }

    handleSpawn(proc, timeout = null) {
        return new Promise((resolve, reject) => {
            let handled = false;
            if (timeout !== null) {
                setTimeout(() => {
                    handled = true;
                    reject(new Error('Timed out'));
                }, timeout);
            }

            let output = '';
            let hasStderr = false;
            let error;
            proc.stdout.on('data', chunk => {
                output += chunk;
            });

            proc.stderr.on('data', chunk => {
                hasStderr = true;
                output += chunk;
            });

            proc.on('error', e => {
                error = e;
            });

            proc.on('close', status => {
                if (!handled) {
                    handled = true;
                    if (status !== 0 || error) {
                        if (!error) {
                            error = new Error(output || 'Something went wrong');
                        }

                        reject(error);
                    } else {
                        resolve({ output, hasStderr });
                    }
                }
            });
        });
    }

    async kill(name) {
        let cmd;
        if (process.platform === 'win32') {
            cmd = `docker kill --signal=9 ${name} >nul 2>nul`;
        } else {
            cmd = `docker kill --signal=9 ${name} >/dev/null 2>/dev/null`;
        }

        await exec(cmd);
        // eslint-disable-next-line no-console
        console.log(`Killed container ${name}.`);
    }

    cleanup() {
        return Promise.all(this.containers.map(({ name }) => this.kill(name)));
    }

    getCompilerConfig(dockerID, key, type) {
        const o = this.client.config[key];
        return typeof o === type
            ? o
            : o[dockerID] !== undefined
                ? o[dockerID]
                : o.default;
    }
}

module.exports = LanguageHandler;
