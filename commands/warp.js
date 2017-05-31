const Jimp = require('jimp')
const GIFEncoder = require('gifencoder')
const im = require('gm').subClass({
	imageMagick: true
});

exports.run = async function (client, msg, args) {

	msg.channel.startTyping()

	let avatarurl = msg.mentions.users.size > 0 ? msg.mentions.users.first().displayAvatarURL.replace("gif", "png") : msg.author.displayAvatarURL.replace("gif", "png");
	let avatar = await Jimp.read(avatarurl);

	const filters = [{
		apply: getRandomInt(0, 1) == 1 ? 'desaturate' : 'saturate',
		params: [getRandomInt(20, 80)]
		},
		{
		apply: 'spin',
		params: [getRandomInt(10, 200)]
	}];

	//avatar.color(filters);

	let bgImg = im(await getBufferIM(avatar))

	let horizRoll = getRandomInt(0, avatar.bitmap.width),
		vertiRoll = getRandomInt(0, avatar.bitmap.height)

	bgImg.out('-implode').out(`-${getRandomInt(3, 15)}`);
	bgImg.out('-roll').out(`+${horizRoll}+${vertiRoll}`);
	bgImg.out('-swirl').out(`${getRandomInt(0, 1) == 1 ? '+' : '-'}${getRandomInt(120, 180)}`);

	bgImg.toBuffer("PNG", (err, buf) => {
		console.log(err)
		msg.channel.sendFile(buf, 'magik.png').then(() => {
			msg.channel.stopTyping(true)
		})
	})

}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getBufferIM(img) {
	return new Promise((resolve, reject) => {
		img.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
			if (err){
				msg.reply('there was an error')
				return reject(err)
			} 
			resolve(buffer);
		})
	})
}
