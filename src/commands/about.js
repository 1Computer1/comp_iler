const { Command } = require('discord-akairo');

class AboutCommand extends Command {
    constructor() {
        super('about', {
            aliases: ['about']
        });
    }

    exec(message) {
        return message.util.send('I do things!');
    }
}

module.exports = AboutCommand;
