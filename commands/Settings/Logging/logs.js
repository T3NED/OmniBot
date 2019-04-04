const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text'],
            aliases: ['setlog'],
            cooldown: 10,
            permissionLevel: 6,
            description: 'Set the Logging Channel for the server.',
            extendedHelp: 'No extended help available.',
            usage: '<set|disable> [channel:channelname]',
            usageDelim: ' ',
            subcommands: true,          
        });
    }

    async set(msg, [channel]) {
        if(!channel) return msg.send(this.generateFailed(`**${msg.author}, Please provide a valid channel**`));
        await msg.guild.settings.update("log.enabled", true, msg.guild);
        await msg.guild.settings.update("log.channel", channel, msg.guild).then(() => {
            msg.send(this.generateSuccess(`**${msg.author}, Logging Channel is now set to ${channel}**`));
        });
    }

    async disable(msg) {
        if(!msg.guild.settings.log.enabled) return msg.send(this.generateFailed(`**${msg.author}, Logging is already disabled**`));
        await msg.guild.settings.update("log.enabled", true, msg.guild).then(() => {
            msg.send(this.generateSuccess(`**${msg.author}, Logging is now disabled**`));
        });
    }

    generateSuccess(message) {
        const embed = new MessageEmbed()
            .setColor("#f48f42")
            .setDescription(message);
        return embed;
    }
    generateFailed(message) {
        const embed = new MessageEmbed()
            .setColor("RED")
            .setDescription(message);
        return embed;
    }

};