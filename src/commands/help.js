const { Command } = require('discord-akairo');

class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help'],
            clientPermissions: ['SEND_MESSAGES']
        });
    }

    exec(message) {
        const { prefix, codePrefix } = this.client.config;
        return message.util.send([
            '**Usage:**',
            `Put a \`${codePrefix}\` before a code block or inline codeblock that starts with a language code to execute it.`,
            `For list of enabled languages, use the \`${prefix}languages\` command.`,
            '',
            'See the readme for usage examples and supported languages: <https://github.com/1Computer1/comp_iler>'
        ]);
    }
}

module.exports = HelpCommand;
