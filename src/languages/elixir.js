const Language = require('../struct/Language');

class Elixir extends Language {
    constructor() {
        super('elixir', {
            aliases: ['elixir']
        });
    }
}

module.exports = Elixir;
