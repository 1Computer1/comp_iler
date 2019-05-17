const Language = require('../struct/Language');

class Racket extends Language {
    constructor() {
        super('racket', {
            name: 'Racket',
            aliases: ['lisp']
        });
    }
}

module.exports = Racket;
