const Language = require('../struct/Language');

class Rust extends Language {
    constructor() {
        super('rust', {
            aliases: ['rust', 'rs']
        });
    }
}

module.exports = Rust;
