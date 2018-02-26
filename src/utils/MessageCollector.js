module.exports = class MessageCollector {
  constructor (bot) {
    this.collectors = {}

    bot.on('messageCreate', this.verify.bind(this))
  }

  async verify (msg) {
    const collector = this.collectors[msg.channel.id + msg.author.id]
    if (collector && collector.filter(msg)) {
      collector.resolve(msg)
    }
  }

  awaitMessage (channelID, userID, timeout, filter = () => true) {
    return new Promise(resolve => {
      if (this.collectors[channelID + userID]) {
        delete this.collectors[channelID + userID]
      }

      this.collectors[channelID + userID] = { resolve, filter }

      setTimeout(resolve.bind(null, false), timeout)
    })
  }
}
