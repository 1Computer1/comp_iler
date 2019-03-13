const Language = require('../struct/Language');

class Python extends Language {
    constructor() {
        super('python', {
            highlight: 'py',
            aliases: ['python', 'py'],
            loads: ['python', 'python2'],
            options: {
                2: () => ''
            }
        });
    }

    runWith(options) {
        if (options.has('2')) {
            return { id: 'python2', env: {} };
        }

        return { id: 'python', env: {} };
    }
}

module.exports = Python;
