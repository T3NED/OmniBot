const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text'],
            aliases: [],
            cooldown: 2,
            permissionLevel: 0,
            description: 'ser',
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg) {
        const level = {
            0: "**None**",
            1: "**Low**",
            2: "**Medium**",
            3: "**High**",
            4: "**Extreme**"
        };
        const emotes = this.client.icons;
        const Roles = msg.guild.roles.filter(r=> r.name !== "@everyone").size < 50 ? msg.guild.roles.sort(function(a, b){return b.position - a.position;}).filter(r=> r.name !== "@everyone").map(r=>r).join("|") || "No Roles" : `${msg.guild.roles.filter(r=> r.name !== "@everyone").size}`;
        const embed = new MessageEmbed()
        .setAuthor(`${msg.guild.name} Information`, msg.guild.iconURL)
        .setColor("#f4c741")
        .setThumbnail(msg.guild.iconURL())
        .addField("Owner", msg.guild.owner.user.tag, true)
        .addField("Server ID", msg.guild.id, true)
        .addField("Region", emotes[msg.guild.region], true)
        .addField("Verification Level", level[msg.guild.verificationLevel], true)
        .addField("Channels", `**${msg.guild.channels.filter(c=>c.type === "category").size}** Categories\n**${msg.guild.channels.filter(c=>c.type === "text").size}** Text Channels\n**${msg.guild.channels.filter(c=>c.type === "voice").size}** Voice Channels`, true)
        .addField("Users", `**${msg.guild.members.size}** Users\n**${msg.guild.members.filter(m=> !m.user.bot).size}** Humans\n**${msg.guild.members.filter(m=> m.user.bot).size}** Bots` ,true)
        .addField("Server Created" + " (" + moment.utc(msg.guild.createdAt).fromNow() + ")", `${moment.utc(msg.guild.createdAt).format("dddd, Do MMMM YYYY")}` , true)
        .addField("Joined Server" + " (" + moment.utc(msg.member.joinedAt).fromNow() + ")",`${moment.utc(msg.member.joinedAt).format("dddd, Do MMMM YYYY")}` , true)
        .addField("Roles",Roles, true)
        .setFooter(`Replying to ${msg.author.tag}`,`${msg.author.displayAvatarURL()}`)
        .setTimestamp();

        return msg.channel.send(embed);
    }
};
