const Jimp = require("jimp")
const GIFEncoder = require("gifencoder")
const assetsPath = "./assets/"

const frameCount = 8

exports.run = async function (client, msg, args) {
	msg.channel.startTyping()

	let frames = []

	let avatarurl = msg.mentions.users.size > 0 ? msg.mentions.users.first().displayAvatarURL.replace("gif", "png") : msg.author.displayAvatarURL.replace("gif", "png")

	let avatar = await Jimp.read(avatarurl)
	avatar.resize(256,256)

	let triggered = await Jimp.read("./assets/salt.png")
	triggered.resize(280, 280)
	triggered.rotate(120)

	let buffers = []
	let encoder = new GIFEncoder(256, 256)
	let stream = encoder.createReadStream()

	stream.on('data', function (buffer) {
		buffers.push(buffer)
	});

	stream.on('end', function () {
		let buffer = Buffer.concat(buffers)
		msg.channel.sendFile(buffer, "salty.gif").then(()=>{
			msg.channel.stopTyping(true)
			
		})
	})
	msg.author['cooldown'] = Date.now()

	let base = new Jimp(256, 256)

	let temp, x, y

	for (let i = 0; i < frameCount; i++) {
		temp = base.clone()
		if (i == 0) {
			x = -160
			y = -160
		} else {
			x = -170 + (getRandomInt(-5, 5))
			y = -170 + (getRandomInt(-5, 5))
		}
		temp.composite(avatar, 0, 0)
		temp.composite(triggered, x, y)
		if (i == 0) {
			x = -10
			y = 20
		} else {
			x = -12 + (getRandomInt(-8, 8))
			y = 20 + (getRandomInt(-0, 12))
		}

		frames.push(temp.bitmap.data)

	}

	encoder.start()
	encoder.setRepeat(0)
	encoder.setDelay(20)
	for (let frame of frames) encoder.addFrame(frame)
	encoder.finish()
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
