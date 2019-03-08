const {Event} = require("klasa");
const {MessageEmbed} = require("discord.js");

class modLogs extends Event {
  constructor(...args) {
    super(...args, {
      enabled: true,
      once: false
    });
  }

  async run(guild, type, data) {
    if (!guild.settings.loggingChannel) return;

    const channel = this.client.channels.get(
      guild.settings.get("loggingChannel")
    );

    if (!channel || !channel.postable || !channel.embedable) return;

    switch (type) {
      case "join":

      default:
        break;
    }
  }

  generateEmbed(message, color, data) {
    const embed = new MessageEmbed().setColor(color).setDescription(message);
  }
}
