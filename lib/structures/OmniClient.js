const Client = require("klasa").Client;
const OmniFetch = require("./OmniFetch");
const BrawlStars = require("brawlstars");
const config = require("../../config");
const Discord = require("discord.js");

//Plugins
Client.use(require("klasa-tags").Client);

//klasaThings
const permissionLevels = require("./klasaThings/permissionLevels.js");
const defaultClientSchema = require("./klasaThings/defaultClientSchema.js");
const defaultGuildSchema = require("./klasaThings/defaultGuildSchema");
const defaultUserSchema = require("./klasaThings/defaultUserSchema");

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
