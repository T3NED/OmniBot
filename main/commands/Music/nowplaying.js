const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const parseMs = require('parse-ms');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text'],
            aliases: ['np', 'current'],
            cooldown: 5,
            permissionLevel: 0,
            description: '',
            extendedHelp: 'No extended help available.',
        });
    }

    async run(msg) {
        let fetched = this.client.music.get(msg.guild.id);
        if (!fetched) return msg.channel.send("_Nothing is playing in the server_");

        return msg.channel.send(this.playEmbed(fetched));
    }

    playEmbed(data) {
        const time = parseMs(data.queue[0].Ln);
        const e = new MessageEmbed()
        .setColor("#f4b413")
        .setDescription("🎼__**Now Playing**__")
        .addField("Song", data.queue[0].songTitle)
        .addField("Channel", data.queue[0].ChannelName, true);
        if(time.hours){
            e.addField("Length", `${time.hours.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:${time.minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:${time.seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}`, true);
        }else if(!time.hours && time.minutes){
            e.addField("Length", `${time.minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:${time.seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}`, true);
        }else{
            e.addField("Length", `00:${time.seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}`, true);
        }
        e.addField("Watch Here", data.queue[0].url, true);
        e.setThumbnail(data.queue[0].thumb);
        e.setFooter(`Requested By: ${data.queue[0].requester.tag}`);

        return e;
    }

};
