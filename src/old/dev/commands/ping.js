module.exports = {
  help: 'ping [--trump]',
  fn: async ({ msg, args }) => args[0] === '--trump'
    ? `${msg.channel.guild.shard.latency * Math.floor(Math.random() * 100) + 5}ms which is the BIGLIEST PING SEEN IN AMERICAN HISTORY, **PERIOD**.`
    : `${msg.channel.guild.shard.latency}ms`
}
