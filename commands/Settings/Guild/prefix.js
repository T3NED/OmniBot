const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text'],
            aliases: ['setprefix'],
            cooldown: 10,
            permissionLevel: 6,
            description: 'Changes the prefix of Omni for the current server',
            extendedHelp: 'No extended help available.',
            usage: '[prefix:str]',
        });
    }

    async run(msg, [prefix]) {
        if(!prefix) return msg.send(this.generateEmbed(`**${msg.author}, Prefix for this server is** ` + "`" + msg.guild.settings.prefix + "`"));
        await msg.guild.settings.update({ prefix: prefix }).then(() => {
            msg.send(this.generateEmbed(`**${msg.author}, Changed the prefix to** ` + "`" + prefix + "`"))
        });
    }

    generateEmbed(message) {
        const embed = new MessageEmbed()
            .setColor("#f48f42")
            .setDescription(message);
        return embed;
    }

};
