const { Command } = require('klasa');
const config = require('../../config');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			enabled: true,
			runIn: ['text', 'dm', 'group'],
			aliases: ['fb!bug'],
			cooldown: 5,
			permissionLevel: 0,
			description: 'Report a bug in the bot',
			extendedHelp: 'No extended help available.',
			usage: '<bug:str> [...]',
		});

		this.customizeResponse(
			'bug',
			'**Please provide a valid bug**'
		);
	}

	async run(msg, [...bug]) {
		if(bug[0].length <= 10) {
			return msg.channel.send(this.generateFailed(`${msg.author}, Please provide a valid bug. Bug must be more than 10 letters.`));
		}
		const bugChannel = this.client.channels.get(config.channels.support);
		const check = this.client.emojis.get('537574237452369920');
		const cross = this.client.emojis.get('537574237267951617');
		const image = msg.attachments.size > 0 ? await this.checkAttachement(msg.attachments.array()[0].url) : null;
		msg.channel.send(this.generateConfirm(`Thank you ${msg.author}, Bug has been reported to my [Support server](https://discord.gg/TutA5bZ)`));
		await bugChannel.send(this.generateSuccess(bug, msg.author, msg, image)).then(m => {
			m.react(check);
			m.react(cross);
		});
	}

	generateConfirm(message) {
		const embed = new MessageEmbed()
			.setColor('#f48f42')
			.setDescription(message);
		return embed;
	}

	generateSuccess(message, author, orgMsg, image) {
		const embed = new MessageEmbed()
			.setAuthor(`Bug | ${author.tag}`, author.displayAvatarURL())
			.setFooter(`To send bug: ${orgMsg.guild.settings.prefix}bug <bug>`)
			.setThumbnail(author.displayAvatarURL())
			.setColor('RED')
			.setDescription(message)
			.setImage(image);
		return embed;
	}

	generateFailed(message) {
		const embed = new MessageEmbed()
			.setColor('RED')
			.setDescription(message);
		return embed;
	}

	checkAttachement(url) {
		const isImage = /\.(jpe?g|png|gif)$/i.test(url);
		if (!isImage) return null;
		return url;
	}
};