const { Event } = require('klasa');

module.exports = class extends Event {

    async run(member) {

        // Farewell Message
        const { guild } = member;
        if (!guild.settings.greet.leave.enabled) return;
        const channel = guild.channels.get(guild.settings.greet.leave.channel);
        if (!channel) return;
        if (!channel.postable) return;
        channel.send(this.replace(guild.settings.greet.leave.message, member));

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
