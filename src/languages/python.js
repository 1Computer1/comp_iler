const Language = require('../struct/Language');

class Python extends Language {
    constructor() {
        super('python', {
            highlight: 'py',
            aliases: ['python', 'py']
        });
    }
}

module.exports = Python;
