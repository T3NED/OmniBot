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
            usage: '<channel|toggle|disable> [channel:channelname|options:str]',
            usageDelim: ' ',
            subcommands: true,
        });
    }

    async channel(msg, [channel]) {
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

    async toggle(msg, [options]) {
        if(!options) return msg.send(this.generateFailed('Valid Options: kick, ban, roles, message, mute'));
        let option = options.toLowerCase();
        switch (option) {
            case "kick":
                this.update("kick", msg);
                break;
            case "ban":
                this.update("kick", msg);
                break;
            case "roles":
                this.update("kick", msg);
                break;
            case "message":
                this.update("kick", msg);
                break;
            case "mute":
                this.update("kick", msg);
                break;
            default:
                msg.send(this.generateFailed('Valid Options: kick, ban, roles, message, mute'));
                break;
        }
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
    update(key, msg) {
        if (msg.guild.settings.get(`log.${key}`)) {
            msg.guild.settings.update(`log.${key}`, false);
            return msg.send(this.generateSuccess(`**${msg.author}, ${key} logs are now disabled**`));
        } else {
            msg.guild.settings.update(`log.${key}`, true);
            return msg.send(this.generateSuccess(`**${msg.author}, ${key} logs are now enabled**`));
        }
    }

};