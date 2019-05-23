const Language = require('../struct/Language');

class Brainfuck extends Language {
    constructor() {
        super('brainfuck', {
            name: 'Brainfuck',
            aliases: ['brainfuck', 'bf']
        });
    }
}

module.exports = Brainfuck;
