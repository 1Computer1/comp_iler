const { AkairoModule } = require('discord-akairo');

class Language extends AkairoModule {
    constructor(id, {
        category,
        name,
        aliases,
        loads = [id],
        options = {}
    } = {}) {
        super(id, { category });

        this.name = name;
        this.aliases = aliases;
        this.loads = loads;
        this.options = options;
    }

    runWith() {
        return {};
    }
}

module.exports = Language;
