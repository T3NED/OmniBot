const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text'],
            aliases: [],
            autoAliases: true,
            bucket: 1,
            cooldown: 2,
            permissionLevel: 0,
            description: '',
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg) {
        
        
    }

};
