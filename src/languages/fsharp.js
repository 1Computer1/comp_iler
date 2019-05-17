const Language = require('../struct/Language');

class FSharp extends Language {
    constructor() {
        super('fsharp', {
            name: 'F#',
            aliases: ['fsharp', 'fs']
        });
    }
}

module.exports = FSharp;
