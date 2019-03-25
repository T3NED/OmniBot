const {
	Command
} = require('klasa');
const {
	MessageEmbed
} = require('discord.js')

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			guarded: true,
			description: language => language.get('COMMAND_INVITE_DESCRIPTION')
		});
	}

	async run(message) {

		let x = new MessageEmbed()
			.setColor("#a5e2ff")
			.setAuthor(`Links | ${this.client.user.tag}`)
			.addField("Invite Me", `[Click Here.](https://discordapp.com/api/oauth2/authorize?client_id=${this.client.user.id}&permissions=8&scope=bot)`, true)
			.addField("Support Server", `[Click Here.](https://discord.gg/xeaFzG2)`, true)
			.addField("Twitter", `[Click Here.](https://twitter.com/bot_omni)`, true)
			.addField("Patreon", `[Click Here.](https://www.patreon.com/officallyomni)`, true)
			.addField("Github", `[Click Here](https://github.com/Omni-Discord-Bot/OmniBot)`, true)
			.addField("Website", `[Click Here](http://omnibot.ml/)`, true)

		return message.send(x);
	}

	async init() {
		if (this.client.application && !this.client.application.botPublic) this.permissionLevel = 0;
	}

};