const { Event } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Event {

    async run(guild, option, data, user) {
        if(!guild.settings.log.channel) return;
        if(!guild.settings.get(`log.${data.name}`)) return;

        const logChannel = guild.channels.get(guild.settings.log.channel);
        if(!logChannel || !logChannel.postable) return;

        switch (option) {
            case "kick":
                logChannel.send(this.generateEmbed(
                    '#dd2731',
                    `Kick | ${guild.name}`, 
                    {name: 'User', value: `\`${user.tag} (${user.id})\``, inline: true},
                    {name: 'Staff', value: `\`${data.tag}\``,inline: true},
                    {name: 'Reason', value: data.reason}
                ));
                break;
            case "ban":
                logChannel.send(this.generateEmbed(
                    '#dd2731',
                    `Ban | ${guild.name}`, 
                    {name: 'User', value: `\`${user.tag} (${user.id})\``, inline: true},
                    {name: 'Staff', value: `\`${data.tag}\``,inline: true},
                    {name: 'Reason', value: data.reason}
                ));
                break;
            case "unban":
                logChannel.send(this.generateEmbed(
                    '#dd2731',
                    `UnBan | ${guild.name}`, 
                    {name: 'User', value: `\`${user.tag} (${user.id})\``, inline: true},
                    {name: 'Staff', value: `\`${data.tag}\``,inline: true},
                    {name: 'Reason', value: data.reason}
                ));
                break;
            case "mute":
                logChannel.send(this.generateEmbed(
                    '#dd2731',
                    `Mute | ${guild.name}`, 
                    {name: 'User', value: `\`${user.tag} (${user.id})\``, inline: true},
                    {name: 'Staff', value: `\`${data.tag}\``,inline: true},
                    {name: 'Reason', value: data.reason}
                ));
                break;
            case "unmute":
                logChannel.send(this.generateEmbed(
                    '#dd2731',
                    `UnMute | ${guild.name}`, 
                    {name: 'User', value: `\`${user.tag} (${user.id})\``, inline: true},
                    {name: 'Staff', value: `\`${data.tag}\``,inline: true},
                    {name: 'Reason', value: data.reason}
                ));
                break;
            case "msgDelete":
                logChannel.send(this.generateEmbed(
                    '#0cf785',
                    `Message Delete | ${guild.name}`,
                    {name: 'Channel', value: data.channel, inline: true},
                    {name: 'User', value: `\`${user.tag}\``,inline: true},
                    data.attachment ? {name: "Content", value: data.content + `\n${data.attachment}`} : {name: 'Content', value: data.content}
                ));
                break;
            case "msgDeleteBulk":
                logChannel.send(this.generateEmbed(
                    '#0cf785',
                    `Purged | ${guild.name}`,
                    {name: 'Amount', value: data.amount, inline: true},
                    {name: 'Channel', value: data.channel, inline: true},
                    {name: 'Staff', value: `\`${user.tag}\``,inline: true},
                    {name: 'Reason', value: data.reason}
                ));
                break;
            case "msgUpdate":
                logChannel.send(this.generateEmbed(
                    '#dd2731',
                    `Message Edited | ${guild.name}`,
                    {name: 'Old Message', value: data.old, inline: true},
                    {name: 'New Message', value: data.new, inline: true}
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
        if(f3.value) embed.addField(f3.name, f3.value, f3.inline || false);
        if(f4) embed.addField(f4.name, f4.value, f4.inline || false);
        if(f1.image) embed.setImage(f1.image);

        return embed;
    }

};
