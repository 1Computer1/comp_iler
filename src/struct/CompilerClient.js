const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');
const LanguageHandler = require('./LanguageHandler');
const path = require('path');

class CompilerClient extends AkairoClient {
    constructor(config) {
        super({
            ownerID: config.owner
        }, {
            disabledEveryone: true,
            disabledEvents: ['TYPING_START']
        });

        this.commandHandler = new CommandHandler(this, {
            directory: path.join(__dirname, '../commands'),
            prefix: '>',
            allowMention: true,
            commandUtil: true,
            commandUtilLifetime: 3e5,
            handleEdits: true
        });

        this.listenerHandler = new ListenerHandler(this, {
            directory: path.join(__dirname, '../listeners')
        });

        this.languageHandler = new LanguageHandler(this, {
            directory: path.join(__dirname, '../languages')
        });

        this.config = config;
    }

    start() {
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler,
            languageHandler: this.languageHandler
        });

        this.commandHandler.loadAll();
        this.listenerHandler.loadAll();
        this.languageHandler.loadAll();
        this.languageHandler.buildDocker();
        return this.login(this.config.token);
    }
}

module.exports = CompilerClient;
