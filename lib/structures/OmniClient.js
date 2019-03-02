const Client = require("klasa").Client;
const OmniFetch = require("./OmniFetch");
const BrawlStars = require("brawlstars");
const config = require("../../config");

class OmniClient extends Client {
  constructor(options){
    super({...options});
    this.config = config;
    //OmniFetch
    this.fetch = new OmniFetch();
    //BrawlStars API
    this.brawl = new BrawlStars.Client({token: config.brawl_stars_api});
  }
}
