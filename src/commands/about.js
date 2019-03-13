const { Command } = require('discord-akairo');

class AboutCommand extends Command {
    constructor() {
        super('about', {
            aliases: ['about'],
            clientPermissions: ['SEND_MESSAGES']
        });
    }

    exec(message) {
        return message.util.send([
            'Comp_iler is made by 1Computer.',
            'Source code is available at <https://github.com/1Computer1/comp_iler>.'
        ]);
    }
}

module.exports = AboutCommand;
