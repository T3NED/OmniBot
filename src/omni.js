const OmniClient = require("./utils/structures/OmniClient");
const config = require("./config");

new OmniClient({
  fetchAllMembers: false,
  prefix: config.prefix,
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