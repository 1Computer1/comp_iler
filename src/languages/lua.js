const Language = require('../struct/Language');

class Lua extends Language {
    constructor() {
        super('lua', {
            aliases: ['lua']
        });
    }
}

module.exports = Lua;
