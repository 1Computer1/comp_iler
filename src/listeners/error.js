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
        message.util.send([
            'An error occured:',
            '```',
            err.toString(),
            '```'
        ]);
    }
}

module.exports = ErrorListener;
