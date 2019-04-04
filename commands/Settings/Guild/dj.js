const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text'],
            aliases: ['setdj'],
            cooldown: 10,
            permissionLevel: 6,
            description: 'Set the DJ role for the server.',
            extendedHelp: 'No extended help available.',
            usage: '[role:rolename]'
        });
    }

    async run(msg, [role]) {
        if(!msg.guild.settings.music.dj && !role) return msg.send(this.generateEmbed(`**${msg.author}, There's no DJ role set for this server.**`));
        if(!role) return msg.send(this.generateEmbed(`**${msg.author}, DJ for this server is ${msg.guild.roles.get(msg.guild.settings.music.dj).toString()}**`));
        await msg.guild.settings.update("music.dj", role, msg.guild).then(() => {
            msg.send(this.generateEmbed(`**${msg.author}, Set the DJ for this server to ${role}**`));
        });
    }

    generateEmbed(message) {
        const embed = new MessageEmbed()
            .setColor("#f48f42")
            .setDescription(message);
        return embed;
    }

};