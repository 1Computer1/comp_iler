const Language = require('../struct/Language');

class Haskell extends Language {
    constructor() {
        super('haskell', {
            highlight: 'hs',
            aliases: ['haskell', 'hs']
        });
    }
}

module.exports = Haskell;
