const { Command } = require('discord-akairo');

class ExitCommand extends Command {
    constructor() {
        super('exit', {
            aliases: ['exit'],
            ownerOnly: true,
            clientPermissions: ['SEND_MESSAGES']
        });
    }

    async exec(message) {
        await message.util.send('Cleaning up...');
        await this.client.languageHandler.cleanup();
        await message.util.send('Exiting!');
        process.exit();
    }
}

module.exports = ExitCommand;
