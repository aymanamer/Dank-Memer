const snakefetch = require('snekfetch')

exports.run = async function (client, msg) {
	msg.channel.startTyping()

	const avatarurl = (msg.mentions.users.size > 0 ? msg.mentions.users.first().displayAvatarURL : msg.author.displayAvatarURL).replace('gif', 'png')
	const authorurl = msg.mentions.users.size > 0 ? msg.author.displayAvatarURL.replace('gif', 'png') : client.user.displayAvatarURL.replace('gif', 'png')

	const data = await snakefetch
		.get('http://www.get-ur-me.me/api/spank')
		.set('Api-Key', 'XfGC62d9xKiOc4IegPdz')
		.set('data-src', JSON.stringify([`${avatarurl}`, `${authorurl}`]))

	if (data.status === 200) {
		const m = await msg.channel.send({ files: [{
			name: 'spank.png',
			attachment: data.body
		}] })
		client.shard.broadcastEval(`const { RichEmbed } = require('discord.js')\nthis.channels.has('329799125015199744') && this.channels.get('329799125015199744').send({ embed: new RichEmbed().setAuthor('${msg.author.tag}').setImage('${m.attachments.first().url}') .addField('Sent from:', '#${msg.channel.name} in ${msg.guild.name}').setColor('#00c853')})`)
	} else if (data.status === 400) {
		msg.channel.send(`Error: ${  data.text}`)
	}
	msg.channel.stopTyping()
}

