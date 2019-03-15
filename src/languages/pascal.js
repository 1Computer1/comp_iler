const Language = require('../struct/Language');

class Pascal extends Language {
    constructor() {
        super('pascal', {
            aliases: ['pascal', 'pas', 'freepascal']
        });
    }
}

module.exports = Pascal;
