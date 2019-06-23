const Language = require('../struct/Language');

class Julia extends Language {
    constructor() {
        super('julia', {
            name: 'Julia',
            aliases: ['julia']
        });
    }
}

module.exports = Julia;
