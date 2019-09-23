const { Listener } = require('discord-akairo');
const Myriad = require('../struct/Myriad');
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

        let reaction;
        if (!message.guild || message.channel.permissionsFor(this.client.user).has('ADD_REACTIONS')) {
            try {
                await Promise.all(message.reactions.filter(r => r.me).map(r => r.users.remove()));
                reaction = await message.react('📝');
            } catch (e) {
                // Ignore.
            }
        }

        const [ok, response] = await this.client.myriad.postEval(parse.language, parse.code);
        if (!message.guild || message.channel.permissionsFor(this.client.user).has('ADD_REACTIONS')) {
            try {
                if (reaction) {
                    reaction.users.remove();
                }

                if (ok) {
                    message.react('✔');
                } else {
                    message.react('✖');
                }
            } catch (e) {
                // Ignore.
            }
        }

        const output = `\`\`\`\n${response}\n\`\`\``;
        if (output.length >= 2000) {
            const key = await fetch('https://hasteb.in/documents', { method: 'POST', body: response })
                .then(res => res.json())
                .then(json => json.key);

            return message.util.send(`Output was too long: <https://hasteb.in/${key}>`);
        }

        return message.util.send(output);
    }

    parseMessage(message) {
        const prefix = this.client.config.codePrefix;
        const starts = message.content.slice(0, prefix.length).toLowerCase().startsWith(prefix.toLowerCase());
        if (!starts) {
            return null;
        }

        const regex = /^\s*(`{1,3})(.+?)[ \n]([^]+)\1\s*$/;
        const match = message.content.slice(prefix.length).match(regex);
        if (!match) {
            return null;
        }

        const language = Myriad.Aliases.get(match[2].toLowerCase());
        if (!language) {
            return null;
        }

        const code = match[3].trim();
        return { language, code };
    }
}

module.exports = MessageInvalidListener;
