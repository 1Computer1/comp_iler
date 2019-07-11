const fetch = require('node-fetch');

class Myriad {
    constructor(port) {
        this.port = port;
    }

    url(k) {
        return `http://localhost:${this.port}/${k}`;
    }

    getLanguages() {
        return fetch(this.url('languages'), { method: 'GET' }).then(x => x.json());
    }

    async postEval(language, code) {
        const response = await fetch(this.url('eval'), {
            method: 'POST',
            body: JSON.stringify({ language, code }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            if (response.status === 404 && /^Language .+? was not found$/.test(response.statusText)) {
                return [false, 'Invalid language'];
            }

            if (response.status === 500 && response.statusText === 'Evaluation failed') {
                return [false, 'Evaluation failed'];
            }

            if (response.status === 504 && response.statusText === 'Evaluation timed out') {
                return [false, 'Evaluation timed out'];
            }

            throw new Error(`Unexpected ${response.status} response from ['Myriad', ${response.statusText}`);
        }

        const body = await response.json();
        return [true, body.result || '\n'];
    }

    getContainers() {
        return fetch(this.url('containers'), { method: 'GET' }).then(x => x.json());
    }

    postCleanup() {
        return fetch(this.url('cleanup'), { method: 'POST' }).then(x => x.json());
    }
}

const entries = [
    ['apl', ['apl']],
    ['bash', ['bash', 'sh']],
    ['brainfuck', ['brainfuck', 'bf']],
    ['c', ['c']],
    ['clojure', ['clojure', 'clj']],
    ['cpp', ['cpp']],
    ['csharp', ['csharp', 'cs']],
    ['elixir', ['elixir']],
    ['fsharp', ['fsharp', 'fs']],
    ['go', ['golang', 'go']],
    ['haskell', ['haskell', 'hs']],
    ['java', ['java']],
    ['javascript', ['javascript', 'js']],
    ['julia', ['julia']],
    ['lua', ['lua']],
    ['ocaml', ['ocaml', 'ml']],
    ['pascal', ['pascal', 'pas', 'freepascal']],
    ['perl', ['perl', 'pl']],
    ['php', ['php']],
    ['prolog', ['prolog']],
    ['python', ['python', 'py']],
    ['racket', ['lisp']],
    ['ruby', ['ruby', 'rb']],
    ['rust', ['rust', 'rs']]
];

Myriad.Languages = new Map(entries);
Myriad.Aliases = new Map();
for (const [l, xs] of entries) {
    for (const x of xs) {
        Myriad.Aliases.set(x, l);
    }
}

module.exports = Myriad;
