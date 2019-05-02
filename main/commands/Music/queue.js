const { Command, RichDisplay } = require('klasa');
const { MessageEmbed } = require('discord.js');

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
        
        let queue = fetched.queue;
        let nowPlaying = queue[0];

        if (queue.length <= 1) {
            let resp = `🎧__*Now Playing*__\n[${nowPlaying.songTitle}](${nowPlaying.url}) \`Requested By: ${nowPlaying.requester.tag}\``;
            return msg.channel.send(this.queueEmbed(msg, resp));
        } else {
            let resp = `🎧__*Now Playing*__\n[${nowPlaying.songTitle}](${nowPlaying.url}) \`Requested By: ${nowPlaying.requester.tag}\`\n\n🎤 __*Up Next*__\n`;
            for(let i = 1; i <queue.length; i++) {
                resp += `\`${i}\`. [${queue[i].songTitle}](${queue[i].url}) \`Requested By: ${queue[i].requester.tag}\`\n`;
            }
            return msg.channel.send(this.queueEmbed(msg, resp));
        }
    }

    queueEmbed(msg, response) {
        return new MessageEmbed()
        .setColor("#f4b413")
        .setAuthor(`Queue for ${msg.guild.name}`, msg.guild.iconURL)
        .setDescription(response);
    }

};
