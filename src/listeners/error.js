const { Listener } = require('discord-akairo');

class ErrorListener extends Listener {
    constructor() {
        super('error', {
            emitter: 'commandHandler',
            event: 'error',
            category: 'commandHandler'
        });
    }

    exec(err, message) {
        if (message.guild && !message.channel.permissionsFor(this.client.user).has('SEND_MESSAGES')) {
            return null;
        }

        return message.util.send([
            'An error occured:',
            '```',
            err.toString(),
            '```'
        ]);
    }
}

module.exports = ErrorListener;
