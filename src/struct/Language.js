const { AkairoModule } = require('discord-akairo');

class Language extends AkairoModule {
    constructor(id, {
        category,
        highlight,
        aliases,
        loads = [id],
        options = {}
    } = {}) {
        super(id, { category });

        this.highlight = highlight;
        this.aliases = aliases;
        this.loads = loads;
        this.options = options;
    }

    runWith() {
        return { id: this.id, env: {} };
    }
}

module.exports = Language;
