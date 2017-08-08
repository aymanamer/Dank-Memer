const config = require('../config.json')
module.exports = r => ({
	createGuild: async (guildID) => {
		return await r.table('guilds')
			.insert({
				id: guildID,
				prefix: config.defaultPrefix,
				disabledCommands: []
			})
			.run()
	},
	getGuild: async (guildID) => {
		return await r.table('guilds')
			.get(guildID)
			.run()
	},
	updateGuild: async (guildEntry) => {
		return await this.r.table('guilds')
			.insert(guildEntry, { conflict: 'update' })
			.run()
	},
	deleteGuild: async (guildID) => {
		return await r.table('guilds')
			.get(guildID)
			.delete()
			.run()
	},
	getAllGuilds: async () => {
		return await r.table('guilds')
			.run()
	}
})