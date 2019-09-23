const CompilerClient = require('./struct/CompilerClient');
const config = require('../config.json');
const client = new CompilerClient(config);
client.once('ready', () => {
    client.user.setPresence({
        activity: { name: '@Comp_iler help' },
        status: 'online'
    });

    // eslint-disable-next-line no-console
    console.log('Comp_iler ready to go!');
});

client.start();
