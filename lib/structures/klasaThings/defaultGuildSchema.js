const {KlasaClient} = require("klasa");

module.exports = KlasaClient.defaultGuildSchema
  /*
Logs
 */
  .add("loggingChannel", "textchannel")
  // Configuration
  .add("configuration", folder =>
    folder
      .add("prefix", "string", {default: "."})
      .add("autorole", "role")
      .add("w-channel", "textchannel")
      .add("l-channel", "textchannel")
      .add("w-message", "string")
      .add("l-message", "string")
      .add("logs", "textchannel")
      .add("mod", "role")
      .add("dj", "role")
  );
