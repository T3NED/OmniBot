const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text'],
            aliases: ["club"],
            cooldown: 3,
            permissionLevel: 0,
            description: 'Shows the Club information of the player.',
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
                    if(!player.club) {
                        return msg.channel.send(this.generateFailed(`${msg.author}, You are not in a club. If you are in a club then it is an inernal error. \nPlease try again later`));
                    } else {
                        let club = await this.client.brawl.getClub(player.club.tag);
                        return msg.channel.send(this.generateSuccess(club));
                    }
                } catch (e) {
                    return msg.channel.send(this.generateFailed(`${msg.author}, the API is currently down. Try again later.`));
                }
            } else {
                return msg.channel.send(this.generateFailed(`${msg.author}, You don't have a saved Profile Tag!`));
            }
        } else {
            let tag = await this.resolveResponse(resp, msg);
            if(tag === null) {
                return msg.channel.send(this.generateFailed(`${msg.author}, Please check if that user has saved a Profile Tag!`));
            }
            let club = await this.get_club(tag);
            switch (club) {
                case 'Invalid Tag':
                    msg.channel.send(this.generateFailed(`${msg.author}, Invalid Tag Provided`));
                    break;
                case 'Error':
                    msg.channel.send(this.generateFailed(`${msg.author}, the API is currently down. Try again later.`));
                    break;
                default:
                    if(!club.members) return msg.channel.send(this.generateFailed(`${msg.author}, Error fetching the api. Please try again later.`));
                    msg.channel.send(this.generateSuccess(club));
                    break;
            }
        }
    }

    generateSuccess(Club) {
        const emotes = this.client.icons;
        const President = Club.members.find(m => m.role === "President").name;
        const topMembers = Club.members.slice(0, 4).map(m => `${m.trophies} - ${m.name}`);
        const topLevel = Club.members.sort(function(a, b){return b.expLevel - a.expLevel;}).slice(0, 4).map(m => `${m.expLevel} - ${m.name}`);
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`${Club.name} | #${Club.tag}`)
            .setThumbnail(Club.badgeUrl)
            .addField('Region', `:flag_${Club.region.toLowerCase()}:` + Club.region, true)
            .addField('Status', Club.status, true)
            .addField('Trophies', emotes.Trophy + Club.trophies, true)
            .addField('Required Trophies', emotes.Trophy + Club.requiredTrophies, true)
            .addField('President', President, true)
            .addField('Members', `${Club.onlineMembers}/${Club.membersCount}`, true)
            .addField('Top Members'+ emotes.Trophy, topMembers, true)
            .addField('Top Levels' + emotes.Experience, topLevel, true);
            if(Club.description) embed.setDescription(Club.description);
            
        return embed;
    }

    generateFailed(message) {
        const embed = new MessageEmbed()
        .setColor("RED")
        .setDescription(message);
        return embed;
    }

    async compare(a,b) {
		if (a.expLevel > b.expLevel) {
				return -1;
		}
		if (a.expLevel < b.expLevel) {
			return 1;
		}
		return 0;
	}

    async get_club(tag) {
        try {
            let club = await this.client.brawl.getClub(tag);
            return club;
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
            let ptag = orgMsg.mentions.members.first().user.settings.ign.brawlstars;
            let tag;
            await this.client.brawl.getPlayer(ptag).club ? tag = await this.client.brawl.getPlayer(ptag).club.tag : tag = null;
            return tag;
        } else if(orgMsg.guild.members.get(response)) {
            let ptag = orgMsg.guild.members.get(response).user.settings.ign.brawlstars;
            let tag;
            await this.client.brawl.getPlayer(ptag).club ? tag = await this.client.brawl.getPlayer(ptag).club.tag : tag = null;
            return tag;
        } else if(orgMsg.guild.members.find(m => m.user.username === response)) {
            let ptag = orgMsg.guild.members.find(m => m.user.username === response).user.settings.ign.brawlstars;
            let tag;
            await this.client.brawl.getPlayer(ptag).club ? tag = await this.client.brawl.getPlayer(ptag).club.tag : tag = null;
            return tag;
        } else {
            let tag = response.trim().toUpperCase().replace(/#/g, '');
            return tag;
        }
    }

};
