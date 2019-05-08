const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			guarded: true,
			description: 'Returns with your ping',
		});
	}

	async run(message) {
		const msg = await message.send('Pinging');
		return message.send(`**Roundrip took: \`${(msg.editedTimestamp || msg.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp)} ms\` | HeartBeat: \`${Math.round(this.client.ws.ping)} ms\`**`);
	}
};
