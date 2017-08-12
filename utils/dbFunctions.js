const config = require('../config.json')
module.exports = r => ({
	createGuild: async function createGuild (guildID) {
		await r.table('guilds')
			.insert({
				id: guildID,
				prefix: config.defaultPrefix,
				disabledCommands: []
			})
			.run()
		return this.getGuild(guildID)
	},
	getGuild: async function getGuild (guildID) {
		return await r.table('guilds')
			.get(guildID)
			.run()
	},
	updateGuild: async function updateGuild (guildEntry) {
		return await r.table('guilds')
			.insert(guildEntry, { conflict: 'update' })
			.run()
	},
	deleteGuild: async function deleteGuild (guildID) {
		return await r.table('guilds')
			.get(guildID)
			.delete()
			.run()
	},
	getAllGuilds: async function deleteGuild () {
		return await r.table('guilds')
			.run()
	}
})