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
            description: '',
            extendedHelp: 'No extended help available.',
            usage: '[resp:str]',
        });

        this.customizeResponse(
            "resp",
            "Please provide a valid tag"
        )
    }

    async run(msg, [resp]) {
        if(!resp) {
            if(msg.author.settings.ign.brawlstars) {
                try {
                    let player = await this.client.brawl.getPlayer(msg.author.settings.ign.brawlstars);
                    return msg.channel.send(this.generateSuccess(player));
                } catch (e) {
                    console.log(e)
                    return msg.channel.send(this.generateFailed(`${msg.author}, the API is currently down. Try again later.`));
                }
            } else {
                return msg.channel.send(this.generateFailed(`${msg.author}, You don't have a saved tag!`));
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
                    msg.channel.send(this.generateSuccess(player));
                    break;
            }
        }
    }

    generateSuccess(Player) {
        const embed = new MessageEmbed()
            .setColor("#f48f42")
            .setAuthor(`${Player.name} | #${Player.tag}`)
            .setThumbnail(Player.avatarUrl)
            .addField('Trophies', Player.trophies)
            .addField('Highest Trophies', Player.highestTrophies)
            .addField('Experience', `${Player.expLevel} - ${Player.expFmt}`)
            .addField('3v3 Victories', Player.victories)
            .addField('Solo Showdown Victories', Player.soloShowdownVictories)
            .addField('Duo Showdown Victories', Player.duoShowdownVictories)
            .addField('Robo Rumble Time', Player.bestRoboRumbleTime)
            .addField('Big Brawler Time', Player.bestRoboRumbleTime)
            .addField('Club', Player.club ? `${Player.club.name} - ${Player.club.role}` : 'Not in any Club')
            .addField(`Brawlers [${Player.brawlersUnlocked}/24]`, Player.brawlers.map(b => b.name).join(" | "))
            
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
