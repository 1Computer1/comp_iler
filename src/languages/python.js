const Language = require('../struct/Language');

class Python extends Language {
    constructor() {
        super('python', {
            aliases: ['python', 'py'],
            loads: ['python3', 'python2'],
            options: {
                2: () => ''
            }
        });
    }

    runWith(options) {
        if (options.has('2')) {
            return { id: 'python2' };
        }

        return { id: 'python3' };
    }
}

module.exports = Python;
