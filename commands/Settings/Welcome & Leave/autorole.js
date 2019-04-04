const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text'],
            aliases: ['setautorole'],
            cooldown: 10,
            permissionLevel: 6,
            description: 'Set the autorole for the server when a user join.',
            extendedHelp: 'No extended help available.',
            usage: '[role:rolename]'
        });
    }

    async run(msg, [role]) {
        if(msg.guild.settings.autorole.enabled && !role) return msg.send(this.generateEmbed(`**${msg.author}, There's no autorole set for this server.**`));
        if(!role) return msg.send(this.generateEmbed(`**${msg.author}, Autorole for this server is ${msg.guild.roles.get(msg.guild.settings.roles.autorole).toString()}**`));
        await msg.guild.settings.update("roles.autorole", role, msg.guild).then(() => {
            msg.send(this.generateEmbed(`**${msg.author}, Set the autorole for this server to ${role}**`));
        });
    }

    generateEmbed(message) {
        const embed = new MessageEmbed()
            .setColor("#f48f42")
            .setDescription(message);
        return embed;
    }

};