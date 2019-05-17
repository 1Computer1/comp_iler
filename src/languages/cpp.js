const Language = require('../struct/Language');

class CPP extends Language {
    constructor() {
        super('cpp', {
            name: 'C++',
            aliases: ['cpp', 'c++']
        });
    }
}

module.exports = CPP;
