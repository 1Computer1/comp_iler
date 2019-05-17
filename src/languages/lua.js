const Language = require('../struct/Language');

class Lua extends Language {
    constructor() {
        super('lua', {
            name: 'Lua',
            aliases: ['lua']
        });
    }
}

module.exports = Lua;
