const { Command } = require('discord-akairo');

class LanguagesCommand extends Command {
    constructor() {
        super('languages', {
            aliases: ['languages', 'language'],
            clientPermissions: ['SEND_MESSAGES']
        });
    }

    exec(message) {
        return message.util.send([
            '**List of enabled languages (Name: Language Codes)**:',
            ...this.client.languageHandler.modules.map(lang => `${lang.name}: \`${lang.aliases.join('`, `')}\``),
            '',
            'See the readme for usage examples, supported langagues, and options: <https://github.com/1Computer/comp_iler>'
        ]);
    }
}

module.exports = LanguagesCommand;
