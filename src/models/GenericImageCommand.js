const { get } = require('snekfetch')
const { GenericCommand } = require('.')

class GenericImageCommand {
  constructor (commandProps, URLParseFN) {
    this.cmdProps = commandProps
    this.URLParseFN = URLParseFN || this.defaultURLParseFN
  }

  async run ({ Memer, msg, args, addCD }) {
    const datasrc = this.URLParseFN(msg, args)
    if (!datasrc) {
      return
    }

    const isLocalhost = !this.cmdProps.reqURL

    const data = await get(!isLocalhost
      ? this.cmdProps.reqURL.replace('$URL', datasrc)
      : `http://localhost/api/${this.cmdProps.triggers[0]}`)
      .set('Api-Key', Memer.config.imgenKey)
      .set('data-src', datasrc)

    if (data.status === 200 && (!isLocalhost || data.body.status === 200)) {
      const file = isLocalhost ? Buffer.from(data.body.file, 'utf8') : data.body
      await addCD()
      msg.channel.createMessage('', { file, name: `${this.cmdProps.triggers[0]}.${this.cmdProps.format || 'png'}` })
    } else {
      msg.channel.createMessage(`Error: ${data.text}`)
    }
  }

  defaultURLParseFN (msg, args) {
    let avatarurl = (msg.mentions[0] || msg.author).dynamicAvatarURL('png', 1024)
    if (['jpg', 'jpeg', 'gif', 'png', 'webp'].some(ext => args.join(' ').includes(ext))) {
      avatarurl = args.join(' ').replace(/gif|webp/g, 'png')
    }

    if (this.cmdProps.requiredArgs) {
      if (!args[0]) {
        msg.channel.createMessage(this.cmdProps.requiredArgs)
        return false
      }

      if (args.join(' ').length > this.cmdProps.textLimit) {
        msg.channel.createMessage(`Too long. You're ${args.join(' ').length - this.cmdProps.textLimit} characters over the limit!`)
        return false
      }

      if (!/^[\x00-\x7F]*$/.test(args.join(' '))) { // eslint-disable-line
        msg.channel.createMessage('Your argument contains invalid characters. Please try again.')
        return false
      }

      return JSON.stringify([`${avatarurl}`, `${args.join(' ')}`])
    } else if (this.props.doubleAvatar) {
      const authorurl = (msg.mentions[0]
        ? msg.author
        : msg.channel.guild.shard.client.user)
        .dynamicAvatarURL('png', 1024)
      return JSON.stringify([`${avatarurl}`, `${authorurl}`])
    }
    return avatarurl
  }

  get props () {
    return new GenericCommand(
      null,
      Object.assign({
        cooldown: 5000,
        perms: ['embedLinks', 'attachFiles']
      }, this.cmdProps)
    ).props
  }
}

module.exports = GenericImageCommand
