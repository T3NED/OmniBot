module.exports = {
  discord_token: process.env.DISCORD_TOKEN || "",
  brawl_stars_api_token: process.env.BRAWL_STARS_API || "",
  owners: process.env.owners ? process.env.owners.split(",") : [""],

  //mongodb
  user: "",
  password: "",
  host: "",
  port: 59253,
  db: ""
};
