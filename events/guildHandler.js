exports.create = async(Memer, guild) => {
	//postStats(Memer)

	const embed = {
		color: Memer.utils.colors.lightblue,
		title: 'Hello!',
		description: Memer.utils.intro
	}

	guild.defaultChannel.createMessage({ embed })
		.catch(err => {
			console.log(`Failed to send welcome message to ${guild.name}\n${err.message}`)
			guild.owner.send({ embed: embed })
				.catch(err => console.log(`${err.stack}: The god damn guild owner couldn\'t get the message either`))
		})

	//const str = `<:guildJoin:339203745571405825> Joined Guild: ${guild.name} | \`${guild.id}\` | Users: \`${guild.members.filter(m => !m.user.bot).size}\` - Bots: \`${guild.members.filter(m => m.user.bot).size}\` | ${new Date().toLocaleString()}`.replace(/'|"/g, '')

	Memer.client.guilds.get('281482896265707520').channels.get('338913214513283072').createMessage('henlo')


	//client.shard.broadcastEval(`this.channels.has('338913214513283072') && this.channels.get('338913214513283072').send('${str}')`)
		.catch(err => console.log(`GUILDHANDLER.CREATE ERR: ${err.stack}`))
}

exports.delete = async (Memer, guild) => {
	const str = `<:guildLeave:339203746536095744> Removed Guild: ${guild.name} | \`${guild.id}\` | Users: \`${guild.members.filter(m => !m.user.bot).size}\` - Bots: \`${guild.members.filter(m => m.user.bot).size}\` | ${new Date().toLocaleString()}`.replace(/'|"/g, '')

	Memer.client.guilds.get('281482896265707520').channels.get('338913214513283072').createMessage('henlo')

	// postStats(Memer)
}

async function postStats (Memer) {
	const botlists = [
		['https://bots.discord.pw/api/bots/270904126974590976/stats', Memer.config.pwtoken],
		['https://discordbots.org/api/bots/270904126974590976/stats', Memer.config.orgtoken],
		['https://www.carbonitex.net/discord/data/botdata.php', Memer.config.carbon]
	]

	for (const i in botlists) {
		await Memer.snekfetch
			.post(botlists[i][0])
			.set('Authorization', botlists[i][1])
			.send({ 'server_count': Memer.client.guilds.size })
			.end()
	}
}