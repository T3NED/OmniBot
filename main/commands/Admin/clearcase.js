const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text'],
            aliases: ['cc', 'resetcase'],
            cooldown: 10,
            permissionLevel: 6,
            description: '',
            extendedHelp: 'No extended help available.',
            usage: ''
        });
    }

    async run(msg) {
        await msg.guild.settings.update("log.case", 0);
        msg.channel.send(this.generateEmbed(`_Reset the case number to 0 for the server_`));
    }

    generateEmbed(message) {
        const embed = new MessageEmbed()
            .setColor("#f48f42")
            .setDescription(message);
        return embed;
    }
};