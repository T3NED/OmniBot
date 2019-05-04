const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const search = require("yt-search");
const parseMs = require("parse-ms");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text'],
            aliases: ['p'],
            cooldown: 5,
            description: '',
            extendedHelp: 'No extended help available.',
            usage: '<song:...string>',
        });
    }

    async run(msg, [song]) {
        const { channel } = msg.member.voice;
        if (!channel) return msg.send('_You are not in a voice channel_');
        this.resolvePermission(msg, channel);

        let valid = await ytdl.validateURL(song);
        if (!valid) {
            search(song, async(err, res) => {
                if (err) return msg.send("_Something broke please try again_");
                let video = res.videos[0];
                if (!video) return msg.send("_I can't find any search results_");

                let info = await ytdl.getBasicInfo(video.url);
                let ms = info.length_seconds * 1000;
                let data = this.client.music.get(msg.guild.id) || {};
                if (!data.connection) data.connection = await channel.join();
                if (!data.queue) data.queue = [];
                data.guildId = msg.guild.id;

                data.queue.push({
                    songTitle: info.title,
                    requester: msg.author,
                    url: info.video_url,
                    Ln: ms,
                    ChannelName: info.author.name,
                    thumb: info.thumbnail_url,
                    id: data.queue.length ? data.queue.length + 1: 1
                });

                if (!data.dispatcher) {
                    this.client.music.set(msg.guild.id, data);
                    data = this.client.music.get(msg.guild.id);
                    this.play(msg, data);
                }
                else {
                    if (data.queue.length > 20) return msg.send(this.limitEmbed(msg));
                    return msg.send(this.queueEmbed(msg, info, ms));
                }
            });

        } else {
            let info = await ytdl.getBasicInfo(song);
            let ms = info.length_seconds * 1000;
            let data = this.client.music.get(msg.guild.id) || {};
            if (!data.connection) data.connection = await channel.join();
            if (!data.queue) data.queue = [];
            data.guildId = msg.guild.id;

            data.queue.push({
                songTitle: info.title,
                requester: msg.author,
                url: info.video_url,
                Ln: ms,
                ChannelName: info.author.name,
                thumb: info.thumbnail_url,
                id: data.queue.length ? data.queue.length + 1: 1
            });

            if (!data.dispatcher) {
                this.client.music.set(msg.guild.id, data);
                data = this.client.music.get(msg.guild.id);
                this.play(msg, data);
            }
            else {
                if (data.queue.length > 20) return msg.send(this.limitEmbed(msg));
                return msg.send(this.queueEmbed(msg, info, ms));
            }  
        }      
        
    }

    resolvePermission(msg, channel) {
        if (!channel.permissionsFor(msg.guild.me).has("CONNECT")) return msg.channel.send('**I don\'t have proper permissions to connect to that channel**');
        if (!channel.permissionsFor(msg.guild.me).has("SPEAK")) return msg.channel.send('**I don\'t have proper permissions to speak in that channel**');
    }

    async play(msg, data) {
        await msg.channel.send(this.playEmbed(data));
        data.dispatcher = await data.connection.play(ytdl(data.queue[0].url, {
            filter: 'audioonly', quality: 'highestaudio', highWaterMark: 1<<25}), {highWaterMark: 1});
        
        data.dispatcher.guildId = data.guildId;

        data.dispatcher.on("error", async (err) => {
            console.error(err);
            this.client.music.delete(data.dispatcher.guildId);
            let { channel } = msg.guild.me.voice;
            if (channel) channel.leave();
            return msg.channel.send(`Player broke. Please report it to our server, if you are facing any problems running it again. Use \`${msg.guild.settings.prefix}bug <bug>\``);
        });

        data.dispatcher.on("finish", async () => {
            let fetched = this.client.music.get(data.dispatcher.guildId);
            if (!fetched) return;
    
            fetched.queue.shift();
    
            if (fetched.queue.length > 0) {
                this.client.music.set(data.dispatcher.guildId, fetched);
                this.play(msg, fetched);
            } else {
                this.client.music.delete(data.dispatcher.guildId);
                let { channel } = msg.guild.me.voice;
                if (channel) channel.leave();
                return msg.channel.send("🛑_Playback finished_");
            }
        });
    }

    limitEmbed(msg) {
        return new MessageEmbed()
        .setColor("#f4d913")
        .setDescription(`${msg.author}, currently the queue limit is only 20 songs. If you want to support us [donate here](https://www.patreon.com/officallyomni) so that the queue limit can be increased.`);
    }

    queueEmbed(msg, info, ms) {
        const time = parseMs(ms);
        const e = new MessageEmbed()
        .setColor("#f4b413")
        .setDescription("🎼__**Added to Queue**__")
        .addField("Song", info.title)
        .addField("Channel", info.author.name, true);
        if(time.hours){
            e.addField("Length", `${time.hours.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:${time.minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:${time.seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}`, true);
        }else if(!time.hours && time.minutes){
            e.addField("Length", `${time.minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:${time.seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}`, true);
        }else{
            e.addField("Length", `00:${time.seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}`, true);
        }
        e.addField("Watch Here", info.video_url, true);
        e.setThumbnail(info.thumbnail_url);
        e.setFooter(`Requested By: ${msg.author.tag}`);

        return e;
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
