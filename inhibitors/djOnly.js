const {Inhibitor} = require("klasa");

module.exports = class extends Inhibitor {
  constructor(...args) {
    super(...args, {spamProtection: true});
  }

  async run(msg, cmd) {
    if (!cmd.djOnly) return null;
    if (msg.channel.type !== "text")
      throw "This Command can only be executed in the server!";

    if (!msg.guild.settings.config.djOnly) return null;
  }
};
