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
            usage: '<user:user> [reason:string] [...]',
            usageDelim: " "
        });
    }

    async run(msg, [user, ...reason]) {
        const bans = await msg.guild.fetchBans();
        if (!bans.has(user.id)) return msg.send(this.generateFailed(`${user.tag} is not in the ban list of the server`));

        reason = reason.length > 0 ? reason.join(" ") : "No reason was provided";
        try {
            await msg.guild.members.unban(user, reason);
        } catch (e) {
            return msg.send(this.generateFailed(`There was an error while unbanning ${user.tag}`));
        }

        this.client.emit("modLogs", msg.guild, "unban", {name: "ban", reason: reason, user: user}, msg.author);
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
