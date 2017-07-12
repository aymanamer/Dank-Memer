const snekfetch = require('snekfetch')
exports.run = async function (client, msg, args, config) {

	const votes = await snekfetch.get('https://discordbots.org/api/bots/270904126974590976/votes?onlyids=1').set('Authorization', config.orgtoken)
	if (!votes.body.includes(msg.author.id))
		return msg.channel.send(`Hey, <@${msg.author.id}>! You have to go vote at https://discordbots.org/bot/270904126974590976 to see all these puppers!`)

	getDogPic(msg)

}

async function getDogPic (msg) {
	const data = await snekfetch.get('https://random.dog/woof.json')
	if (data.body.url.includes('.mp4'))
		return getDogPic(msg)


	msg.channel.send({
		files: [{
			attachment: data.body.url
		}]
	})
}