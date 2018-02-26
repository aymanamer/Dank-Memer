const config = require('./config.json')
const { Master: Sharder } = require('eris-sharder')
const { post } = require('snekfetch')
const r = require('rethinkdbdash')()

const master = new Sharder(config.token, '/mainClass.js', {
  stats: true,
  name: 'memes',
  webhooks: config.webhooks,
  clientOptions: {
    disableEvents: {
      CHANNEL_PINS_UPDATE: true,
      USER_SETTINGS_UPDATE: true,
      USER_NOTE_UPDATE: true,
      RELATIONSHIP_ADD: true,
      RELATIONSHIP_REMOVE: true,
      GUILD_BAN_ADD: true,
      GUILD_BAN_REMOVE: true,
      TYPING_START: true
    },
    disableEveryone: true,
    messageLimit: 0
  },
  shards: config.shardCount || 1
})

master.on('stats', res => {
  r.table('stats')
    .insert({ id: 1, stats: res }, { conflict: 'update' })
    .run()
})

if (require('cluster').isMaster && !config.dev) {
  setInterval(async () => {
    const { stats: { guilds } } = await r.table('stats')
      .get(1)
      .run()

    for (const botlist of config.botlists) {
      post(botlist.url)
        .set('Authorization', botlist.token)
        .send({
          [`server${botlist.url.includes('carbonitex') ? '' : '_'}count`]: guilds, // matt plz
          key: botlist.token
        })
        .end()
    }
  }, 5 * 60 * 1000)
}
