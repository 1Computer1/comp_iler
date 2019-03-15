const Language = require('../struct/Language');

class C extends Language {
    constructor() {
        super('c', {
            aliases: ['c']
        });
    }
}

module.exports = C;
