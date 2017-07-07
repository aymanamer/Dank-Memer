const gm = require('gm');
const sf = require('snekfetch');

exports.run = (dataURL) => {
	return new Promise(async (resolve, reject) => {
		let data = await sf.get(dataURL).catch(err => { return reject(err.message) });
		if (data.status !== 200)
			return reject(data.status);
		gm(data.body)
		.implode(-3)
		.toBuffer('PNG', (err, buffer) => {
			if (err)	
				return reject(err);
			resolve(buffer);
		});
	})
}

