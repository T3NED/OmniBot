const { Command, version: klasaVersion, Duration } = require('klasa');
const { version: discordVersion, MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			guarded: true,
			description: language => language.get('COMMAND_STATS_DESCRIPTION')
		});
	}

	async run(message) {
		let [users, guilds, channels, memory, counter] = [0, 0, 0, 0, 0];

		if (this.client.shard) {
			const results = await this.client.shard.broadcastEval(`[this.users.size, this.guilds.size, this.channels.size, (process.memoryUsage().heapUsed / 1024 / 1024)], this.settings.counter`);
			for (const result of results) {
				users += result[0];
				guilds += result[1];
				channels += result[2];
				memory += result[3];
				counter += result[4];
			}
        }

        const stats = new MessageEmbed()
        .setColor('#42f4c5')
        .setAuthor(`Stats | ${this.client.user.tag}`)
        .setThumbnail(`${this.client.user.displayAvatarURL()}`)
				.addField('General', `Users- ${(users || this.client.users.size).toLocaleString()}\nGuilds- ${(guilds || this.client.guilds.size).toLocaleString()}\nChannels- ${(channels || this.client.channels.size).toLocaleString()}`, true)
				.addField('System', `Memory Usage- ${(memory || process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\nUptime- ${Duration.toNow(Date.now() - (process.uptime() * 1000))}\nPing- ${Math.round(this.client.ws.ping)} ms`, true)
				.addField('Version', `NodeJS- ${process.version}\nDiscord.Js- ${discordVersion}\nKlasa- ${klasaVersion}`, true)
				.addField('Commands', `Total Commands- ${this.client.commands.size}\nCommands Ran- ${counter ? counter.total : this.client.settings.counter.total}\nMost Used- ${counter ? counter.commands.sort(this.compare)[0].name : this.client.settings.counter.commands.sort(this.compare)[0].name}`, true);

		return message.sendEmbed(stats);
	}

	async compare(a,b) {
		if (a.count > b.count) {
				return -1;
		}
		if (a.count < b.count) {
			return 1;
		}
		return 0;
	}
};
