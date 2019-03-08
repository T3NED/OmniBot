const {KlasaClient} = require("klasa");

module.exports = KlasaClient.defaultGuildSchema
  .add("loggingChannel", "textchannel")
  // Configuration
  .add("configuration", folder =>
    folder
      .add("prefix", "string", {default: "."})
      .add("autorole", "role")
      .add("welcome-channel", "textchannel")
      .add("leave-channel", "textchannel")
      .add("welcome-message", "string")
      .add("leave-message", "string")
      .add("logs", "textchannel")
      .add("mod", "role")
      .add("dj", "role")
  );
