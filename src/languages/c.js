const Language = require('../struct/Language');

class C extends Language {
    constructor() {
        super('c', {
            name: 'C',
            aliases: ['c']
        });
    }
}

module.exports = C;
