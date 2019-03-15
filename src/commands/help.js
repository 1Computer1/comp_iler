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
            'You can add options, separated by semicolons, after the `>`.',
            '',
            '**Examples:**',
            '```',
            '>`\u200B``py',
            'print(\'Hello world!\');',
            '`\u200B``',
            '',
            '>`hs main = print (1 + 1)`',
            '',
            '>e; harmony`\u200B``js',
            'class Foo { bar = 1; }',
            'new Foo().bar;',
            '`\u200B``',
            '```',
            '',
            'Read the readme for supported languages and options: <https://github.com/1Computer1/comp_iler>'
        ]);
    }
}

module.exports = HelpCommand;
