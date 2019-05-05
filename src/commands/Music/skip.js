const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text'],
            aliases: ['next'],
            cooldown: 5,
            permissionLevel: 0,
            description: '',
            extendedHelp: 'No extended help available.',
        });
    }

    async run(msg) {
        let fetched = this.client.music.get(msg.guild.id);
        if (!fetched) return msg.channel.send("_Nothing is playing in the server_");
        if (msg.member.voice.channelID !== msg.guild.me.voice.channelID) return msg.channel.send("_You need to be in the same voice channel as me to use this command_");

        let count = msg.member.voice.channel.members.size - 1;
        let reqVotes = Math.ceil(count/2);

        if (!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = [];
        if (fetched.queue[0].voteSkips.includes(msg.author.id)) return msg.channel.send(`_You have already voted! (${fetched.queue[0].voteSkips.length}/${count}) votes_`);
        fetched.queue[0].voteSkips.push(msg.author.id);

        this.client.music.set(msg.guild.id, fetched);

        if (fetched.queue[0].voteSkips.length >= reqVotes) {
            msg.channel.send("_⏭Skipped the current song_");
            return fetched.dispatcher.end();
        } else {
            return msg.channel.send(`_Successfully voted! (${fetched.queue[0].voteSkips.length}/${count}) votes._`);
        }
    }
};
