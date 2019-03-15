const Language = require('../struct/Language');

class Haskell extends Language {
    constructor() {
        super('haskell', {
            aliases: ['haskell', 'hs'],
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

module.exports = Haskell;
