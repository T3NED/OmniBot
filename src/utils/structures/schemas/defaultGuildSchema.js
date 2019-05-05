const { KlasaClient } = require("klasa");

module.exports = KlasaClient.defaultGuildSchema
  
  // Logging
  .add("log", folder => folder
    .add("channel", "textchannel")
    .add("enabled", "boolean", {default: false})
    .add("case", "integer", {default: 0})

    // Options
    .add("kick", "boolean", {default: true})
    .add("ban", "boolean", {default: true})
    .add("message", "boolean", {default: true})
    .add("mute", "boolean", {default: true})
    .add("warn", "boolean", {default: true})
  )

  // Automod
  .add("automod", folder => folder
    .add("enabled", "boolean", {default: false})
    .add("filter", filter => filter
      .add("spam", "boolean", {default: false})
      .add("words", "boolean", {default: false})
      .add("invite", "boolean", {default: false})
    )
  )

  // Roles
  .add("roles", folder => folder
    .add("mod", "role")
    .add("muted", "role")
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
