const { Monitor } = require('klasa');

module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, {
            ignoreOthers: false,
        });
    }

    async run(msg) {
        if(!msg.guild || !msg.guild.settings.automod.enabled || !msg.content) return;
        if(msg.content.startsWith(msg.guild.settings.prefix) || this.mentionPrefix(msg)) return;
        
        
    }

    mentionPrefix({ content }) {
        const prefixMention = this.prefixMention.exec(content);
        return prefixMention ? { length: prefixMention[0].length, regex: this.prefixMention } : null;
    }

    init() {
        this.prefixMention = new RegExp(`^<@!?${this.client.user.id}>`);
    }

};
