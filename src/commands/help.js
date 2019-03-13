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
            'Put a `>` before a code block with a language or an inline code block that has a language to execute it.',
            'You can add options inside `[]` after the `>`.',
            '',
            '**Examples:**',
            '```',
            '>`\u200B``py',
            'print(\'Hello world!\');',
            '`\u200B``',
            '',
            '>`hs main = print (1 + 1)`',
            '',
            '>[harmony]`\u200B``js',
            'class Foo { bar = 1; }',
            'console.log(new Foo().bar);',
            '`\u200B``',
            '```',
            '**Supported languages:**',
            '- JavaScript',
            '- Python',
            '- Haskell',
            '- Pascal',
            '- Go',
            '',
            'Read the readme for more information: <https://github.com/1Computer1/comp_iler>'
        ]);
    }
}

module.exports = HelpCommand;
