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
            usage: '<idea:str> [...]',
        });

        this.customizeResponse(
            "idea", 
            "**Please provide a valid idea**"
        );
    }

    async run(msg, [...idea]) {
        if(idea[0].length <= 10) {
            return msg.channel.send(this.generateFailed(`${msg.author}, Please provide a valid idea. Idea must be more than 10 letters.`));
        }
        let image = msg.attachments.size > 0 ? await this.checkAttachement(msg.attachments.array()[0].url) : null;
        const ideaChannel = this.client.channels.get(config.channels.support);
        const check = this.client.emojis.get("537574237452369920");
        const cross = this.client.emojis.get("537574237267951617");
        msg.channel.send(this.generateConfirm(`Thank you ${msg.author}, your suggestion has been sent to my [Support server](https://discord.gg/TutA5bZ)`));
        await ideaChannel.send(this.generateSuccess(idea, msg.author, msg, image)).then(m => {
            m.react(check);
            m.react(cross);
        });
    }

    generateConfirm(message) {
        const embed = new MessageEmbed()
            .setColor("#f48f42")
            .setDescription(message);
        return embed;
    }

    generateSuccess(message, author, orgMsg, image) {
        const embed = new MessageEmbed()
            .setAuthor(`Idea | ${author.tag}`, author.displayAvatarURL())
            .setFooter(`To send Idea: ${orgMsg.guild.settings.prefix}idea <idea>`)
            .setThumbnail(author.displayAvatarURL())
            .setColor("GREEN")
            .setDescription(message)
            .setImage(image);
        return embed;
    }

    generateFailed(message) {
        const embed = new MessageEmbed()
        .setColor("RED")
        .setDescription(message);
        return embed;
    }

    checkAttachement(url) {
        const isImage = /\.(jpe?g|png|gif)$/i.test(url);
        if (!isImage) return null;
        return url;
    }

};
