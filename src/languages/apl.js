const Language = require('../struct/Language');

class APL extends Language {
    constructor() {
        super('apl', {
            name: 'APL',
            aliases: ['apl']
        });
    }
}

module.exports = APL;
