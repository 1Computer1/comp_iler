const Language = require('../struct/Language');

class Clojure extends Language {
    constructor() {
        super('clojure', {
            name: 'Clojure',
            aliases: ['clojure', 'clj']
        });
    }
}

module.exports = Clojure;
