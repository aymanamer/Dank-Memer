const config = require('../config.json')
const cooldowns = require('../cmdConfig.json').cooldowns
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
	addCooldown: async function addCooldown (command, ownerID) {
		if (!cooldowns[command]) { return }
		const profile = await this.getCooldowns(ownerID)
		if (!profile) {
			return await this.createCooldowns(command, ownerID)
		}
		if (profile.cooldowns.some(cmd => cmd[command])) {
			profile.cooldowns.forEach(cmd => {
				if (cmd[command]) {
					cmd[command] = Date.now() + cooldowns[command]
				}
			})
		} else {
			profile.cooldowns.push({ [command]: Date.now() + cooldowns[command] })
		}
		return await r.table('cooldowns')
			.insert({ id: ownerID, cooldowns: profile.cooldowns }, { conflict: 'update' })
	},
	createCooldowns: async function createCooldowns (command, ownerID) {
		return await r.table('cooldowns')
			.insert({ id: ownerID, cooldowns: [{ [command]: Date.now() + cooldowns[command] }] })
	},
	getCooldowns: async function getCooldown (ownerID) {
		return await r.table('cooldowns')
			.get(ownerID)
			.run()
	},
	getCooldown: async function getCooldown (command, ownerID) {
		const profile = await r.table('cooldowns').get(ownerID).run()
		const cooldowns = profile.cooldowns.find(item => item[command])
		if (!cooldowns) { return 1 }
		return profile.cooldowns.find(item => item[command])[command]
	},
	getAllCooldowns: async function getAllCooldowns () {
		return await r.table('cooldowns').run()
	},
	getAllGuilds: async function getAllGuilds () {
		return await r.table('guilds')
			.run()
	}
})