const { Event } = require('klasa');
const { channels } = require('../config');

module.exports = class extends Event {

	run(guild) {
		if (!guild.available) return;
		const botLogs = this.client.channels.get(channels.bot_logs);
		if (this.client.settings.guildBlacklist.includes(guild.id)) {
			return guild.leave();
		}
		botLogs.send(`${this.client.icons.check} Joined [\`${guild.name} (${guild.id})\`] with **${guild.members.filter(m=> !m.user.bot).size}** members and **${guild.members.filter(m=> m.user.bot).size}** bots. (\`${this.client.guilds.size} Guilds\`)`);
	}

};