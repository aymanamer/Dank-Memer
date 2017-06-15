const snekfetch = require('snekfetch');

exports.run = async function (undefined, msg) {
	const res = await snekfetch.get('https://www.reddit.com/u/kerdaloo/m/dankmemer/top/.json?sort=top&t=day&limit=500') // 1k later on?
	const post = res.body.data.children
		.filter(post => post.data.preview)[Math.floor(Math.random() * res.body.data.children.length)] // :v

	msg.channel.send({ embed: {
		title: post.data.title,
		url: post.data.url,
		image: { url: post.data.preview.images[0].source.url },
		description: post.data.url,
		footer: { text: `posted by ${post.data.author}` }
	}})
}
