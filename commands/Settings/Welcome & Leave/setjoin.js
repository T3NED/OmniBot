const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text'],
            aliases: ['setwelcome'],
            cooldown: 10,
            permissionLevel: 6,
            description: 'Set the welcome message and channel to greet when user joins',
            extendedHelp: 'No extended help available.',
            usage: '[channel:channelname]'
        });
    }

    async run(msg, [channel]) {
        if(!msg.guild.settings.message.logs && !channel) return msg.send(this.generateEmbed(`**${msg.author}, There's no Logging Channe set for this server.**`));
        if(!channel) return msg.send(this.generateEmbed(`**${msg.author}, Logging Channel for this server is ${msg.guild.channels.get(msg.guild.settings.message.logs)}**`));
        await msg.guild.settings.update("message.logs", channel, msg.guild).then(() => {
            msg.send(this.generateEmbed(`**${msg.author}, Set the Logging Channel for this server to ${channel}**`));
        });
    }

    generateEmbed(message) {
        const embed = new MessageEmbed()
            .setColor("#f48f42")
            .setDescription(message);
        return embed;
    }

};