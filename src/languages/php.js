const Language = require('../struct/Language');

class PHP extends Language {
    constructor() {
        super('php', {
            aliases: ['php']
        });
    }
}

module.exports = PHP;
