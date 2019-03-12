const { Listener } = require('discord-akairo');
const fetch = require('node-fetch');

class MessageInvalidListener extends Listener {
    constructor() {
        super('messageInvalid', {
            emitter: 'commandHandler',
            event: 'messageInvalid',
            category: 'commandHandler'
        });
    }

    async exec(message) {
        if (message.guild && !message.channel.permissionsFor(this.client.user).has('SEND_MESSAGES')) {
            return null;
        }

        const parse = this.parseMessage(message);
        if (!parse) {
            return null;
        }

        const result = await this.client.languageHandler.evalCode(message, parse)
            .catch(e => e.message) || '\n';

        const invalid = parse.invalid.length ? `Invalid options: ${parse.invalid.join(', ')}\n` : '';
        const output = `${invalid}\`\`\`${parse.language.highlight}\n${result}\`\`\``;
        if (output.length >= 2000) {
            const key = await fetch('https://hastebin.com/documents', { method: 'POST', body: result })
                .then(res => res.json())
                .then(json => json.key);

            return message.util.send(`${invalid}Output was too long: <https://hastebin.com/${key}.js>`);
        }

        return message.util.send(output);
    }

    parseMessage(message) {
        const regex1 = /^\s*>\s*(?:\[(.+?)\])?\s*```(.+?)\n([^]+)```\s*$/;
        const regex2 = /^\s*>\s*(?:\[(.+?)\])?\s*`(.+?) \s*([^]+)`\s*$/;
        const match = message.content.match(regex1) || message.content.match(regex2);
        if (!match) {
            return null;
        }

        const language = this.parseLanguage(match[2]);
        if (!language) {
            return null;
        }

        const code = match[3].trim();
        const [valid, invalid] = this.parseOptions(language, match[1] || '');
        return { id: message.id, language, code, options: valid, invalid };
    }

    parseLanguage(language) {
        const match = this.client.languageHandler.findLanguage(language.trim());
        if (!match) {
            return null;
        }

        return match;
    }

    parseOptions(language, options) {
        const kvs = options.split(';').map(opt => {
            const [k, v = ''] = opt.split('=');
            return [k.toLowerCase().trim(), v.trim()];
        });

        const valid = new Map();
        const invalid = [];
        for (const [key, value] of kvs) {
            const ok = Object.prototype.hasOwnProperty.call(language.options, key) && language.options[key](value);
            if (ok) {
                valid.set(key, value);
            } else {
                invalid.push(key);
            }
        }

        return [valid, invalid];
    }
}

module.exports = MessageInvalidListener;
