const Language = require('../struct/Language');

class Prolog extends Language {
    constructor() {
        super('prolog', {
            name: 'Prolog',
            aliases: ['prolog']
        });
    }
}

module.exports = Prolog;
