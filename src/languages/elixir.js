const Language = require('../struct/Language');

class Elixir extends Language {
    constructor() {
        super('elixir', {
            name: 'Elixir',
            aliases: ['elixir']
        });
    }
}

module.exports = Elixir;
