const { Monitor } = require('klasa');

module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, {
            ignoreBots: false,
            ignoreOthers: false,
            ignoreSelf: true
        });
    }

    async run(msg) {
        if (await msg.hasAtLeastPermissionLevel(4)) return;
        if (!msg.guild || !msg.guild.settings.automod.enabled || !msg.content || !msg.guild.settings.automod.filter.invite) return;
        const { warns } = msg.member.settings;
        const regex = /(https?:\/\/)?(www\.)?(discord\.(gg|li|me|io)|discordapp\.com\/invite)\/.+/;

        if (!regex.test(msg.content)) return;
        msg.delete();
        await msg.reply("_Invite Links are not allowed in the server_");
        await msg.member.settings.update("warns", warns + 1);
        if (msg.member.settings.warns + 1 > 3) {
            msg.member.roles.add(msg.guild.settings.roles.muted).catch(() => null);
            this.client.emit("modLogs", msg.guild, "mute", {name: "mute", reason: "Automodding (`Invite Link`)", time: null, user: msg.author}, this.client.user);
        } else {
            await this.client.emit("modLogs", msg.guild, "warns", {name: "warn", user: msg.author, warns: warns + 1, reason: "Automodding (`Invite Link`)"}, this.client.user);
        }
    }

};
