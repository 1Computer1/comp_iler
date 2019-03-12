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
        const parse = this.parseMessage(message);
        if (!parse) {
            return null;
        }

        const result = await this.client.languageHandler.evalCode(message, parse)
            .catch(e => e.message) || '\n';

        const output = `\`\`\`${parse.language.highlight}\n${result}\`\`\``;
        if (output.length >= 2000) {
            const key = await fetch('https://hastebin.com/documents', { method: 'POST', body: result })
                .then(res => res.json())
                .then(json => json.key);

            return message.util.send(`https://hastebin.com/${key}.js`);
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
        const options = this.parseOptions(language, match[1] || '');
        return { id: message.id, language, code, options };
    }

    parseLanguage(language) {
        const match = this.client.languageHandler.findLanguage(language.trim());
        if (!match) {
            return null;
        }

        return match;
    }

    parseOptions(language, options) {
        return new Map(options.split(';')
            .map(opt => {
                const [k, v = ''] = opt.split('=');
                return [k.toLowerCase().trim(), v.trim()];
            })
            .filter(([key, value]) =>
                Object.prototype.hasOwnProperty.call(language.options, key) && language.options[key](value)));
    }
}

module.exports = MessageInvalidListener;
