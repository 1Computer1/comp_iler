const Language = require('../struct/Language');

class CPP extends Language {
    constructor() {
        super('cpp', {
            aliases: ['cpp', 'c++']
        });
    }
}

module.exports = CPP;
