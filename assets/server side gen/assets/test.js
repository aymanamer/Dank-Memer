const gm = require('gm').subClass({
	imageMagick: true
})
const sf = require('snekfetch')

exports.run = (dataURL) => {
	return new Promise(async (resolve, reject) => {
		let data = await sf.get(dataURL).catch(err => {
			return reject(err.message)
		})
		if (data.status !== 200)
			return reject(data.status)
		gm(data.body)
			.implode(-5)
			.displace(horizontal, vertical)
			.toBuffer('PNG', (err, buffer) => {
				if (err)
					return reject(err)
				resolve(buffer)
			});
	})
}

const dirs = ['NorthWest,', 'North', 'NorthEast', 'West', 'Center', 'East', 'SouthWest', 'South', 'SouthEast']
const randomDir = dirs[Math.floor(Math.random() * dirs.length)]