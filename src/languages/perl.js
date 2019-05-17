const Language = require('../struct/Language');

class Perl extends Language {
    constructor() {
        super('perl', {
            name: 'Perl',
            aliases: ['perl', 'pl']
        });
    }
}

module.exports = Perl;
