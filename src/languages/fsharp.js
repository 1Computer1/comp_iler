const Language = require('../struct/Language');

class FSharp extends Language {
    constructor() {
        super('FSharp', {
            highlight: 'fs',
            aliases: ['fsharp', 'f#', 'fs']
        });
    }
}

module.exports = FSharp;
