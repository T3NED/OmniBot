const { Task } = require('klasa');

module.exports = class extends Task {
    
    async run({ guild, user }) {
        const Guild = this.client.guilds.get(guild);
        if (!Guild) return;
        const member = await Guild.members.fetch(user).catch(() => null);
        if (!member) return;
        await member.roles.remove(Guild.settings.roles.muted);
        this.client.emit("modLogs", Guild, "unmute", {name: "mute", reason: "Time's up", user: member.user}, this.client.user);
    }

};
