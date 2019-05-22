const { Command } = require('discord-akairo');

class CleanupCommand extends Command {
    constructor() {
        super('cleanup', {
            aliases: ['cleanup'],
            ownerOnly: true,
            clientPermissions: ['SEND_MESSAGES']
        });
    }

    async exec(message) {
        await message.util.send('Cleaning up...');
        await this.client.languageHandler.cleanup();
        await message.util.send('Cleaned up!');
    }
}

module.exports = CleanupCommand;
