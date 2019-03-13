const Language = require('../struct/Language');

class JavaScript extends Language {
    constructor() {
        super('javaScript', {
            highlight: 'js',
            aliases: ['javaScript', 'js'],
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
