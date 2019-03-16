const Language = require('../struct/Language');

class Kotlin extends Language {
    constructor() {
        super('kotlin', {
            aliases: ['kotlin']
        });
    }
}

module.exports = Kotlin;
