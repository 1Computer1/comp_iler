const Language = require('../struct/Language');

class Java extends Language {
    constructor() {
        super('java', {
            name: 'Java',
            aliases: ['java']
        });
    }
}

module.exports = Java;
