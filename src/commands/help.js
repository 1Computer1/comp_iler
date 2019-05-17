const { Command } = require('discord-akairo');

class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help'],
            clientPermissions: ['SEND_MESSAGES']
        });
    }

    exec(message) {
        return message.util.send([
            '**Usage:**',
            'Put a `>` before a code block or inline codeblock that starts with a language code to execute it.',
            'You can add options, separated by semicolons, after the `>`.',
            '',
            '**Enabled Languages (Name: Language Codes):**',
            ...this.client.languageHandler.modules.map(lang => `${lang.name}: \`${lang.aliases.join('`, `')}\``),
            '',
            'See the readme for usage examples, supported languages, and options: <https://github.com/1Computer1/comp_iler>'
        ]);
    }
}

module.exports = HelpCommand;
