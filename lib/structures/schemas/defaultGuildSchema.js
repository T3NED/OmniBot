const {KlasaClient} = require("klasa");
const config = require("../../../config.json");

module.exports = KlasaClient.defaultGuildSchema
  
  // Logging
  .add("log", folder => folder
    .add("channel", "textchannel")
    .add("enabled", "boolean", {default: false})

    // Options
    .add("kick", "boolean", {default: true})
    .add("ban", "boolean", {default: true})
    .add("roles", "boolean", {default: true})
    .add("message", "boolean", {default: true})
    .add("mute", "boolean", {default: true})
  )

  // Automod
  .add("automod", folder => folder
    .add("enabled", "boolean", {default: false})
    .add("filter", filter => filter
      .add("spam", "boolean", {default: true})
      .add("massemoji", "boolean", {default: true})
      .add("dehoist", "boolean", {default: false})
      .add("invite", "boolean", {default: false})
      .add("links", "boolean", {default: false})
    )
  )

  // Roles
  .add("roles", folder => folder
    .add("mod", "role")
  )

  // Autorole
  .add("autorole", folder => folder
    .add("enabled", "boolean", {default: false})
    .add("role_user", "role")
    .add("role_bot", "role")
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
  );
