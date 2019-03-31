const {
    MessageEmbed
} = require('discord.js');

/**
 * @description Generate easy Embeds
 * @param {Object} data - The data For Generating Embed
 * @param {string} [data.description] - The description For Embed
 * @param {string} [data.title] - The Title Of Embed
 * @param {Array<string>} [data.authors] - The Author & pfp For Embed
 * @param {string} [data.thumbnail] - The Thumbnail for the Embed
 * @param {string} [data.image] - The Image for the Embed
 * @param {string} [data.color] - The color of Embed
 * @param {Object} [data.fields] - The Fields Of Embed
 * @returns {MessageEmbed} - The generated Embed
 * @example
 *  generateEmbed(description: "Yo", fields: {[name: "Yo", description: "Yolo"]})
 */
exports.generateEmbed = data => {
    let embed = new MessageEmbed();
    data.description ? embed.setDescription(data.description) : null;
    data.title ? embed.setTitle(data.title) : null;
    data.authors ? embed.setAuthor(data.authors.username, data.authors.image) : null;
    data.footer ? embed.setFooter(data.footer) : null;
    data.color ? embed.setColor(data.color) : null;
    data.thumbnail ? embed.setThumbnail(data.thumbnail) : null;
    data.image ? embed.setImage(data.image) : null;
    if (data.fields && data.fields.length > 0 && data.fields.length < 24) {
        data.fields.map(f => embed.addField(f.name, f.description))
    };

    return embed;
}
