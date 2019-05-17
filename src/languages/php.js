const Language = require('../struct/Language');

class PHP extends Language {
    constructor() {
        super('php', {
            name: 'PHP',
            aliases: ['php']
        });
    }
}

module.exports = PHP;
