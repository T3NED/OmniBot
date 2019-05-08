const { Event } = require('klasa');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			enabled: true,
		});
	}

	async run(msg) {
		const { guild } = msg;
		if (!guild) return;
		if (msg.author.id === this.client.id) return;
		if (!msg.content && msg.embeds[0]) return;

		this.client.emit('modLogs', guild, 'msgDelete', {
			name: 'message',
			channel: msg.channel,
			content: msg.content,
			attachment: msg.attachments.size > 0 ? msg.attachments.array()[0].url : '',
		}, msg.author);
	}
};