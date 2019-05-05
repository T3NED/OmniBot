const { PermissionLevels } = require("klasa");

module.exports = new PermissionLevels()

  // Everyone
  .add(0, () => true)

  // DJ
  .add(2, ({ guild, member }) => guild && member && member.roles.has(guild.settings.music.dj), { fetch: true })

  // Kick/Ban perms or is a MOD
  .add(4, ({ guild, member }) => guild && member && member.roles.has(guild.settings.roles.mod) || (member.permissions.has("BAN_MEMBERS") && member.permissions.has("KICK_MEMBERS")), { fetch: true })

  // Member with Admin or Manage_Guild perms
  .add(6, ({ guild, member }) => guild && member && member.permissions.has("MANAGE_GUILD") || member.permissions.has("ADMINISTRATOR"), { fetch: true })


  // Guild Owners
  .add(8, ({ guild, member }) => guild && member === guild.owner, { fetch: true })

  // Bot Owners permission for using lower commands
  .add(9, ({ author, client }) => require("../../config").owners.includes(author.id), { break: true })

  // Bot Owners
  .add(10, ({ author, client }) => require("../../config").owners.includes(author.id));
