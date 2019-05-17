const { Command } = require('discord-akairo');

class ReloadCommand extends Command {
    constructor() {
        super('reload', {
            aliases: ['reload', 'r'],
            ownerOnly: true,
            quoted: false,
            clientPermissions: ['SEND_MESSAGES']
        });
    }

    *args() {
        const type = yield {
            match: 'option',
            flag: ['type:'],
            type: [['command', 'c'], ['listener', 'l']],
            default: 'command'
        };

        const mod = yield {
            type: (message, phrase) => {
                if (!phrase) return null;
                const resolver = this.handler.resolver.type({
                    command: 'commandAlias',
                    listener: 'listener'
                }[type]);
                return resolver(message, phrase);
            }
        };

        return { type, mod };
    }

    exec(message, { type, mod }) {
        if (!mod) {
            return message.util.send(`Invalid ${type} ${type === 'command' ? 'alias' : 'ID'} specified to reload.`);
        }

        try {
            mod.reload();
            return message.util.send(`Sucessfully reloaded ${type} \`${mod.id}\`.`);
        } catch (err) {
            return message.util.send(`Failed to reload ${type} \`${mod.id}\`.`);
        }
    }
}

module.exports = ReloadCommand;
