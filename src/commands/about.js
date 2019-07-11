const { Command, version: akairoVersion } = require('discord-akairo');
const { version: djsVersion } = require('discord.js');

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
            'Source code is available at <https://github.com/1Computer1/comp_iler>.',
            '',
            'Comp_iler runs on Myriad, a Docker-based arbitrary code evaluation server!',
            'Check it out here <https://github.com/1Computer1/myriad>.',
            '',
            `**Guilds**: ${this.client.guilds.size}`,
            `**Channels**: ${this.client.channels.size}`,
            `**Users**: ${this.client.users.size}`,
            '',
            `**Memory Usage**: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
            `**Discord.js**: v${djsVersion}`,
            `**Akairo**: v${akairoVersion}`
        ]);
    }
}

module.exports = AboutCommand;
