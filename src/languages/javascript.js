const Language = require('../struct/Language');

class JavaScript extends Language {
    constructor() {
        super('javascript', {
            highlight: 'js',
            aliases: ['javascript', 'js'],
            options: {
                harmony: () => '',
                e: () => ''
            }
        });
    }

    runWith(options) {
        const ret = { id: this.id, env: {} };
        if (options.has('harmony')) {
            ret.env.EVAL_HARMONY = 'true';
        }

        if (options.has('e')) {
            ret.env.EVAL_EXPR = 'true';
        }

        return ret;
    }
}

module.exports = JavaScript;
