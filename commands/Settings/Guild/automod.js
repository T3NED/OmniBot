const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text'],
            aliases: ['setautomod'],
            cooldown: 10,
            permissionLevel: 6,
            description: 'Set the Automod for the server.',
            extendedHelp: 'No extended help available.',
            usage: '<toggle|show> [options:str]',
            subcommands: true,
            usageDelim: ' ',
        });
    }

    async toggle(msg, [options]) {
        if(!options) {
            if(!msg.guild.settings.automod.enabled) {
                await msg.guild.settings.update("automod.enabled", true, msg.guild).then(() => {
                    return msg.send(this.generateSuccess(`**Automod is now enabled in this server. You can view automod settings by \`${msg.guild.settings.prefix}automod show\`**`));
                });
            } else {
                await msg.guild.settings.update("automod.enabled", false, msg.guild).then(() => {
                    return msg.send(this.generateSuccess(`**Automod is now disabled in this server.**`));
                });
            }
        } else {
            const { filter } = msg.guild.settings.automod;
            const keys = [];
            for (const k of Object.keys(filter)) {
                keys.push(k);
            }

            if(!keys.includes(options.toLowerCase())) return msg.send(this.generateFailed(`**Valid Options are: \n\`${keys.join("`, `")}\`.**`));
            
            const obj = filter[options.toLowerCase()];
            const newObj = !obj;
            await msg.guild.settings.update(`automod.filter.${options.toLowerCase()}`, newObj, msg.guild).then(() => {
                return msg.send(this.generateSuccess(newObj ? `${msg.author}, **${options} is now enabled. But remember to enable the automod first.**` : `**${msg.author}, ${options} is now disabled**`));
            });
        }
    }

    async show(msg) {
        const check = {
            true: `${this.client.icons.check} Enabled`,
            false: `${this.client.icons.cross} Disabled`
        };

        return msg.send(this.showEmbed(msg, check));
    }

    generateSuccess(message) {
        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(message);
        return embed;
    }

    generateFailed(message) {
        const embed = new MessageEmbed()
            .setColor("RED")
            .setDescription(message);
        return embed;
    }
    
    showEmbed(msg, check) {
        const automod = msg.guild.settings.automod;
        const embed = new MessageEmbed()
            .setColor("#f48f42")
            .setAuthor(`Automod Settings | ${msg.guild.name}`)
            .addField("Automod", check[automod.enabled], true)
            .addField("Spam", check[automod.filter.spam], true)
            .addField("Mass Emoji", check[automod.filter.massemoji], true)
            .addField("Dehoist", check[automod.filter.dehoist], true)
            .addField("Invite", check[automod.filter.invite], true)
            .addField("Links", check[automod.filter.links], true);
        return embed;
    }

};