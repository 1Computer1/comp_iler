const Language = require('../struct/Language');

class Bash extends Language {
    constructor() {
        super('bash', {
            aliases: ['bash', 'sh']
        });
    }
}

module.exports = Bash;
