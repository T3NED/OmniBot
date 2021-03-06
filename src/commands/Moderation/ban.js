const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			enabled: true,
			requiredPermissions: ['BAN_MEMBERS'],
			cooldown: 10,
			permissionLevel: 4,
			description: 'Ban Someone from the guild',
			extendedHelp: 'No extended help available.',
			usage: '<member:membername> [reason:string] [...]',
			usageDelim: ' ',
		});
	}

	async run(msg, [member, ...reason]) {
		if (member.id === this.client.user.id) return msg.send(this.generateFailed('You can\'t ban Omni.'));
		if (member.id === msg.author.id) return msg.send(this.generateFailed('You can\'t ban yourself.'));

		if (member.roles.highest.position >= msg.member.roles.highest.position) return msg.send(this.generateFailed('You can\'t ban that member.'));
		if (!member.bannable) return msg.send(this.generateFailed('I was unable to ban that member.'));

		reason = reason.length > 0 ? reason.join(' ') : 'No reason was provided';
		try {
			await member.ban({ reason: reason });
		}
		catch (e) {
			return msg.send(this.generateFailed('I was unable to ban that member'));
		}

		this.client.emit('modLogs', msg.guild, 'ban', { name: 'ban', reason: reason, user: member.user }, msg.author);
		return msg.send(this.generateSuccess(`Successfully banned ${member.user.tag}`));
	}

	generateSuccess(congrats) {
		const embed = new MessageEmbed()
			.setColor('GREEN')
			.setDescription(congrats);
		return embed;
	}

	generateFailed(failed) {
		const embed = new MessageEmbed()
			.setColor('RED')
			.setDescription(failed);
		return embed;
	}

};
