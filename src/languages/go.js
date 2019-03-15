const Language = require('../struct/Language');

class Go extends Language {
    constructor() {
        super('go', {
            aliases: ['golang', 'go']
        });
    }
}

module.exports = Go;
