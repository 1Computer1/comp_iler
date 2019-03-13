const Language = require('../struct/Language');

class Pascal extends Language {
    constructor() {
        super('pascal', {
            highlight: 'pas',
            aliases: ['pascal', 'pas']
        });
    }
}

module.exports = Pascal;
