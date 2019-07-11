const { Command } = require('discord-akairo');
const Myriad = require('../struct/Myriad');

class LanguagesCommand extends Command {
    constructor() {
        super('languages', {
            aliases: ['languages', 'language', 'langs', 'lang'],
            clientPermissions: ['SEND_MESSAGES']
        });
    }

    async exec(message) {
        const languages = await this.client.myriad.getLanguages();
        return message.util.send([
            '**List of enabled languages (Language Codes)**:',
            ...languages.map(lang => `\`${Myriad.Languages.get(lang).join('`, `')}\``),
            '',
            'See the readme for usage examples: <https://github.com/1Computer1/comp_iler>'
        ]);
    }
}

module.exports = LanguagesCommand;
