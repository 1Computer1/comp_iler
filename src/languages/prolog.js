const Language = require('../struct/Language');

class Prolog extends Language {
    constructor() {
        super('prolog', {
            aliases: ['prolog']
        });
    }
}

module.exports = Prolog;
