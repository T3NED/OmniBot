const {Command} = require("klasa");
const statusArray = ["online", "idle", "dnd"];

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      enabled: true,
      runIn: ["text"],
      cooldown: 10,
      deletable: false,
      bucket: 1,
      aliases: ["setstatus"],
      guarded: false,
      nsfw: false,
      permissionLevel: 10,
      requiredPermissions: [],
      requiredSettings: [],
      subcommands: false,
      description: "Set Status Of The Bot!",
      quotedStringSupport: false,
      usage: "<status:string>",
      usageDelim: " ",
      extendedHelp: "No extended help available."
    });
  }

  async run(message, [status]) {
    status = status.toLowerCase();
    if (!statusArray.includes(status)) {
      return message.reply("The Given Activity Isn't Valid");
    }
    await this.client.settings.update("presence.status", status, {
      action: "add"
    });
    const settings = this.client.settings.presence;
    await this.client.user.setPresence({
      activity: {name: settings.activity, type: settings.type},
      status: settings.status
    });

    await message.send(`Successfully Set Status To \`${settings.status}\``);
  }

  async init() {}
};
