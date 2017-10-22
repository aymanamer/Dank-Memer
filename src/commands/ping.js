exports.run = function (Memer, msg, args) {
  let ping

  if (args[0] === '--trump') {
    ping = `${msg.channel.guild.shard.latency * Math.floor(Math.random() * 100) + 5}ms which is the BIGLIEST PING SEEN IN AMERICAN HISTORY, **PERIOD**.`
  } else {
    ping = `${msg.channel.guild.shard.latency}ms`
  }
  msg.channel.createMessage(ping)
}

exports.props = {
  name: 'ping',
  usage: '{command}',
  aliases: ['pong'],
  cooldown: 1000,
  description: 'hi, this is not ping-pong',
  perms: ['embedLinks']
}
