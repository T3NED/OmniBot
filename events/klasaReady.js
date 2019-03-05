const {Event} = require("klasa");

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      enabled: true,
      once: false
    });
  }

  run(...params) {
    const settings = this.client.settings.presence;
    this.client.user.setPresence({
      activity: {name: settings.activity, type: settings.type},
      status: settings.status
    });
  }

  async init() {}
};
