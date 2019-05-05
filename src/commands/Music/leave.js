const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text'],
            aliases: ['disconnect'],
            cooldown: 5,
            permissionLevel: 0,
            description: '',
            extendedHelp: 'No extended help available.',
        });
    }

    async run(msg) {
        if (!msg.guild.me.voice.channel) return msg.send("_I am not connected to a voice channel_");
        if (!msg.member.voice.channel) return msg.send("_You are not connected to a voice channel_");
        if (msg.member.voice.channelID !== msg.guild.me.voice.channelID) return msg.send("_You need to be in the same voice channel as me to use this command_");

        this.client.music.delete(msg.guild.id);
        let vc = msg.guild.me.voice.channel;
        if (vc) await vc.leave();
        msg.channel.send("_🛑Stopped all the music and disconnected from the voice channel_");
    }
};
