const Language = require('../struct/Language');

class Clojure extends Language {
    constructor() {
        super('clojure', {
            aliases: ['clojure', 'clj']
        });
    }
}

module.exports = Clojure;
