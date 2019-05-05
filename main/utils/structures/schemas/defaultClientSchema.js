const { KlasaClient } = require("klasa");
const config = require("../../../config.js");

module.exports = KlasaClient.defaultClientSchema

  // Commands Counter
  .add("counter", folder =>
    folder.add("total", "integer").add("commands", "any", {array: true})
  );