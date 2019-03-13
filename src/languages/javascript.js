const Language = require('../struct/Language');

class JavaScript extends Language {
    constructor() {
        super('javascript', {
            highlight: 'js',
            aliases: ['javascript', 'js'],
            options: {
                harmony: () => ''
            }
        });
    }

    runWith(options) {
        if (options.has('harmony')) {
            return { id: this.id, env: { EVAL_HARMONY: 'true' } };
        }

        return { id: this.id, env: {} };
    }
}

module.exports = JavaScript;
