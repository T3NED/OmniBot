const {PermissionLevels} = require("klasa");

module.exports = new PermissionLevels()
  .add(0, () => true)

  .add(
    6,
    ({guild, member}) => guild && member.permissions.has("MANAGE_GUILD"),
    {fetch: true}
  )

  .add(7, ({guild, member}) => guild && member === guild.owner, {fetch: true})

  .add(
    9,
    ({author, client}) =>
      require("../../../../config").owners.includes(author.id),
    {break: true}
  )

  .add(10, ({author, client}) =>
    require("../../../../config").owners.includes(author.id)
  );
