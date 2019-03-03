const Client = require("klasa").Client;
const OmniFetch = require("./OmniFetch");
const BrawlStars = require("brawlstars");
const config = require("../../config");
const Discord = require("discord.js");

class OmniClient extends Client {
  constructor(options) {
    super({...options});
    this.config = config;
    //OmniFetch
    this.fetch = new OmniFetch();
    //BrawlStars API
    this.brawl = new BrawlStars.Client({token: config.brawl_stars_api});
    //Easy Embeds
    this.embed = new Discord.MessageEmbed();
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
