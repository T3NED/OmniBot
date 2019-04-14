const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            requiredPermissions: ["BAN_MEMBERS"],
            cooldown: 10,
            permissionLevel: 4,
            description: '',
            extendedHelp: 'No extended help available.',
            usage: '<user:str> [reason:string] [...]',
            usageDelim: " "
        });
    }

    async run(msg, [user, ...reason]) {
        if (user === this.client.user.id) return msg.send(this.generateFailed("Omni is not banned."));
        if (user === msg.author.id) return msg.send(this.generateFailed("You are not banned"));

        reason = reason.length > 0 ? reason.join(" ") : "No reason was provided";
        try {
            await msg.guild.members.unban(user, reason);
        } catch (e) {
            return msg.send(this.generateFailed("This user is not in the ban list of the server"));
        }

        this.client.emit("modLogs", msg.guild, "unban", {name: "unban", reason: reason, user: user}, msg.author);
        return msg.send(this.generateSuccess(`Successfully unbanned ${user.tag}`));
    }

    generateSuccess(congrats) {
        const embed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(congrats);
    
        return embed;
    }

    generateFailed(failed) {
        const embed = new MessageEmbed()
        .setColor("RED")
        .setDescription(failed);
    
        return embed;
    }
};
