const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            requiredPermissions: ["KICK_MEMBERS"],
            cooldown: 10,
            permissionLevel: 4,
            description: '',
            extendedHelp: 'No extended help available.',
            usage: '<member:membername> [reason:string] [...]',
            usageDelim: " "
        });
    }

    async run(msg, [member, ...reason]) {
        if (member.id === this.client.user.id) return msg.send(this.generateFailed("Why do you want to warn me?"));
        if (member.id === msg.author.id) return msg.send(this.generateFailed("Why do you want to warn yourself?"));

        if (member.roles.highest.position >= msg.member.roles.highest.position) return msg.send(this.generateFailed("You can't warn that member."));

        reason = reason.length > 0 ? reason.join(" ") : "No reason was provided";
        const { warns } = member.settings;

        await member.settings.update("warns", warns + 1);
        if (member.settings.warns + 1 > 3) {
            member.roles.add(msg.guild.settings.roles.muted).catch(() => null);
            this.client.emit("modLogs", msg.guild, "mute", {name: "mute", reason: reason, time: null, user: member.user}, msg.author);
        } else {
            await this.client.emit("modLogs", msg.guild, "warns", {name: "warn", user: member.user, warns: warns + 1, reason: reason}, msg.author);
        }
        return msg.send(this.generateSuccess(`Successfully warned ${member.user.tag}`));
    }

    generateSuccess(congrats) {
        const embed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(congrats);
    
        return embed;
    }
};
