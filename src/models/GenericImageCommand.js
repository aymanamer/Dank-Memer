class GenericImageCommand {
  constructor (commandName, URLParseFN, commandProps) {
    this.commandName = commandName
    this.URLParseFN = URLParseFN || this.defaultURLParseFN
    this.commandProps = commandProps
  }

  async run (Memer, msg, args) {
    const datasrc = this.URLParseFN(msg, args)
    if (!datasrc) {
      return
    }

    const data = await Memer._snek
      .get(`http://localhost/api/${this.commandName}`)
      .set('Api-Key', Memer.config.imgenKey)
      .set('data-src', datasrc)

    if (data.status === 200) {
      msg.channel.createMessage('', { file: data.body, name: `${this.commandName}.${this.commandProps.format || 'png'}` })
    } else {
      msg.channel.createMessage(`Error: ${data.text}`)
    }
  }

  get props () {
    return {
      name: this.commandName,
      usage: this.commandProps.usage || '{command} @user',
      aliases: this.commandProps.aliases || [],
      cooldown: 3000,
      description: this.commandProps.description,
      perms: ['attachFiles']
    }
  }

  get defaultURLParseFN () {
    return (msg, args) => {
      let avatarurl = (msg.mentions[0] || msg.author).dynamicAvatarURL('png')
      if (['jpg', 'jpeg', 'gif', 'png', 'webp'].some(ext => args.join(' ').includes(ext))) {
        avatarurl = args.join(' ').replace(/gif|webp/g, 'png')
      }
      return avatarurl
    }
  }
}

module.exports = GenericImageCommand
