const Client = require("klasa").Client;

class OmniClient extends Client {
  constructor(options){
    super({...options});
  }
}
