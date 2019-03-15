const Language = require('../struct/Language');

class CSharp extends Language {
    constructor() {
        super('csharp', {
            aliases: ['csharp', 'cs'],
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

module.exports = CSharp;
