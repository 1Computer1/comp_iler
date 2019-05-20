const { AkairoHandler } = require('discord-akairo');
const { Collection } = require('discord.js');
const Language = require('./Language');
const Queue = require('./Queue');
const childProcess = require('child_process');
const util = require('util');
const path = require('path');

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
            if (conflict) throw new TypeError(`Alias conflict of ${alias} between ${language.id} and ${conflict}`);

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
    }

    async buildImage(dockerID) {
        const folder = path.join(__dirname, '../../docker', dockerID);
        await util.promisify(childProcess.exec)(`docker build -t "1computer1/comp_iler:${dockerID}" ${folder}`);
        // eslint-disable-next-line no-console
        console.log(`Built image 1computer1/comp_iler:${dockerID}.`);
        this.queues.set(dockerID, new Queue(10));
        if (this.client.config.prepare) {
            await this.setupContainer(dockerID);
        }
    }

    async setupContainer(dockerID) {
        if (this.containers.has(dockerID)) {
            return this.containers.get(dockerID);
        }

        const name = `comp_iler-${dockerID}-${Date.now()}`;
        const proc = childProcess.spawn('docker', [
            'run', '--rm', `--name=${name}`, '-u1000', '-w/tmp/', '-dt',
            '--net=none', `--cpus=${this.client.config.cpus}`,
            `-m=${this.client.config.memory}`, `--memory-swap=${this.client.config.memory}`,
            `1computer1/comp_iler:${dockerID}`, '/bin/sh'
        ]);

        try {
            await this.handleSpawn(proc);
            this.containers.set(dockerID, { name, count: 0 });
            console.log(`Started container ${name} for 1computer1/comp_iler:${dockerID}.`);
            return this.containers.get(dockerID);
        } catch (err) {
            throw err;
        }
    }

    incrementCount(dockerID) {
        this.containers.get(dockerID).count += 1;
    }

    evalCode({ language, code, options }) {
        const { id: dockerID = language.id, env = {} } = language.runWith(options);
        const queue = this.queues.get(dockerID);
        return queue.enqueue(async () => {
            const { name, count } = await this.setupContainer(dockerID);
            this.incrementCount(dockerID);

            const proc = childProcess.spawn('docker', [
                'exec',
                `-eCOUNT=${count}`,
                ...Object.entries(env).map(([k, v]) => `-e${k}=${v}`),
                name, '/bin/sh', '/var/run/run.sh', code
            ]);

            try {
                const result = await this.handleSpawn(proc, true);
                return result;
            } catch (err) {
                this.containers.delete(dockerID);
                await this.kill(name);
                throw err;
            }
        });
    }

    handleSpawn(proc, withTimeout = false) {
        return new Promise((resolve, reject) => {
            if (withTimeout) {
                setTimeout(() => {
                    reject(new Error('Timed out'));
                }, this.client.config.timeout);
            }

            let data = '';
            proc.stdout.on('data', chunk => {
                data += chunk;
            });

            proc.stderr.on('data', chunk => {
                data += chunk;
            });

            proc.on('error', error => {
                error.data = data;
                reject(error);
            });

            proc.on('exit', status => {
                if (status !== 0) {
                    reject(new Error(data));
                } else {
                    resolve(data);
                }
            });
        });
    }

    kill(name) {
        let cmd;
        if (process.platform === 'win32') {
            cmd = `docker kill --signal=9 ${name} >nul 2>nul`;
        } else {
            cmd = `docker kill --signal=9 ${name} >/dev/null 2>/dev/null`;
        }

        return util.promisify(childProcess.exec)(cmd);
    }

    cleanup() {
        return Promise.all(this.containers.map(({ name }) => this.kill(name)));
    }
}

module.exports = LanguageHandler;
