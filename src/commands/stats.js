const cpuStat = require('cpu-stat')
const os = require('os')

exports.run = async function (Memer, msg) {
  const stats = await Memer.db.getStats()
  cpuStat.usagePercent(function(err, percent) {
    if (err) {
      return console.log(err);
    }
  msg.channel.createMessage({ embed: {
    color: '5881576',
    fields: [
      {
        name: 'Server Statistics', value: 
          `${stats.guilds} servers\n`+
          `${(stats.users/stats.guilds).toFixed()} average server size\n`+
          `${stats.largeGuilds} large servers\n`+
          `${stats.exclusiveGuilds} exclusive servers\n`+
          `${150000 - stats.guilds} until 150k`

        , inline: true
      },
      {
        name: 'Various Statistics', value: 
          `${Memer.parseTime(process.uptime())} uptime\n`+
          `${stats.users} users\n`+
          `${msg.channel.guild.shard.latency.toFixed(2)} shard latency\n`+
          `v${Memer.package.version}\n`+
          `${Memer.cmds.size} commands currently`
          

        , inline: true
      },
      {
        name: 'System Statistics', value: 
          `${percent.toFixed(1)}% CPU usage\n`+
          `${(stats.totalRam/1000).toFixed(1)}gb/${(os.totalmem() / 1073741824).toFixed(1)}gb memory\n`+
          `${Memer.parseTime(os.uptime())} uptime\n`+
          `${os.platform} based server\n` +
          `Node ${process.version}`
        , inline: true
      }
    ]
  }})
})
}

exports.props = {
  name: 'stats',
  usage: '{command}',
  aliases: ['info'],
  cooldown: 1000,
  description: 'Returns information and statistics about Dank Memer.',
  perms: ['embedLinks']
}
