const Language = require('../struct/Language');

class Ruby extends Language {
    constructor() {
        super('ruby', {
            aliases: ['ruby', 'rb']
        });
    }
}

module.exports = Ruby;
