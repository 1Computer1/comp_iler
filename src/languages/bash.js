const Language = require('../struct/Language');

class Bash extends Language {
    constructor() {
        super('bash', {
            name: 'Bash',
            aliases: ['bash', 'sh']
        });
    }
}

module.exports = Bash;
