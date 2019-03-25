const {Client} = require("klasa");
const {TagsClient} = require("klasa-tags");
const OmniFetch = require("./OmniFetch");
const BrawlStars = require("brawlstars");
const config = require("../../config");

//Plugins
Client.use(TagsClient);
Client.use(require('klasa-functions').Client);

//klasaThings
const permissionLevels = require("../extensions/permissionLevels.js");
const defaultClientSchema = require("./schemas/defaultClientSchema.js");
const defaultGuildSchema = require("./schemas/defaultGuildSchema");
const defaultUserSchema = require("./schemas/defaultUserSchema");

class OmniClient extends Client {
  constructor(options) {
    super({
      ...options,
      permissionLevels,
      defaultClientSchema,
      defaultUserSchema,
      defaultGuildSchema
    });
    this.config = config;
    //OmniFetch
    this.fetch = new OmniFetch();
    //BrawlStars API
    this.brawl = new BrawlStars.Client({token: config.brawl_stars_api});
    //Commands Ran
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
  }
}

module.exports = OmniClient;
