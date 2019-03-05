const {
    Command
} = require('klasa');
const {
    MessageEmbed
} = require('discord.js')
const moment = require('moment')

module.exports = class extends Command {

    constructor(...args) {
        /**
         * Any default options can be omitted completely.
         * if all options are default, you can omit the constructor completely
         */
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
        const gg = this.client.guilds.get("537106579946864678");

        const emojis = {
            red: gg.emojis.find(e => e.name == "dnd").toString(),
            green: gg.emojis.find(e => e.name == "online").toString(),
            purple: gg.emojis.find(e => e.name == "streaming").toString(),
            white: gg.emojis.find(e => e.name == "offline").toString(),
            yellow: gg.emojis.find(e => e.name == "idle").toString()
        }

        const status = {
            online: emojis.green + "**Online**",
            offline: emojis.white + "**Offline**",
            idle: emojis.yellow + "**Idle**",
            dnd: emojis.red + "**Do Not Disturb**",
            streaming: emojis.purple + "**Streaming**"
        }

        const isBot = {
            true: "Bot",
            false: "User"
        }

        const uEmbed = new MessageEmbed()
        .setColor("#c3f709")
        .setAuthor(`${isBot[member.user.bot]} | ${member.user.tag}`)
        .setDescription(`${status[member.user.presence.status]}`)
        .setThumbnail(member.user.displayAvatarURL())
        .addField("Name", `${member.user.username}`, true)
        .addField("User ID", `${member.user.id}`, true)
        .addField("Nickname", `${member.nickname !== null ? `${member.nickname}` : "No Nickname"}`, true)
        .addField("Playing", `${member.user.presence.activity !== null ? `${member.user.presence.activity}` : "None"}`, true)
        .addField(`Joined Discord` + " (" + moment.utc(member.user.createdAt).fromNow() + ")", `${moment.utc(member.user.createdAt).format("dddd, Do MMMM YYYY")}`, true)
        .addField(`Joined Server` + " (" + moment.utc(member.joinedAt).fromNow() + ")", `${moment.utc(member.joinedAt).format("dddd, Do MMMM YYYY")}`, true)
        .addField("Roles", `${member.roles.filter(r => r.id !== message.guild.id).map(r=>r).join("|") || "No Roles"}`, true)
        .setFooter(`Replying to ${message.author.tag}`)
        .setTimestamp();

        return message.sendEmbed(uEmbed);

    }

};