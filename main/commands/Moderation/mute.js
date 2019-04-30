const { Command, Duration } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            requiredPermissions: ["MANAGE_ROLES"],
            cooldown: 10,
            permissionLevel: 4,
            description: '',
            extendedHelp: 'No extended help available.',
            usage: '<member:membername> [till:time] [reason:...string]',
            usageDelim: " "
        });
    }

    async run(msg, [member, till, reason]) {
        if (member.id === this.client.user.id) return msg.send(this.generateFailed("**Why do you want to mute Omni ? xD**"));
        if (member.id === msg.author.id) return msg.send(this.generateFailed("**You can't mute yourself.**"));
        
        if (member.roles.highest.position >= msg.member.roles.highest.position) return msg.send(this.generateFailed("**You can't mute that member.**"));

        const muteRole = msg.guild.settings.roles.muted;
        if (!muteRole) return msg.send(this.generateFailed(`**Mute role is not setup. Use \`${msg.guild.settings.prefix}setmute <Role>\`**`));
        if (member.roles.has(muteRole)) return msg.send(this.generateFailed(`${member.user.tag} is already muted`));
        const Omni = msg.guild.me.roles.highest;
        if (muteRole.position > Omni.positon) return msg.send(this.generateFailed("**Mute Role is higher than my highest role**"));
        reason = reason ? reason : "No reason was provided";
    
        await member.roles.add(muteRole).catch(() => null);

        if (till) {
            await this.client.schedule.create("unmute", till, {
                data: {
                    guild: msg.guild.id,
                    user: member.id
                }
            });
        }

        till = till || null;
        this.client.emit("modLogs", msg.guild, "mute", {name: "mute", reason: reason, time: till ,user: member.user}, msg.author);
        return msg.send(this.generateSuccess(`Successfully muted ${member.user.tag} ${till != null ? `for ${Duration.toNow(till)}` : ""}`));
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
