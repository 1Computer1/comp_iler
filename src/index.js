const CompilerClient = require('./struct/CompilerClient');
const config = require('../config.json');
const client = new CompilerClient(config);

client.once('ready', () => {
    // eslint-disable-next-line no-console
    console.log('[Info] Comp_iler ready to go!');
});

client.on('ready', () => {
    client.user.setPresence({
        activity: { name: '@Comp_iler help' },
        status: 'online'
    });
});

client.start();
