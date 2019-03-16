const Language = require('../struct/Language');

class Julia extends Language {
    constructor() {
        super('julia', {
            aliases: ['julia'],
            options: {
                e: () => ''
            }
        });
    }

    runWith(options) {
        if (options.has('e')) {
            return { env: { EVAL_EXPR: 'true' } };
        }

        return {};
    }
}

module.exports = Julia;
