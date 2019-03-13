const { Command } = require('discord-akairo');

class ReloadCommand extends Command {
    constructor() {
        super('reload', {
            aliases: ['reload', 'r'],
            ownerOnly: true,
            quoted: false,
            clientPermissions: ['SEND_MESSAGES'],
            args: [
                {
                    id: 'type',
                    match: 'option',
                    flag: ['type:'],
                    type: [['command', 'c'], ['listener', 'l']],
                    default: 'command'
                },
                {
                    id: 'module',
                    type: (phrase, message, { type }) => {
                        if (!phrase) return null;
                        const resolver = this.handler.resolver.type({
                            command: 'commandAlias',
                            listener: 'listener'
                        }[type]);
                        return resolver(phrase);
                    }
                }
            ]
        });
    }

    exec(message, { type, module: mod }) {
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
