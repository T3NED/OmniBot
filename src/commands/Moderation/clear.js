const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			cooldown: 10,
			aliases: ['prune', 'purge'],
			permissionLevel: 4,
			requiredPermissions: ['MANAGE_MESSAGES', 'USE_EXTERNAL_EMOJIS'],
			description: 'Delete certain messages from the channel',
			usage: '[limit:integer] [user:user|invite]',
			usageDelim: ' ',
			extendedHelp: 'eg: +clear 10| +clear 10 @Piyush#7142',
		});
	}

	async run(msg, [limit = 10, option = null]) {
		await msg.delete().catch(() => null);
		let fetched = await msg.channel.messages.fetch({ limit: 100 });

		if (option) {
			const user = typeof option !== 'string' ? option : null;
			const type = typeof option === 'string' ? option : 'user';
			fetched = fetched.filter(this.getFiltered(msg, type, user));
		}

		fetched = fetched.array().slice(0, limit);
		await msg.channel.bulkDelete(fetched, true).catch(() => msg.reply('I can\'t delete messages which are 14 days or older!'));
		return msg.channel.send(`**I have cleard \`${fetched.length}\` messages**`);

	}

	getFiltered(msg, option, user) {
		switch (option) {
		case 'invite' || 'invites': return mes => /(https?:\/\/)?(www\.)?(discord\.(gg|li|me|io)|discordapp\.com\/invite)\/.+/.test(mes.content);
		case 'user': return mes => mes.author.id === user.id;
		default: return () => true;
		}
	}

};
