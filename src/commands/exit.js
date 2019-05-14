const { Command } = require('discord-akairo');

class ExitCommand extends Command {
    constructor() {
        super('exit', {
            aliases: ['exit'],
            ownerOnly: true,
            clientPermissions: ['SEND_MESSAGES']
        });
    }

    async exec() {
        await this.client.languageHandler.cleanup();
        process.exit();
    }
}

module.exports = ExitCommand;
