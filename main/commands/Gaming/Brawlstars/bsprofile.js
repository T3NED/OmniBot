const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text'],
            aliases: ["brawl"],
            cooldown: 3,
            permissionLevel: 0,
            description: 'Shows the Brawlstars stats of the player',
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
                    let tag = msg.author.settings.ign.brawlstars;
                    let player = await this.client.brawl.getPlayer(tag);
                    if(!player.brawlers) return msg.channel.send(this.generateFailed(`${msg.author}, Api is providing wrong information. Please try again later.`));
                    if(player.tag !== tag) return msg.channel.send(this.generateFailed(`${msg.author}, Error fetching the api. Please try again later.`));
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
                    if(player.tag !== tag) return msg.channel.send(this.generateFailed(`${msg.author}, Error fetching the api. Please try again later.`));
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
            .setThumbnail(Player.avatarUrl)
            .addField('Trophies', emotes.Trophy + Player.trophies, true)
            .addField('Highest Trophies', emotes.Trophy + Player.highestTrophies, true)
            .addField('Level', `${Player.expLevel} - ${Player.expFmt}`, true)
            .addField('3v3 Victories', Player.victories, true)
            .addField('Solo Showdown Victories', emotes["Solo Showdown"] + Player.soloShowdownVictories, true)
            .addField('Duo Showdown Victories', emotes["Duo Showdown"] + Player.duoShowdownVictories, true)
            .addField('Robo Rumble Time', emotes["Robo Boss"] + Player.bestRoboRumbleTime, true)
            .addField('Big Brawler Time', emotes["Big Game"] + Player.bestRoboRumbleTime, true)
            .addField(Player.club ? `Club | ${Player.club.role}` : `Club` , Player.club ? `${emotes[Player.club.badgeUrl.slice(89, 94)]}${Player.club.name}` : 'Not in any Club', true)
            .addField(`Club | Tag`, Player.club ? `#${Player.club.tag}` : 'Not in any Club', true)
            .addField(`Brawlers [${Player.brawlersUnlocked}/24]`, Player.brawlers.map(b => this.client.icons[b.name] + "`" + String(b.power).padStart(2, '0') + "`").join(""));
            
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