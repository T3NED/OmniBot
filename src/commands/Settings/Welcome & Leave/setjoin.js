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
            extendedHelp: "You can insert some placeholders:\n{mention} - Mention the member\n{tag} - The tag of the user e.g: Piyush#7142\n{user} - The member's name who joined.\n{guild} - The name of your server.\n{mCount} - Member Count of the server.",
            usage: '<msg|channel|disable> [channel:channelname] [message:str] [...]',
            usageDelim: ' ',
            subcommands: true,
        });
    }

    async channel(msg, [channel]) {
        if(!channel) return msg.send(this.generateFailed(`**${msg.author}, Please provide a valid channel**`));
        await msg.guild.settings.update("greet.welcome.channel", channel, msg.guild).then(() => {
            return msg.send(this.generateSuccess(`**${msg.author}, Welcome channel is now set to ${channel}**`));
        });
    }

    async msg(msg, [...message]) {
        if(!message) return msg.send(this.generateFailed(`**${msg.author}, Please provide a greet message**`));
        await msg.guild.settings.update("greet.welcome.enabled", true, msg.guild);
        await msg.guild.settings.update("greet.welcome.message", message.join(" "), msg.guild).then(() => {
            return msg.send(this.generateSuccess(`**${msg.author}, Welcome Message is now set to \n\n${message.join(" ")}**`));
        });
    }

    async disable(msg) {
        if(!msg.guild.settings.greet.welcome.enabled) return msg.send(this.generateFailed(`**Welcome Message is already disabled in this server**`));
        await msg.guild.settings.update("greet.welcome.enabled", false, msg.guild).then(() => {
            return msg.send(this.generateSuccess(`**${msg.author}, Welcome Message is now disabled in this server**`));
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