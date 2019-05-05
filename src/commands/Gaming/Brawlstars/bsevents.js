const { Command, RichDisplay } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text'],
            aliases: ["events"],
            cooldown: 3,
            permissionLevel: 0,
            description: 'Shows the current and upcoming events for brawlstars.',
            extendedHelp: 'Only valid categories are `upcoming` and `current`.',
            usage: '<category:str>',
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
        });
        this.customizeResponse(
            'category',
            'Please provide a valid argument. Either upcoming or current.'
        );
    }

    async run(msg, category) {
        const emojis = this.client.icons;
        if(category[0].toLowerCase() === 'current') {
            try {
                const events = await this.client.brawl.getCurrentEvents();
                const currentEmbed = new RichDisplay(new MessageEmbed()
                    .setColor("RANDOM")
                );
                for (let i = 0; i < events.current.length; i++) {
                    currentEmbed.setFooterSuffix(" | End Time ");
                    currentEmbed.addPage(t => {
                        return t
                            .setColor("RANDOM")
                            .setDescription(emojis[events.current[i].gameMode] + "**" + events.current[i].gameMode + "**")
                            .setThumbnail(events.current[i].mapImageUrl)
                            .addField("Map", "`" + events.current[i].mapName + "`")
                            .addField("Rewards", `Free Keys: ` + "`" + events.current[i].freeKeys + "`", true)
                            .setTimestamp(events.current[i].endTime);
                    });
                }
        
                return currentEmbed.run(await msg.send('Fetching Current Events...'), {
                    time: 120000,
                    filter: (reaction, user) => user === msg.author
                });
            } catch (e) {
                return msg.send(this.generateFailed(`Error Fetching the events. Please try again later.`));
            }
        } else if(category[0].toLowerCase() === 'upcoming') {
            try {
                const events = await this.client.brawl.getUpcomingEvents();
                if(!events.upcoming) return msg.send(this.generateFailed(`Error Fetching events`));
                const upcomingEmbed = new RichDisplay(new MessageEmbed()
                    .setColor("RANDOM")
                );
                for (let i = 0; i < events.upcoming.length; i++) {
                    upcomingEmbed.setFooterSuffix(" | Start Time ");
                    upcomingEmbed.addPage(t => {
                        return t
                            .setColor("RANDOM")
                            .setDescription(emojis[events.upcoming[i].gameMode] + "**" + events.upcoming[i].gameMode + "**")
                            .setThumbnail(events.upcoming[i].mapImageUrl)
                            .addField("Map", "`" + events.upcoming[i].mapName + "`")
                            .addField("Rewards", `Free Keys: ` + "`" + events.upcoming[i].freeKeys + "`", true)
                            .setTimestamp(events.upcoming[i].startTime);
                    });
                }
                
                return upcomingEmbed.run(await msg.send('Fetching Upcoming Events...'), {
                    time: 120000,
                    filter: (reaction, user) => user === msg.author
                });
            } catch (e) {
                return msg.send(this.generateFailed(`Error Fetching the events. Please try again later.`));
            }
        } else {
            return msg.send(this.generateFailed("Only valid categories are `upcoming` and `current`"));
        }
    }

    generateFailed(message) {
        const embed = new MessageEmbed()
            .setColor("RED")
            .setDescription(message);
        return embed;
    }
};