const Language = require('../struct/Language');

class Perl extends Language {
    constructor() {
        super('perl', {
            aliases: ['perl', 'pl']
        });
    }
}

module.exports = Perl;
