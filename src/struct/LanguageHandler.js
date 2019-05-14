const { AkairoHandler } = require('discord-akairo');
const { Collection } = require('discord.js');
const Language = require('./Language');
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

    buildDocker() {
        return Promise.all(this.modules.map(({ loads }) => {
            return Promise.all(loads.map(name => {
                const folder = path.join(__dirname, '../../docker', name);
                return util.promisify(childProcess.exec)(`docker build -t "1computer1/comp_iler:${name}" ${folder}`);
            }));
        }));
    }

    async setupContainer(id) {
        if (this.containers.has(id)) {
            return this.containers.get(id);
        }

        const name = `comp_iler-${id}-${Date.now()}`;
        const proc = childProcess.spawn('docker', [
            'run', '--rm', `--name=${name}`, '-u1000', '-w/tmp/', '-t', '-d',
            '--net=none', `--cpus=${this.client.config.cpus}`, `-m=${this.client.config.memory}`,
            `1computer1/comp_iler:${id}`
        ]);

        try {
            await this.handleSpawn(proc);
            this.containers.set(id, { name });
            return this.containers.get(id);
        } catch (err) {
            throw err;
        }
    }

    async evalCode({ language, code, options }) {
        const { id = language.id, env = {} } = language.runWith(options);
        const { name } = await this.setupContainer(id);
        const proc = childProcess.spawn('docker', [
            'exec',
            ...Object.entries(env).map(([k, v]) => `-e${k}=${v}`),
            name, '/bin/sh', '/var/run/run.sh', code
        ]);

        try {
            const result = await this.handleSpawn(proc);
            return result;
        } catch (err) {
            this.images.delete(id);
            await this.kill(name);
            throw err;
        }
    }

    handleSpawn(proc) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('Timed out'));
            }, this.client.config.timeout);

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
        return Promise.all(this.images.map(({ name }) => this.kill(name)));
    }
}

module.exports = LanguageHandler;
