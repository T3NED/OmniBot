const {KlasaClient} = require("klasa");

module.exports = KlasaClient.defaultGuildSchema
  // Configuration
  .add("config", folder =>
    folder
      .add("prefix", "string", {default: "."})
      .add("autorole", "role")
      .add("welcome-channel", "textchannel")
      .add("leave-channel", "textchannel")
      .add("welcome-message", "string")
      .add("leave-message", "string")
      .add("logs", "textchannel")
      .add("mod", "role")
      .add("djOnly", "boolean", {default: false})
      .add("dj", "user", {array: true})
  );
