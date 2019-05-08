const { Command, util: { isFunction }, RichDisplay } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['commands'],
			guarded: true,
			description: language => language.get('COMMAND_HELP_DESCRIPTION'),
			usage: '(Command:command)',
		});

		this.createCustomResolver('command', (arg, possible, message) => {
			if (!arg || arg === '') return undefined;
			return this.client.arguments.get('command').run(arg, possible, message);
		});

		this.handlers = new Map();
	}

	async run(message, [command]) {
		if (command) {
			const info = [
				`📄__**Info on *${command.name}***__\n${isFunction(command.description) ? command.description(message.language) : command.description}`,
				`🖊__**Usage**__\n\`${command.usage.fullUsage(message)}\``,
				`🗒__**Extended Help**__\n${isFunction(command.extendedHelp) ? command.extendedHelp(message.language) : command.extendedHelp}`,
			].join('\n\n');
			return message.send(this.generateEmbed(info));
		}

		if (!message.flags.all && message.guild) {
			const previousHandler = this.handlers.get(message.author.id);
			if (previousHandler) previousHandler.stop();

			const handler = await (await this.buildDisplay(message)).run(await message.send('Loading Commands...'), {
				filter: (reaction, user) => user.id === message.author.id,
				time: 180000,
			});
			handler.on('end', () => this.handlers.delete(message.author.id));
			this.handlers.set(message.author.id, handler);
			return handler;
		}

		return message.channel.send(await this.buildHelp(message), { split: { char: '\n' } });
	}

	async buildHelp(message) {
		const commands = await this._fetchCommands(message);
		const { prefix } = message.guild.settings;

		const helpMessage = [];
		for (const [category, list] of commands) {
			helpMessage.push(`**${category} Commands**:\n`, list.map(this.formatCommand.bind(this, message, prefix, false)).join('\n'), '');
		}

		return helpMessage.join('\n');
	}

	async buildDisplay(message) {
		const commands = await this._fetchCommands(message);
		const { prefix } = message.guildSettings;
		const display = new RichDisplay();
		const color = message.member.displayColor;
		for (const [category, list] of commands) {
			display.addPage(new MessageEmbed()
				.setTitle(`${category} Commands`)
				.setColor(color)
				.setDescription(list.map(this.formatCommand.bind(this, message, prefix, true)).join('\n'))
			);
		}

		return display;
	}

	formatCommand(message, prefix, richDisplay, command) {
		const description = isFunction(command.description) ? command.description(message.language) : command.description;
		return richDisplay ? `\`${prefix}${command.name}\` - ${description}` : `\`${prefix}${command.name}\` - ${description}`;
	}

	async _fetchCommands(message) {
		const run = this.client.inhibitors.run.bind(this.client.inhibitors, message);
		const commands = new Map();
		await Promise.all(this.client.commands.filter(x => !['Admin', 'General', 'Developer'].includes(x.category)).map((command) => run(command, true)
			.then(() => {
				const category = commands.get(command.category);
				if (category) category.push(command);
				else commands.set(command.category, [command]);
			}).catch(() => {
				// noop
			})
		));

		return commands;
	}

	generateEmbed(description) {
		return new MessageEmbed()
			.setColor('ORANGE')
			.setDescription(description);
	}

};