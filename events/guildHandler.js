exports.create = async (Memer, guild) => {
	postStats(Memer)

	const embed = {
		color: Memer.colors.lightblue,
		title: 'Hello!',
		description: Memer.intro
	}

	guild.defaultChannel.createMessage({ embed })
		.catch(async err => {
			Memer.log(`Failed to send welcome message to ${guild.name}\n${err.message}`, 'info')
		})

}

exports.delete = async (Memer, guild) => {
	Memer.db.deleteGuild(guild.id)
	postStats(Memer)
}

async function postStats (Memer) {
	const botlists = [
		['https://bots.discord.pw/api/bots/270904126974590976/stats', Memer.config.pwtoken],
		['https://discordbots.org/api/bots/270904126974590976/stats', Memer.config.orgtoken],
		['https://www.carbonitex.net/discord/data/botdata.php', Memer.config.carbon]
	]

	for (const i in botlists) {
		await Memer.snek
			.post(botlists[i][0])
			.set('Authorization', botlists[i][1])
			.send(botlists[i][0].includes('carbonitex') ? { 'servercount': Memer.client.guilds.size } : { 'server_count': Memer.client.guilds.size }) // matt plz
			.end()
	}
}