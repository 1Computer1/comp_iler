const Language = require('../struct/Language');

class Java extends Language {
    constructor() {
        super('java', {
            aliases: ['java']
        });
    }
}

module.exports = Java;
