const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text'],
            aliases: ['setautorole'],
            cooldown: 10,
            permissionLevel: 6,
            description: 'Set the autorole for the server when a user join.',
            extendedHelp: 'No extended help available.',
            usage: '<user|bot|disable|show> [role:rolename]',
            subcommands: true,
            usageDelim: ' ',
        });
    }

    async user(msg, [role]) {
        if(!role) return msg.send(this.generateFailed(`**${msg.author}, Please provide a valid rolename**`));
        await msg.guild.settings.update("autorole.enabled", true, msg.guild);
        await msg.guild.settings.update("autorole.role_user", role, msg.guild).then(() => {
            return msg.send(this.generateSuccess(`**${msg.author}, Set the autorole for users in this server to ${role}**`));
        });
    }

    async bot(msg, [role]) {
        if(!role) return msg.send(this.generateFailed(`**${msg.author}, Please provide a valid rolename**`));
        await msg.guild.settings.update("autorole.enabled", true, msg.guild);
        await msg.guild.settings.update("autorole.role_bot", role, msg.guild).then(() => {
            return msg.send(this.generateSuccess(`**${msg.author}, Set the autorole for bots in this server to ${role}**`));
        });
    }

    async disable(msg) {
        if(!msg.guild.settings.autorole.enabled) return msg.send(this.generateFailed(`Autorole is already disabled in this server`));
        await msg.guild.settings.update("autorole.enabled", false, msg.guild).then(() => {
            return msg.send(this.generateSuccess(`**${msg.author}, Autorole is now disabled in this server**`));
        });
    }

    async show(msg) {
        if(msg.guild.settings.autorole.enabled) {
            const autorole = msg.guild.settings.autorole;
            return msg.send(this.showAutoroles(autorole.role_user, autorole.role_bot, msg));
        } else {
            return msg.send(this.generateFailed(`**${msg.author}, Autorole is not set or is disabled for this server**`));
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
    
    showAutoroles(role_user, role_bot, msg) {
        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor(`Autorole | ${msg.guild.name}`)
            .addField("User", msg.guild.roles.get(role_user) || "Not Set")
            .addField("Bot", msg.guild.roles.get(role_bot) || "Not Set");
        return embed;
    }
};