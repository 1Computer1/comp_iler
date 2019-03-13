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
            !this.client.config.languages.length || this.client.config.languages.includes(path.parse(filepath).name)
    }) {
        super(client, {
            directory,
            classToHandle,
            extensions,
            automateCategories,
            loadFilter
        });

        this.aliases = new Collection();
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

    evalCode(message, { language, code, options }) {
        return new Promise((resolve, reject) => {
            const name = `comp_iler-${message.id}-${Date.now()}`;
            const { id, env } = language.runWith(options);
            const proc = childProcess.spawn('docker', [
                'run', '--rm', `--name=${name}`,
                '--net=none', `--cpus=${this.client.config.cpus}`, `-m=${this.client.config.memory}`,
                ...Object.entries(env).map(([k, v]) => `-e${k}=${v}`),
                `1computer1/comp_iler:${id}`,
                '/bin/sh', '/var/run/run.sh', code
            ]);

            setTimeout(() => {
                try {
                    if (process.platform === 'win32') {
                        childProcess.execSync(`docker kill --signal=9 ${name} >nul 2>nul`);
                    } else {
                        childProcess.execSync(`docker kill --signal=9 ${name} >/dev/null 2>/dev/null`);
                    }

                    reject(new Error('Timed out'));
                } catch (e) {
                    reject(e);
                }
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
}

module.exports = LanguageHandler;
