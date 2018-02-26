  // if (msg.mentions.find(m => m.id === this.bot.user.id) && msg.content.toLowerCase().includes('help')) {
  // }

  // const tag = Memer.tags.get(command)
  // if (args[0] === 'info') {
  //   await msg.channel.createMessage({ embed: {
  //     color: Memer.colors.lightblue,
  //     thumbnail: { url: tag.img },
  //     description: tag.info,
  //     footer: { text: 'brought to you by knowyourmeme.com' }
  //   }})
  // } else {
  //   const res = await Memer._snek.get(tag.img)
  //   await msg.channel.createMessage('', { file: res.body, name: command + tag.img.slice(-4) })
  // }

exports.handleMeDaddy = async function (msg) {
  if (
    !msg.channel.guild ||
    msg.author.bot ||
    await this.db.isBlocked(msg.author.id, msg.channel.guild.id)
  ) {
    return
  }

  const gConfig = await this.db.getGuild(msg.channel.guild.id) || {
    prefix: this.config.defaultPrefix,
    disabledCommands: []
  }

  const prefix = (() => {
    const { nick, username } = msg.channel.guild.members.get(this.bot.user.id)
    return this.mentionRX.test(msg.content)
      ? `@${nick || username}`.toLowerCase()
      : gConfig.prefix
  })()
  if (!msg.cleanContent.toLowerCase().startsWith(prefix)) {
    return
  }

  let [command, ...args] = msg.cleanContent.slice(prefix.length + 1).split(/\s+/g)
  command = command && (this.cmds.find(c => c.props.triggers.includes(command.toLowerCase())) || this.tags[command.toLowerCase()])

  if (
    !command &&
    msg.mentions.find(u => u.id === this.bot.user.id) &&
    msg.content.toLowerCase().includes('hello')
  ) {
    return msg.channel.createMessage(`Hello, ${msg.author.username}. My prefix is \`${gConfig.prefix}\`. Example: \`${gConfig.prefix} meme\``)
  } else if (
    !command ||
    (command.ownerOnly && !this.config.devs.includes(msg.author.id)) ||
    gConfig.disabledCommands.includes(command.props.name) ||
    (gConfig.disabledCommands.includes('nsfw') && command.props.isNSFW)
  ) {
    return
  }

  const cooldown = await this.db.getCooldown(command.props.triggers[0], msg.author.id)
  if (cooldown > Date.now()) {
    const waitTime = (cooldown - Date.now()) / 1000
    return msg.channel.createMessage(`u got 2 wait ${waitTime > 60 ? this.parseTime(waitTime) : `${waitTime.toFixed()} secunds`}!!!1!`)
  }
  const addCooldown = () => this.db.addCooldown(command.props.triggers[0], msg.author.id)

  try {
    const permissions = msg.channel.permissionsOf(this.bot.user.id)
    if (command.props.perms.some(perm => !permissions.has(perm))) {
      const neededPerms = command.props.perms.filter(perm => !permissions.has(perm))
      if (permissions.has('sendMessages')) {
        msg.channel.createMessage(`heck! I don't have the right permissions to execute this command. Please ask your administrators to add these perms for me:\`\`\`${neededPerms.join('\n')}\`\`\``)
      }
    } else if (command.props.isNSFW && !msg.channel.nsfw) {
      msg.channel.createMessage('Tryna get me banned? Use NSFW commands in a NSFW marked channel (look in channel settings, dummy)')
    } else {
      msg.reply = (str) => { msg.channel.createMessage(`${msg.author.mention}, ${str}`) }
      let res = await command.run({
        msg,
        args,
        Memer: this,
        addCD: addCooldown
      })
      if (!res) {
        return
      }
      if (res instanceof Object) {
        res.color = this.randomColor()
        res = { embed: res }
      }
      await msg.channel.createMessage(res)
    }
  } catch (e) {
    msg.channel.createMessage(`Something went wrong while executing this hecking command: \`${e.message}\` \nPlease join here (<https://discord.gg/ebUqc7F>) if the issue doesn't stop being an ass.`) // meme-ier format?
    this.log(`Command error:\n\tCommand: ${command.props.triggers[0]}\n\tSupplied arguments: ${args.join(' ')}\n\tError: ${e.stack}`, 'error')
  }
}
