const Language = require('../struct/Language');

class Kotlin extends Language {
    constructor() {
        super('kotlin', {
            highlight: 'kt',
            aliases: ['kotlin', 'kt']
        });
    }
}

module.exports = Kotlin;
