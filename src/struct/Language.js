const { AkairoModule } = require('discord-akairo');

class Language extends AkairoModule {
    constructor(id, {
        category,
        aliases,
        loads = [id],
        options = {}
    } = {}) {
        super(id, { category });

        this.aliases = aliases;
        this.loads = loads;
        this.options = options;
    }

    runWith() {
        return { id: this.id, env: {} };
    }
}

module.exports = Language;
