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
			description: 'Set the Mute role for the server.',
			extendedHelp: 'No extended help available.',
			usage: '[role:rolename]',
		});
	}

	async run(msg, [role]) {
		if(!msg.guild.settings.music.dj && !role) return msg.send(this.generateEmbed(`**${msg.author}, There's no Mute role set for this server.**`));
		if(!role) return msg.send(this.generateEmbed(`**${msg.author}, Mute Role for this server is ${msg.guild.roles.get(msg.guild.settings.roles.muted).toString()}**`));

		await msg.guild.settings.update('roles.muted', role, msg.guild).then(() => {
			msg.send(this.generateEmbed(`**${msg.author}, Set the Mute Role for this server to ${role}**`));
		});
	}

	generateEmbed(message) {
		const embed = new MessageEmbed()
			.setColor('#f48f42')
			.setDescription(message);
		return embed;
	}
};