const { Event } = require('klasa');
const { channels } = require('../config');

module.exports = class extends Event {

	run(guild) {
		if (this.client.ready && guild.available && !this.client.options.preserveSettings) guild.settings.destroy().catch(() => null);
		const botLogs = this.client.channels.get(channels.bot_logs);
		if (this.client.settings.guildBlacklist.includes(guild.id)) return;
		botLogs.send(`${this.client.icons.cross} Left [\`${guild.name} (${guild.id})\`] with **${guild.members.filter(m=> !m.user.bot).size}** members and **${guild.members.filter(m=> m.user.bot).size}** bots. (\`${this.client.guilds.size} Guilds\`)`);
		
	}

};
