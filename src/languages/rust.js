const Language = require('../struct/Language');

class Rust extends Language {
    constructor() {
        super('rust', {
            name: 'Rust',
            aliases: ['rust', 'rs']
        });
    }
}

module.exports = Rust;
