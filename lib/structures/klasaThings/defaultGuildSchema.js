const {KlasaClient} = require("klasa");

module.exports = KlasaClient.defaultGuildSchema

<<<<<<< HEAD
  /*
Logs
 */
  .add("loggingChannel", "textchannel");
=======
// Configuration
.add("configuration", folder => 
    folder
    .add("prefix", "string", {default: "."})
    .add("autorole", "role")
    .add("w-channel", "textchannel")
    .add("l-channel", "textchannel")
    .add("w-message", "string")
    .add("l-message", "string")
    .add("logs", "textchannel")
    .add("mod", "role")
    .add("dj", "role")
)
>>>>>>> 0c2ca7082a441f70b16eb0b2a1f968c7ba2585a6
