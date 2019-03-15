const Language = require('../struct/Language');

class FSharp extends Language {
    constructor() {
        super('fsharp', {
            aliases: ['fsharp', 'fs']
        });
    }
}

module.exports = FSharp;
