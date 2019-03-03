const {Client} = require("klasa");

new Client({
  fetchAllMembers: false,
  prefix: ".",
  commandEditing: true,
  typing: true,
  providers: {
    default: "mongodb"
  },
  readyMessage: client =>
    `Successfully initialized. Ready to serve ${client.guilds.size} guilds.`
}).login(require("./config").discord_token);
