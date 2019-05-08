const { Command } = require('klasa');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			runIn: ['text', 'dm'],
			cooldown: 5,
			permissionLevel: 0,
			requiredPermissions: ['USE_EXTERNAL_EMOJIS'],
			description: 'Set AFK status to you',
			usage: '[reason:string]',
			extendedHelp: 'No extended help available.',
		});
	}

	async run(msg, [reason]) {
		reason = reason || 'No reason';

		const afk = await msg.author.settings.get('afk');
		if (!afk.afk) {
			await msg.author.settings.update('afk.afk', true).then(() => {
				msg.author.settings.update('afk.reason', reason, { action: 'add' });
				msg.sendMessage('✅ ***Set You AFK!***');
			});
		}
		else {
			await msg.author.settings.update('afk.afk', false).then(() => {
				msg.author.settings.update('afk.reason', null);
				msg.sendMessage('✅ Removed Your AFK***');
			});
		}
	}
};
