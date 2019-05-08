const { Event } = require('klasa');

module.exports = class extends Event {

	async run(oldMsg, newMsg) {
		if (this.client.ready && !oldMsg.partial && oldMsg.content !== newMsg.content) this.client.monitors.run(newMsg);

		if (!oldMsg.guild || oldMsg.author.bot || oldMsg.content === newMsg.content) return;
		if (oldMsg.content > 1024 || newMsg.content > 1024) return;
		this.client.emit('modLogs', oldMsg.guild, 'msgUpdate', { name: 'message', channel: oldMsg.channel, oldMsg: oldMsg.content, newMsg: newMsg.content }, oldMsg.author);
	}
};
