const Dickpunch = require('discord.js')
const GetYourOwnToken = require('./config.json').token

const shard = new Dickpunch.ShardingManager('./memedaddy.js', { token: GetYourOwnToken })

shard.spawn(2)

shard.on('launch', shard => {
	console.log(`Shard ${shard.id} is alive`)
})
