const {KlasaClient} = require("klasa");
const config = require("../../../config.json");

module.exports = KlasaClient.defaultGuildSchema
  
  // Logging
  .add("logging", folder => folder
    .add("logs", "textchannel")
    .add("enabled", "boolean", {default: false})
  )

  // Roles
  .add("roles", folder => folder
    .add("mod", "role")
  )

  // Autorole
  .add("autorole", folder => folder
    .add("enabled", "boolean", {default: false})
    .add("role", "role")
  )

  // Welcome & Leave
  .add("greet", folder => folder
    .add("welcome", welcome => welcome
      .add("enabled", "boolean", {default: false})
      .add("message", "string")
      .add("channel", "textchannel")
    )
    .add("leave", leave => leave
      .add("enabled", "boolean", {default: false})
      .add("message", "string")
      .add("channel", "textchannel")
    )
  )

  // Music
  .add("music", folder => folder
    .add("djOnly", "boolean", {default: false})
    .add("dj", "role")
  )
