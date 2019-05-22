const Language = require('../struct/Language');

class JavaScript extends Language {
    constructor() {
        super('javascript', {
            name: 'JavaScript',
            aliases: ['javascript', 'js'],
            options: {
                harmony: () => ''
            }
        });
    }

    runWith(options) {
        const ret = { id: this.id, env: {} };
        if (options.has('harmony')) {
            ret.env.EVAL_HARMONY = 'true';
        }

        return ret;
    }
}

module.exports = JavaScript;
