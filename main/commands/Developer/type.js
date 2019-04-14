const {Command} = require("klasa");
const statusArray = ["PLAYING", "LISTENING", "WATCHING"];

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      enabled: true,
      runIn: ["text"],
      cooldown: 10,
      deletable: false,
      bucket: 1,
      aliases: ["setactivity"],
      guarded: false,
      nsfw: false,
      permissionLevel: 10,
      requiredPermissions: [],
      requiredSettings: [],
      subcommands: false,
      description: "Set Status Of The Bot!",
      quotedStringSupport: false,
      usage: "<type:string>",
      usageDelim: " ",
      extendedHelp: "No extended help available."
    });
  }

  async run(message, [type]) {
    type = type.toUpperCase();
    if (!statusArray.includes(type)) {
      return message.reply("The Given Activity Isn't Valid");
    }
    await this.client.settings.update("presence.type", type, {
      action: "add"
    });
    const settings = this.client.settings.presence;
    await this.client.user.setPresence({
      activity: {name: settings.activity, type: settings.type},
      status: settings.status
    });

    await message.send(`Successfully Set type To \`${settings.type}\``);
  }

  async init() {}
};
