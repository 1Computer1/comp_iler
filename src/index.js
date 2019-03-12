const CompilerClient = require('./struct/CompilerClient');
const config = require('../config.json');
const client = new CompilerClient(config);
client.once('ready', () => console.log('Comp_iler ready to go!')); // eslint-disable-line no-console
client.start();
