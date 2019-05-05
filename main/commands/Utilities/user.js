const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text'],
            requiredPermissions: [],
            aliases: [],
            cooldown: 3,
            deletable: false,
            permissionLevel: 0,
            description: 'Gives a brief info about the user',
            extendedHelp: 'No extended help available.',
            usage: '[user:str]'
        });
    }

    async run(msg, [user]) {

        const member = msg.mentions.members.first() || msg.member;

        const status = {
            online: "Online",
            offline: "Offline",
            idle: "Idle",
            dnd: "Do Not Disturb",
            streaming: "Streaming"
        };

        const isBot = member.user.bot ? 'Bot' : 'User';
        const Roles = member.roles.filter(r => r.id !== msg.guild.id).size > 50 ? `${member.roles.filter(r => r.id !== msg.guild.id).size}` : member.roles.sort(function(a, b){return b.position - a.position;}).filter(r => r.id !== msg.guild.id).map(r=>r).join("|") || "No Roles";

        const uEmbed = new MessageEmbed()
        .setColor("#c3f709")
        .setAuthor(`${isBot} | ${member.user.tag}`, member.user.displayAvatarURL())
        .setThumbnail(member.user.displayAvatarURL())
        .addField("Name", member.user.username, true)
        .addField("User ID", member.user.id, true)
        .addField("Nickname", member.nickname ? member.nickname : "No Nickname", true)
        .addField("Playing", member.user.presence.activity !== null ? member.user.presence.activity : "None", true)
        .addField(`Joined Discord` + " (" + moment.utc(member.user.createdAt).fromNow() + ")", moment.utc(member.user.createdAt).format("dddd, Do MMMM YYYY"), true)
        .addField(`Joined Server` + " (" + moment.utc(member.joinedAt).fromNow() + ")", moment.utc(member.joinedAt).format("dddd, Do MMMM YYYY"), true)
        .addField(`Status`, status[member.user.presence.status])
        .addField("Roles", Roles, true)
        .setFooter(`Replying to ${msg.author.tag}`,`${msg.author.displayAvatarURL()}`)
        .setTimestamp();

        return msg.sendEmbed(uEmbed);

    }
};
