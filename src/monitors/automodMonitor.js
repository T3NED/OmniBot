const { Monitor } = require('klasa');
const wordFilter = require('../utils/resources/auto/words');

module.exports = class extends Monitor {

	constructor(...args) {
		super(...args, {
			ignoreBots: true,
			ignoreOthers: false,
			ignoreSelf: true,
		});
	}

	async run(msg) {
		if (await msg.hasAtLeastPermissionLevel(4)) return;
		if (!msg.guild || !msg.guild.settings.automod.enabled || !msg.content) return;
		if (msg.content.startsWith(msg.guild.settings.prefix) || this.mentionPrefix(msg)) return;
		const { warns } = msg.member.settings;

		const { filter } = msg.guild.settings.automod;
		// Spam Check
		if (filter.spam) {
			const usrMsg = msg.channel.messages.filter(m => m.author.id === msg.author.id);
			const filtered = usrMsg.filter(y => y.content != usrMsg.last().content);

			if (filtered.some(m => msg.content.includes(m))) {
				msg.delete();
				await msg.reply('_Spamming is not allowed in the server_');
				await msg.member.settings.update('warns', warns + 1);
				if (msg.member.settings.warns + 1 > 3) {
					msg.member.roles.add(msg.guild.settings.roles.muted).catch(() => null);
					this.client.emit('modLogs', msg.guild, 'mute', { name: 'mute', reason: 'Automodding (`Spam`)', time: null, user: msg.author }, this.client.user);
				}
				else {
					await this.client.emit('modLogs', msg.guild, 'warns', { name: 'warn', user: msg.author, warns: warns + 1, reason: 'Automodding (`Spam`)' }, this.client.user);
				}
			}
		}

		// Profanity Filter
		if (filter.words) {
			if (wordFilter.some(w => msg.content.includes(w))) {
				msg.delete();
				await msg.reply('_Stop cursing. It is against the rules of the server_');
				await msg.member.settings.update('warns', warns + 1);
				if (msg.member.settings.warns + 1 > 3) {
					msg.member.roles.add(msg.guild.settings.roles.muted).catch(() => null);
					this.client.emit('modLogs', msg.guild, 'mute', { name: 'mute', reason: 'Automodding (`Curse Words`)', time: null, user: msg.author }, this.client.user);
				}
				else {
					await this.client.emit('modLogs', msg.guild, 'warns', { name: 'warn', user: msg.author, warns: warns + 1, reason: 'Automodding (`Curse Words`)' }, this.client.user);
				}
			}
		}
	}

	mentionPrefix({ content }) {
		const prefixMention = this.prefixMention.exec(content);
		return prefixMention ? { length: prefixMention[0].length, regex: this.prefixMention } : null;
	}

	init() {
		this.prefixMention = new RegExp(`^<@!?${this.client.user.id}>`);
	}
};
