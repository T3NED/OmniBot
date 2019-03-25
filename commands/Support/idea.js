const { Command } = require('klasa');
const config = require('../../config');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            aliases: ["fb!idea", "suggest"],
            cooldown: 5,
            permissionLevel: 0,
            description: 'Suggest an idea for the bot',
            extendedHelp: 'No extended help available.',
            usage: '<idea:str>',
        });

        this.customizeResponse(
            "idea", 
            "**Please provide a valid idea**"
        );
    }

    async run(msg, [...idea]) {
        if(idea[0].length <= 10) {
            return msg.channel.send(this.generateFailed(`${msg.author}, Please provide a valid idea. Idea must be more than 10 letters.`))
        }
        const ideaChannel = this.client.channels.get(config.channels.support);
        msg.delete().then(msg.channel.send(this.generateConfirm(`Thank you ${msg.author}, your suggestion has been sent to my [Support server](https://discord.gg/xeaFzG2)`)));
        await ideaChannel.send(this.generateSuccess(idea, msg.author, msg)).then(m => {
            m.react("✅");
            m.react("❌");
        });
    }

    generateConfirm(message) {
        const embed = new MessageEmbed()
            .setColor("#f48f42")
            .setDescription(message);
        return embed;
    }

    generateSuccess(message, author, orgMsg) {
        const embed = new MessageEmbed()
            .setAuthor(`Idea | ${author.tag}`, author.displayAvatarURL())
            .setFooter(`To send Idea: ${orgMsg.guild.settings.prefix}idea <idea>`)
            .setThumbnail(author.displayAvatarURL())
            .setColor("GREEN")
            .setDescription(message);
        return embed;
    }

    generateFailed(message) {
        const embed = new MessageEmbed()
        .setColor("RED")
        .setDescription(message);
        return embed;
    }

};
