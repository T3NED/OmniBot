const { Event } = require('klasa');

module.exports = class extends Event {

    async run(member) {

        // Welcome Message
        const { guild } = member;
        if (!guild.settings.greet.welcome.enabled) return;
        const channel = guild.channels.get(guild.settings.greet.welcome.channel);
        if (!channel) return;
        if (!channel.postable) return;
        channel.send(this.replace(guild.settings.greet.welcome.message, member));

        // Autorole for user and bot
        await this.autorole(member, guild);
    }

    autorole(member, guild) {
        if (!guild.settings.autorole.enabled) return;
        if (!member.guild.me || !member.guild.me.permissions.has("MANAGE_ROLES")) return;
        if (member.user.bot) {
            return member.roles.add(guild.settings.autorole.role_bot);
        } else {
            return member.roles.add(guild.settings.autorole.role_user);
        }
    }

    replace(msg, member) {
        return msg
            .replace(/{mention}/, member)
            .replace(/{user}/, member.user.username)
            .replace(/{guild}/, member.guild.name)
            .replace(/{tag}/g, member.user.tag)
            .replace(/{mCount}/g, member.guild.memberCount);
    }

};
