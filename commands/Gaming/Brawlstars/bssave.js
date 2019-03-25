const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            aliases: ["bsregister"],
            cooldown: 3,
            permissionLevel: 0,
            description: '',
            extendedHelp: 'No extended help available.',
            usage: '<resp:str>',
        });

        this.customizeResponse(
            "resp",
            "Please provide a valid tag"
        )
    }

    async run(msg, [resp]) {
        let tag = resp.toUpperCase();
        if(tag[0].charAt(0) === "#") tag = tag.slice(1);
        try {
            await this.client.brawl.getPlayer(tag)
            await msg.author.settings.update("ign.brawlstars", tag).then(() => {
                msg.channel.send(this.generateSuccess(`**${msg.author}, your tag \`(${tag})\` has been saved to our database. Now you can view your stats from any server where ${this.client.user} is in.**`))
            })
        } catch (e) {
            if(e.message == "Invalid Tag.") {
                msg.channel.send(this.generateFailed(`**${msg.author}, the tag you provided \`(${tag})\` is invalid.**\n\n**Tag will look like this.**`, 'https://cdn.discordapp.com/attachments/537104186131873821/537162792671903764/unknown.png'))
            } else {
                msg.channel.send(this.generateFailed(`**${msg.author}, the API is currently down. Try again later.**`))
            }
        };
    }

    generateSuccess(message) {
        const embed = new MessageEmbed()
            .setColor("#f48f42")
            .setDescription(message);
        return embed;
    }

    generateFailed(message, image) {
        const embed = new MessageEmbed()
        .setColor("RED")
        .setImage(image)
        .setDescription(message);
        return embed;
    }

};
