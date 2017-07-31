const snekfetch = require('snekfetch')

exports.run = async function (client, msg, args, utils, config) {
let top
let meme
let bottom
	msg.channel.send('What would you like the top text to say?')
	const collector1 = msg.channel.createMessageCollector(m => msg.author.id === m.author.id, {
		time: 60000
	})


	const meme = await snekfetch
		.get(`https://ronreiter-meme-generator.p.mashape.com/meme?bottom=${bottom}&font=Impact&font_size=50&meme=${meme}&top=${top}`)
		.set('X-Mashape-Key', config.mashup)
	console.log(meme.body)
}