const Language = require('../struct/Language');

class Go extends Language {
    constructor() {
        super('go', {
            highlight: 'go',
            aliases: ['go']
        });
    }
}

module.exports = Go;
