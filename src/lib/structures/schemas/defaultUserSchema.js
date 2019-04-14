const {KlasaClient} = require("klasa");

module.exports = KlasaClient.defaultUserSchema
  //AFK USer DB
  .add("afk", folder =>
    folder
      .add("afk", "boolean", {default: false, configurable: false})
      .add("reason", "string", {configurable: false})
  )

  .add("ign", folder => 
    folder
      .add("brawlstars", "string")
  );
