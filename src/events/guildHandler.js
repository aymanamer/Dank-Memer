exports.create = async (Memer, guild) => {
	postStats(Memer)

	const embed = {
		color: Memer.colors.lightblue,
		title: 'Hello!',
		description: Memer.intro
	}

	guild.channels.get(guild.channels.map(m => m.id)[0]).createMessage({ embed })
		.catch(async err => {
			Memer.log(`Failed to send welcome message to ${guild.name}\n${err.message}`, 'info')
		})

}

exports.delete = async (Memer, guild) => {
	Memer.db.deleteGuild(guild.id)
	postStats(Memer)
}


