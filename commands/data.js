exports.run = async function (client, msg, args, utils) {
	try {
		await msg.channel.send({
			embed: {
				color: utils.colors.green,
				title: 'mmmMMmmm data',
				description: 'Here is some data about Dank Memer and Melmsie\'s other bots\n\n' +
				'[**Overview**](https://p.datadoghq.com/sb/a5f739cb1-674e78f961) - *Overview of four main bots*\n' +
				'[**Dank Memer**](https://p.datadoghq.com/sb/a5f739cb1-659e95e5be) - *Detailed data on Dank Memer*\n' +
				'[**Smaller Bots**](https://p.datadoghq.com/sb/a5f739cb1-dfb019f51a) - *Detailed info on the smaller bots*\n' +
				'[**Dedicated Server**](https://p.datadoghq.com/sb/a5f739cb1-be035ac193) - *Detailed info on the server all the bots run on.*'
			}
		})
	} catch (e) {
		console.log(`${e.message}`)
	}
}
