const { Command, RichDisplay } = require('klasa');
const { MessageEmbed } = require('discord.js');
const parseMs = require('parse-ms');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text'],
            aliases: ['q'],
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
        let length = 0;
        queue.forEach(s => {
            length += (s.Ln);
        });

        const pages = new RichDisplay(new MessageEmbed()
            .setColor("#efd22d")
            .setAuthor(`Queue for ${msg.guild.name}`)
            .setTitle(`${queue.length} Songs in Queue | Length: ${this.fmtTime(length)}`)
        );

        for (let i = 0; i < queue.length; i += 10) {
            const current = queue.slice(i, i + 10);
            pages.setFooterPrefix("Page ");
            pages.addPage(e => e.setDescription(current.map(c => `\`${c.id}.\` [${c.songTitle}](${c.url}) \`${this.fmtTime(c.Ln)} Requested By: ${c.requester.tag}\``).join(`\n\n`)));
        }
        
        pages.run(await msg.send(`_**Getting the queue for the server**_`), {
            time: 100000,
            filter: (reaction, user) => user = msg.author
        });
    }

    fmtTime(ms) {
        let parsed = parseMs(ms);
        return parsed.hours ?
                `${parsed.hours.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}:${parsed.minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}:${parsed.seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}`:
                parsed.minutes ? `${parsed.minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}:${parsed.seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}`:
                `00:${parsed.seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}`;
    }
};
