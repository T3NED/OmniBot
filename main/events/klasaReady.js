const {Event} = require("klasa");
const { presence } = require("../config.js");

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      enabled: true,
      once: false
    });
  }

  run(...params) {
    const settings = presence;
    this.client.user.setPresence({
      activity: {name: settings.name, type: settings.type},
      status: settings.status
    });
  }

  async init() {}
};
