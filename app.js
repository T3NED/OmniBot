const OmniClient = require("./lib/structures/OmniClient");

new OmniClient({
  fetchAllMembers: false,
  prefix: ".",
  commandEditing: true,
  typing: true,
  pieceDefaults: {
    commands: {
      deletable: true,
      quotedStringSupport: true,
      bucket: 2
    }
  },
  providers: {
    default: "mongodb"
  },
  readyMessage: client =>
    `Successfully initialized. Ready to serve ${client.guilds.size} guilds.`
}).login(require("./config").discord_token);
