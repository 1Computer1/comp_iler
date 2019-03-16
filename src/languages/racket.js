const Language = require('../struct/Language');

class Racket extends Language {
    constructor() {
        super('racket', {
            aliases: ['lisp']
        });
    }
}

module.exports = Racket;
