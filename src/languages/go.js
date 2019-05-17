const Language = require('../struct/Language');

class Go extends Language {
    constructor() {
        super('go', {
            name: 'Go',
            aliases: ['golang', 'go']
        });
    }
}

module.exports = Go;
