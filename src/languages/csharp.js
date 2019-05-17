const Language = require('../struct/Language');

class CSharp extends Language {
    constructor() {
        super('csharp', {
            name: 'C#',
            aliases: ['csharp', 'cs'],
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

module.exports = CSharp;
