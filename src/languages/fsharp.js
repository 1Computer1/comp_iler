const Language = require('../struct/Language');

class Fsharp extends Language {
    constructor() {
        super('fsharp', {
            highlight: 'fs',
            aliases: ['fsharp', 'fs']
        });
    }
}

module.exports = Fsharp;
