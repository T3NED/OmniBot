const config = require('./config.json');

module.exports = {
	discord_token: process.env.DISCORD_TOKEN ? process.env.DISCORD_TOKEN : config.bot,
	owners: process.env.owners ? process.env.owners.split(',') : ['355442869353578517'],
	prefix: process.env.prefix ? process.env.prefix : '.',
	presence: {
		name: process.env.name ? process.env.name : 'in Developement',
		type: process.env.type ? process.env.type : 'PLAYING',
		status: process.env.status ? process.env.status : 'idle',
	},

	// Channels
	channels: {
		support: '',
	},

	// Database
	database: {
		user: process.env.DATABASE_USER ? process.env.DATABASE_USER : config.user,
		password: process.env.DATABASE_PASSWORD ? process.env.DATABASE_PASSWORD : config.password,
		host: process.env.DATABASE_HOST ? process.env.DATABASE_HOST : config.host,
		port: process.env.DATABASE_PORT ? process.env.DATABASE_PORT : config.port,
		db: process.env.DATABASE_DB_NAME ? process.env.DATABASE_DB_NAME : config.db,
	},
};
