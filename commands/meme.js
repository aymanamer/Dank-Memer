const snekfetch = require('snekfetch')
let color = [0x7d5bbe, 0xa3d3fe, 0x333333, 0x007acc, 0xf56154,  0xdc3522] 

exports.run = async function (undefined, msg) {
	const res = await snekfetch.get('https://www.reddit.com/u/kerdaloo/m/dankmemer/top/.json?sort=top&t=day&limit=350') // 1k later on?
	const post = res.body.data.children
		.filter(post => post.data.preview)[Math.floor(Math.random() * res.body.data.children.length)] // :v

	msg.channel.send({ embed: {
		title: post.data.title,
        color: color[Math.floor(Math.random() *color.length)],
		url: post.data.url,
		image: { url: post.data.preview.images[0].source.url },
		description: post.data.url,
		footer: { text: `posted by ${post.data.author}` }
	}})
}
