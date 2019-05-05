const fetch = require('node-fetch');

class OmniFetch {
  constructor(options = {}){
    this.options = options;
  }

  async json(link) {
    const res = await fetch(link);
    return res.json();
  }

  async normal(link) {
    return fetch(link);
  }
}

module.exports = OmniFetch;