const Language = require('../struct/Language');

class OCaml extends Language {
    constructor() {
        super('ocaml', {
            aliases: ['ocaml']
        });
    }
}

module.exports = OCaml;
