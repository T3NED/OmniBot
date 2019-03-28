const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text'],
            aliases: ["brawler"],
            cooldown: 3,
            permissionLevel: 0,
            description: '',
            extendedHelp: 'No extended help available.',
            usage: '[resp:str]',
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
        });

        this.customizeResponse(
            "resp",
            "Please provide a valid tag"
        );
    }

    async run(msg, [resp]) {
        if(!resp) {
            if(msg.author.settings.ign.brawlstars) {
                try {
                    let player = await this.client.brawl.getPlayer(msg.author.settings.ign.brawlstars);
                    if(!player.brawlers) return msg.channel.send(this.generateFailed(`${msg.author}, Api is providing wrong information. Please try again later.`));
                    return msg.channel.send(this.generateSuccess(player));
                } catch (e) {
                    return msg.channel.send(this.generateFailed(`${msg.author}, the API is currently down. Try again later.`));
                }
            } else {
                return msg.channel.send(this.generateFailed(`${msg.author}, You don't have a saved Profile Tag!`));
            }
        } else {
            let tag = await this.resolveResponse(resp, msg);
            if(tag === null) {
                return msg.channel.send(this.generateFailed(`${msg.author}, Please check if that user has saved a tag!`));
            }
            let player = await this.get_player(tag);
            switch (player) {
                case 'Invalid Tag':
                    msg.channel.send(this.generateFailed(`${msg.author}, Invalid Tag Provided`));
                    break;
                case 'Error':
                    msg.channel.send(this.generateFailed(`${msg.author}, the API is currently down. Try again later.`));
                    break;
                default:
                    if(!player.brawlers) return msg.channel.send(this.generateFailed(`${msg.author}, Error fetching the api. Please try again later.`));
                    msg.channel.send(this.generateSuccess(player));
                    break;
            }
        }
    }

    generateSuccess(Player) {
        const emotes = this.client.icons;
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`${Player.name} | #${Player.tag}`)
            .setDescription(`__**Brawlers Unlocked - ${Player.brawlersUnlocked}/24**__`);
            Player.brawlers.forEach(B => {
                embed.addField(`${emotes[B.name]} ${B.hasSkin ? B.skin : B.name}`, emotes.Bounty + " `Rank " + B.rank + "`\n" + emotes.Experience + " `" + String(B.power).padStart(2, '0') + "` " +  emotes.Trophy +" `" + B.trophies + "/" + B.highestTrophies + "`", true);                
            });
            
        return embed;
    }

    generateFailed(message) {
        const embed = new MessageEmbed()
        .setColor("RED")
        .setDescription(message);
        return embed;
    }

    async get_player(tag) {
        try {
            let player = await this.client.brawl.getPlayer(tag);
            return player;
        } catch (e) {
            if(e.message === 'Invalid Tag.') {
                return 'Invalid Tag';
            } else {
                return 'Error';
            }
        }
    }

    async resolveResponse(response, orgMsg) {
        if(orgMsg.mentions.members.first()) {
            let tag = orgMsg.mentions.members.first().user.settings.ign.brawlstars;
            return tag;
        } else if(orgMsg.guild.members.get(response)) {
            let tag = orgMsg.guild.members.get(response).user.settings.ign.brawlstars;
            return tag;
        } else if(orgMsg.guild.members.find(m => m.user.username === response)) {
            let tag = orgMsg.guild.members.find(m => m.user.username === response).user.settings.ign.brawlstars;
            return tag;
        } else {
            let tag = response.trim().toUpperCase().replace(/#/g, '');
            return tag;
        }
    }

};
