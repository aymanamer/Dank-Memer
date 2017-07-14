const Dickpunch = require('discord.js')
const GetYourOwnToken = require('./config.json').token
const snekfetch = require('snekfetch')
const config = require('./config.json')
const dogapi = require('dogapi')
const options = {
	api_key: '8827dd750efb8cec8a656985e4974413',
	app_key: 'f8d6a3ac647bc9a6caece15a9aadef20aa08f1f4',
}
dogapi.initialize(options)
const votes = snekfetch.get('https://discordbots.org/api/bots/270904126974590976/votes?onlyids=1').set('Authorization', config.orgtoken)
var now = parseInt(new Date().getTime() / 1000)


setInterval(function () {
	dogapi.metric.send('updoots', [[now, votes.length]])
}, 30000)


const shard = new Dickpunch.ShardingManager('./memedaddy.js', { token: GetYourOwnToken })

shard.spawn(15)

shard.on('launch', shard => {
	console.log(`Shard ${shard.id} is alive`)
})
