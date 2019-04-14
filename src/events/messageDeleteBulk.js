const { Event } = require('klasa');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            enabled: true
        });
    }

    async run(messages) {
        const msg = messages.first();
        const { guild } = msg;
        if (!guild) return;
        let reason;
        if (msg.content.startsWith(guild.settings.prefix)) {
            reason = msg.content.split(" ").slice(2).join(" ") || "No reason was provided";
        } else {
            reason = "No reason was provided";
        }
        this.client.emit("modLogs", guild, "msgDeleteBulk", {
            name: "message",
            amount: messages.size,
            channel: msg.channel,
            reason: reason
        }, msg.author);
    }

};