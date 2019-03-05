const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			guarded: true,
			description: language => language.get('COMMAND_PING_DESCRIPTION')
		});
	}

	async run(message) {
		const msg = await message.send('Pinging');
		const embed = new MessageEmbed()
		.setColor('BLUE')
		.addField('⏱Roundtrip', `**${(msg.editedTimestamp || msg.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp)} ms**`)
		.addField('❣HeartBeat', `**${Math.round(this.client.ws.ping)} ms**`)
		return message.send(embed);
	}

};
