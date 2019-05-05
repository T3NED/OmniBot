const { KlasaClient } = require("klasa");

module.exports = KlasaClient.defaultMemberSchema

    .add("warns", "integer", { default: 0});
