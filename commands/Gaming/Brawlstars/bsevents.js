const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text'],
            aliases: ["events"],
            cooldown: 3,
            permissionLevel: 0,
            description: '',
            extendedHelp: 'No extended help available.',
            usage: '',
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
        });
    }

    async run(msg) {
        
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

};
