const D = require('discord.js')
const token = require('./config.json').token

const shard = new D.ShardingManager('./memedaddy.js', {
	token: token,
	totalShards: 'auto',
	respawn: false
})


shard.on('launch', shard => {
	console.log(`Launching shard ${shard.id + 1}/${shard.manager.totalShards}`)
})

shard.spawn()