const { Event, Duration } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Event {

    async run(guild, option, data, user) {
        if(!guild.settings.log.channel) return;
        if(!guild.settings.get(`log.${data.name}`)) return;

        const logChannel = guild.channels.get(guild.settings.log.channel);
        if(!logChannel || !logChannel.postable) return;

        const Case = guild.settings.log.case;
        await guild.settings.update("log.case", Case + 1, guild);

        switch (option) {
            case "kick":
                logChannel.send(this.generateEmbed(
                    '#dd2731',
                    `Kick | Case #${guild.settings.log.case}`, 
                    {name: 'User', value: `\`${data.user.tag} (${data.user.id})\``, inline: true},
                    {name: 'Staff', value: `\`${user.tag}\``, inline: true},
                    {name: 'Reason', value: data.reason}
                ));
                break;
            case "ban":
                logChannel.send(this.generateEmbed(
                    '#dd2731',
                    `Ban | Case #${guild.settings.log.case}`, 
                    {name: 'User', value: `\`${data.user.tag} (${data.user.id})\``, inline: true},
                    {name: 'Staff', value: `\`${user.tag}\``, inline: true},
                    {name: 'Reason', value: data.reason}
                ));
                break;
            case "unban":
                logChannel.send(this.generateEmbed(
                    '#a1f913',
                    `UnBan | Case #${guild.settings.log.case}`, 
                    {name: 'User', value: `\`${data.user.tag} (${data.user.id})\``, inline: true},
                    {name: 'Staff', value: `\`${user.tag}\``, inline: true},
                    {name: 'Reason', value: data.reason}
                ));
                break;
            case "mute":
                logChannel.send(this.generateEmbed(
                    '#f4b413',
                    `Mute | Case #${guild.settings.log.case}`, 
                    {name: 'User', value: `\`${data.user.tag} (${data.user.id})\``, inline: true},
                    {name: 'Staff', value: `\`${user.tag}\``, inline: true},
                    {name: 'For', value: data.time ? Duration.toNow(data.time) : "Until someone unmute's"},
                    {name: 'Reason', value: data.reason}
                ));
                break;
            case "unmute":
                logChannel.send(this.generateEmbed(
                    '#a1f913',
                    `UnMute | Case #${guild.settings.log.case}`, 
                    {name: 'User', value: `\`${data.user.tag} (${data.user.id})\``, inline: true},
                    {name: 'Staff', value: `\`${user.tag}\``, inline: true},
                    {name: 'Reason', value: data.reason}
                ));
                break;
            case "warns":
                logChannel.send(this.generateEmbed(
                    '#f4b413',
                    `Warn | Case #${guild.settings.log.case}`,
                    {name: 'User', value: `\`${data.user.tag} (${data.user.id})\``, inline: true},
                    {name: 'Staff', value: `\`${user.tag}\``, inline: true},
                    {name: 'Warns', value: `\`${data.warns}\``},
                    {name: 'Reason', value: data.reason }
                ));
                break;
            case "msgDelete":
                logChannel.send(this.generateEmbed(
                    '#0cf785',
                    `Message Delete | Case #${guild.settings.log.case}`,
                    {name: 'Channel', value: data.channel, inline: true},
                    {name: 'Author', value: `\`${user.tag}\``, inline: true},
                    data.attachment ? {name: "Content", value: data.content + `\n${data.attachment}`} : {name: 'Content', value: data.content}
                ));
                break;
            case "msgDeleteBulk":
                logChannel.send(this.generateEmbed(
                    '#0cf785',
                    `Purged | Case #${guild.settings.log.case}`,
                    {name: 'Amount', value: data.amount, inline: true},
                    {name: 'Channel', value: data.channel, inline: true},
                    {name: 'Staff', value: `\`${user.tag}\``, inline: true},
                    {name: 'Reason', value: data.reason}
                ));
                break;
            case "msgUpdate":
                logChannel.send(this.generateEmbed(
                    '#d1f442',
                    `Message Edited | Case #${guild.settings.log.case}`,
                    {name: 'Channel', value: data.channel, inline: true},
                    {name: 'Author', value: user, inline: true},
                    {name: 'Old Message', value: data.oldMsg},
                    {name: 'New Message', value: data.newMsg}
                ));
                break;
        }
    }

    generateEmbed(color, title, f1, f2, f3, f4) {
        const embed = new MessageEmbed()
        .setColor(color)
        .setAuthor(title)
        .setFooter(`Mod-Logs by ${this.client.user.username}`, this.client.user.displayAvatarURL());

        if(f1) embed.addField(f1.name, f1.value, f1.inline || false);
        if(f2) embed.addField(f2.name, f2.value, f2.inline || false);
        if(f3) embed.addField(f3.name, f3.value, f3.inline || false);
        if(f4) embed.addField(f4.name, f4.value, f4.inline || false);
        if(f1.image) embed.setImage(f1.image);

        return embed;
    }

};
