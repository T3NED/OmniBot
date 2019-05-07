const { Client } = require("klasa");
const OmniFetch = require("./OmniFetch");
const BrawlStars = require("brawlstars");
const config = require("../../config");
const icons = require("../extensions/Icons");

//Plugins
Client.use(require("klasa-member-gateway"));

//klasaThings
const permissionLevels = require("../extensions/permissionLevels.js");
const defaultClientSchema = require("./schemas/defaultClientSchema.js");
const defaultGuildSchema = require("./schemas/defaultGuildSchema");
const defaultUserSchema = require("./schemas/defaultUserSchema");
const defaultMemberSchema = require("./schemas/defaultMemberSchema");

class OmniClient extends Client {
  constructor(options) {

    super({
      ...options,
      permissionLevels,
      defaultClientSchema,
      defaultUserSchema,
      defaultGuildSchema,
      defaultMemberSchema
    });

    this.config = config;
    this.fetch = new OmniFetch();
    this.brawl = new BrawlStars.Client({token: config.brawl_stars_api_token});
    this.music = new Map();
    this.health = Object.seal({
      commands: {
        temp: {
          count: 0,
          ran: {}
        },
        cmdCount: new Array(60).fill({
          count: 0,
          ran: {}
        })
      }
    });
    this.icons = icons;
  }
}

module.exports = OmniClient;
