const Jimp = require("jimp")
const GIFEncoder = require("gifencoder")

const frameCount = 8

exports.run = async function (client, msg, args) {
	msg.channel.startTyping()

	let frames = []

	let avatarurl = msg.mentions.users.size > 0 ? msg.mentions.users.first().displayAvatarURL.replace("gif", "png") : msg.author.displayAvatarURL.replace("gif", "png")

	let avatar = await Jimp.read(avatarurl)
	avatar.resize(320, 320)

	let triggered = await Jimp.read("./assets/triggered.jpg")
	triggered.resize(280, 60);

	let overlay = await Jimp.read("./assets/red.png")
	overlay.opacity(0.2)

	let buffers = []
	let encoder = new GIFEncoder(256, 256)
	let stream = encoder.createReadStream()

	stream.on('data', function (buffer) {
		buffers.push(buffer)

	});
	stream.on('end', () => {
		let buffer = Buffer.concat(buffers)
		msg.channel.sendFile(buffer, "test.gif").then(() => {
			msg.channel.stopTyping(true)
		})
	});

	let base = new Jimp(256, 256)

	let temp, x, y
	for (let i = 0; i < frameCount; i++) {
		temp = base.clone()
		if (i == 0) {
			x = -16
			y = -16
		} else {
			x = -32 + (getRandomInt(-16, 16))
			y = -32 + (getRandomInt(-16, 16))
		}
		temp.composite(avatar, x, y)
		if (i == 0) {
			x = -10
			y = 200
		} else {
			x = -12 + (getRandomInt(-8, 8))
			y = 200 + (getRandomInt(-0, 12))
		}
		temp.composite(triggered, x, y)
		temp.composite(overlay, 0, 0)
		frames.push(temp.bitmap.data)
	}
	encoder.start()
	encoder.setRepeat(0)
	encoder.setDelay(20)
	for (let frame of frames) encoder.addFrame(frame)
	encoder.finish()
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}
