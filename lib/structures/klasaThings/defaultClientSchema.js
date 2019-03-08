const {KlasaClient} = require("klasa");
const config = require("../../../config.js");

module.exports = KlasaClient.defaultClientSchema

  // Commands Counter
  .add("counter", folder =>
    folder
    .add("total", "integer")
    .add("commands", "any", {array: true})
  )

  .add("presence", folder =>
    folder
      .add("activity", "string", {default: `${config.prefix}help`})
      .add("type", "string", {default: "PLAYING"})
      .add("status", "string", {default: "ONLINE"})
  );
