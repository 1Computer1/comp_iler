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
            return { id: this.id, env: { EVAL_EXPR: 'true' } };
        }

        return super.runWith(options);
    }
}

module.exports = Julia;
