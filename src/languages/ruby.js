const Language = require('../struct/Language');

class Ruby extends Language {
    constructor() {
        super('ruby', {
            name: 'Ruby',
            aliases: ['ruby', 'rb']
        });
    }
}

module.exports = Ruby;
