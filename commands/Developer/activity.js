const {Command} = require("klasa");

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
      description: "Set Activity Of The Bot!",
      quotedStringSupport: false,
      usage: "<activity:string>[...]",
      usageDelim: " ",
      extendedHelp: "No extended help available."
    });
  }

  async run(message, [...activity]) {
    activity = activity.join(" ");
    await this.client.settings.update("presence.activity", activity, {
      action: "add"
    });
    const settings = this.client.settings.presence;
    await this.client.user.setPresence({
      activity: {name: settings.activity, type: settings.type},
      status: settings.status
    });

    await message.send(`Successfully Set Activity To \`${settings.activity}\``);
  }

  async init() {}
};
