const Jimp = require('jimp')
const path = require('path')
const GIFEncoder = require('gifencoder')

exports.run = (URL) => {
	return new Promise(async(resolve, reject) => {
		const avatar = await Jimp.read(URL).catch(err => {
			reject(err)
		})
		avatar.resize(320, 320);

		let triggered = await Jimp.read(path.join(__dirname, '..', 'assets/horn.png'));
		triggered.resize(100, 100);
		triggered.rotate(315);
		let triggered2 = triggered.clone()
		triggered2.resize(130, 130);
		triggered2.rotate(350);
		triggered2.flip(true, false)
		let overlay = await Jimp.read(path.join(__dirname, '..', 'assets/red.png'));
		overlay.opacity(0.2);
		let hit = await Jimp.read(path.join(__dirname, '..', 'assets/hit.png'));
		hit.resize(40, 40)
		let gun = await Jimp.read(path.join(__dirname, '..', 'assets/gun.png'));
		gun.resize(250, Jimp.AUTO)
		let faze = await Jimp.read(path.join(__dirname, '..', 'assets/faze.png'));
		faze.resize(Jimp.AUTO, 40)

		let buffers = [];
		let encoder = new GIFEncoder(256, 256);
		let stream = encoder.createReadStream();

		stream.on('data', buffer => buffers.push(buffer));
		stream.on('end', () => resolve(Buffer.concat(buffers)));


		let base = new Jimp(256, 256);

		let temp, x, y;
		for (let i = 0; i < frameCount; i++) {
			temp = base.clone();
			if (i == 0) {
				x = -20;
				y = -20;
			} else {
				x = -25 + (getRandomInt(-2, 2));
				y = -25 + (getRandomInt(-2, 2));
			}
			temp.composite(avatar, x, y);
			temp.composite(overlay, 0, 0)
			if (i == 0) {
				x = 175;
				y = 0;
			} else {
				x = 165 + (getRandomInt(-8, 8));
				y = 0 + (getRandomInt(-0, 12));
			}
			temp.composite(triggered, x, y);
			if (i == 0) {
				x = -60;
				y = 0;
			} else {
				x = -50 + (getRandomInt(-6, 6));
				y = 0 + (getRandomInt(-2, 10));
			}
			temp.composite(triggered2, x, y);
			if (i == 0) {
				x = 90;
				y = 65;
			} else {
				x = 110 + (getRandomInt(-30, 30));
				y = 55 + (getRandomInt(-30, 30));
			}
			temp.composite(hit, x, y);
			if (i == 0) {
				x = 120;
				y = 130;
			} else {
				x = 110 + (getRandomInt(-6, 6));
				y = 135 + (getRandomInt(-2, 10));
			}
			temp.composite(gun, x, y)
			if (i == 0) {
				x = 5;
				y = 212;
			} else {
				x = 12 + (getRandomInt(-6, 6));
				y = 210 + (getRandomInt(-2, 10));
			}
			temp.composite(faze, x, y)
			frames.push(temp.bitmap.data);
		}
		encoder.start();
		encoder.setRepeat(0);
		encoder.setDelay(20);
		for (let frame of frames) encoder.addFrame(frame);
		encoder.finish();
	})
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};