const Language = require('../struct/Language');

class OCaml extends Language {
    constructor() {
        super('ocaml', {
            name: 'OCaml',
            aliases: ['ocaml']
        });
    }
}

module.exports = OCaml;
