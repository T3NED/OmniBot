const {Monitor} = require("klasa");

module.exports = class extends Monitor {
  constructor(...args) {
    super(...args, {ignoreOthers: false});
  }

  async run(msg) {
    const {guild, channel, author} = msg;
    if (!guild || !channel.postable || author.id === this.client.user.id) return;
    if (msg.mentions.users.size) {
      const mentioned = msg.mentions.users.first();
      if (mentioned.settings.afk.afk) {
        msg.sendMessage(
          `⏰ | ***${mentioned.tag} is currently AFK.*** \`(${
            mentioned.settings.afk.reason
          })\``
        );
      }
    }

    if (msg.author.settings.afk.afk) {
      await msg.author.settings.update([
        ["afk.afk", false],
        ["afk.reason", null]
      ]);
      const m = await msg.sendMessage(
        `**${msg.author.tag}** ***Welcome Back Your AFK Is removed***`
      );
      await m.delete({timeout: 10000});
    }
  }
};
