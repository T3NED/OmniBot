const {KlasaClient} = require("klasa");

module.exports = KlasaClient.defaultClientSchema.add("counter", folder =>
  folder.add("total", "integer").add("commands", "any", {array: true})
);
