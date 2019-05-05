const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['details', 'what'],
			guarded: true,
			description: language => language.get('COMMAND_INFO_DESCRIPTION')
		});
	}

	async run(message) {

		const x = new MessageEmbed()
		.setColor('#f4428c')
		.setDescription(`__**🗃 About 【${this.client.user.username}】**__\n\n**【${this.client.user.username}】 is a multipurpose bot focused on all aspects of your server.\n【${this.client.user.username}】is a bot which makes your work easier by its special features which includes Moderation, Music, Gaming Stats and much more.\n\n**__**📨 Support 【${this.client.user.username}】**__\n\n**🌀 If you find out any bug, report it using bug command. Usage: +bug <Bug>\n\n🌀 If you have any idea or suggestion for 【${this.client.user.username}】 use the idea command. Usage: +idea <suggestion/idea>**`);
		return message.send(x);
	}
};
