exports.run = async function (Memer, msg) {
  const stats = await Memer.db.getStats()
  await msg.channel.createMessage({ embed: {
    color: '5881576',
    fields: [
      {
        name: '-------------------------------------- Technical ---------------------------------------',
        value: '```\n' +
                                `Uptime          |   ${Memer.parseTime(process.uptime())}\n` +
                                `Heap Used       |   ${stats.totalRam.toFixed(2)}MB\n` +
                                `Ping            |   ${msg.channel.guild.shard.latency.toFixed()}ms\n` +
                                `Build           |   v${Memer.config.version}\n` +
                                '\n```'
      },
      {
        name: '--------------------------------------- Statistics --------------------------------------',
        value: '```\n' +
                                `Guilds          |   ${stats.guilds}\n` +
                                `Users           |   ${stats.users}\n` +
                                `Large Guilds    |   ${stats.largeGuilds}\n` +
                                `Exclusivity     |   ${stats.exclusiveGuilds}\n`+
                                '\n```'
      },
      {
        name: '-------------------------------------- Other Info --------------------------------------',
        value: '```\n' +
                                `Node Version    |   ${process.version}\n` +
                                `Dependencies    |   ${Object.keys(Memer.package.dependencies).length}\n` +
                                `Platform        |   ${process.platform}\n` +
                                '\n```'
      }
    ]
  }})
}

exports.props = {
  name: 'stats',
  usage: '{command}',
  aliases: ['info'],
  cooldown: 1000,
  description: 'blah',
  perms: ['embedLinks']
}
