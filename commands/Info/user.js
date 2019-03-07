const {
    Command
} = require('klasa');
const {
    MessageEmbed
} = require('discord.js')
const moment = require('moment')

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text'],
            requiredPermissions: [],
            aliases: [],
            cooldown: 0,
            deletable: false,
            permissionLevel: 0,
            description: 'Gives a brief info about the user',
            extendedHelp: 'No extended help available.',
            usage: '[user:str]'
        });
    }

    async run(message, [user]) {

        const member = message.mentions.members.first() || message.member;

        const status = {
            online: "Online",
            offline: "Offline",
            idle: "Idle",
            dnd: "Do Not Disturb",
            streaming: "Streaming"
        }

        const isBot = {
            true: "Bot",
            false: "User"
        }

        const uEmbed = new MessageEmbed()
        .setColor("#c3f709")
        .setAuthor(`${isBot[member.user.bot]} | ${member.user.tag}`, member.user.displayAvatarURL())
        .setThumbnail(member.user.displayAvatarURL())
        .addField("Name", `${member.user.username}`, true)
        .addField("User ID", `${member.user.id}`, true)
        .addField("Nickname", `${member.nickname !== null ? `${member.nickname}` : "No Nickname"}`, true)
        .addField("Playing", `${member.user.presence.activity !== null ? `${member.user.presence.activity}` : "None"}`, true)
        .addField(`Joined Discord` + " (" + moment.utc(member.user.createdAt).fromNow() + ")", `${moment.utc(member.user.createdAt).format("dddd, Do MMMM YYYY")}`, true)
        .addField(`Joined Server` + " (" + moment.utc(member.joinedAt).fromNow() + ")", `${moment.utc(member.joinedAt).format("dddd, Do MMMM YYYY")}`, true)
        .addField(`Status`, status[member.user.presence.status])
        .addField("Roles", `${member.roles.filter(r => r.id !== message.guild.id).map(r=>r).join("|") || "No Roles"}`, true)
        .setFooter(`Replying to ${message.author.tag}`, this.client.displayAvatarURL())
        .setTimestamp();

        return message.sendEmbed(uEmbed);

    }

};
