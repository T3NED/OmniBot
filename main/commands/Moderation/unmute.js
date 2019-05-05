const { Command } = require('klasa');
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
            usage: '<member:membername> [reason:string] [...]',
            usageDelim: " "
        });
    }

    async run(msg, [member, ...reason]) {
        let muteRole = msg.guild.roles.find(r => r.name === "Muted");
        if (member.roles.highest.position >= msg.member.roles.highest.position) return msg.send(this.generateFailed("You can't do that."));

        if (!muteRole) {
            try {
                muteRole = await msg.guild.roles.create({
                    data: {
                        name: 'Muted',
                        color: "#000000",
                        permissions: []
                    }
                });
                msg.guild.channels.forEach(async (channel) => {
                    await channel.updateOverwrite(
                        muteRole,
                        {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false,
                            SPEAK: false
                        }
                    );
                });
            } catch (err) {
                msg.send(this.generateFailed("I was unable to add mute role in the server"));
            }
        }
        if (!member.roles.has(muteRole.id)) return msg.send(this.generateFailed(`${member.tag} is not muted`));
        const Omni = msg.guild.me.roles.highest;
        if (muteRole.position > Omni.positon) return msg.send(this.generateFailed("Mute Role is higher than my highest role"));
        reason = reason.length > 0 ? reason.join(" ") : "No reason was provided";
    
        await member.roles.remove(muteRole).catch(() => null);
        this.client.emit("modLogs", msg.guild, "unmute", {name: "mute", reason: reason, user: member.user}, msg.author);
        return msg.send(this.generateSuccess(`Successfully unmuted ${member.user.tag}`));
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
