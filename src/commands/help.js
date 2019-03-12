const { Command } = require('discord-akairo');

class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help']
        });
    }

    exec(message) {
        return message.util.send('Maybe later.');
    }
}

module.exports = HelpCommand;
