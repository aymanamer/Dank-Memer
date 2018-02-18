Array.prototype.clean = function (deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {
      this.splice(i, 1)
      i--
    }
  }
  return this
}

exports.handleMeDaddy = async function (Memer, msg, gConfig) {
  let command = msg.cleanContent.toLowerCase().slice(gConfig.prefix.length + 1).split(/\s+/g).clean('')[0]
  const args = msg.cleanContent.split(/\s+/g).slice(2)
  if (Memer.cmds.has(command)) {
    command = Memer.cmds.get(command)
  } else if (Memer.aliases.has(command)) {
    command = Memer.cmds.get(Memer.aliases.get(command))
  } else if (Memer.tags.has(command)) {
    const tag = Memer.tags.get(command)
    if (args[0] === 'info') {
      await msg.channel.createMessage({ embed: {
        color: Memer.colors.lightblue,
        thumbnail: { url: tag.img },
        description: tag.info,
        footer: { text: 'brought to you by knowyourmeme.com' }
      }})
    } else {
      const res = await Memer._snek.get(tag.img)
      await msg.channel.createMessage('', { file: res.body, name: command + tag.img.slice(-4) })
    }
    return
  }

  if (!command.run || gConfig.disabledCommands.includes(command.props.name)) {
    return
  }

  const cooldown = await Memer.db.getCooldown(command.props.name, msg.author.id)
  if (cooldown > Date.now()) {
    const waitTime = (cooldown - Date.now()) / 1000
    return msg.channel.createMessage(`u got 2 wait ${waitTime > 60 ? Memer.parseTime(waitTime) : `${waitTime.toFixed()} secunds`}!!!1!`)
  }
  await Memer.db.addCooldown(command.props.name, msg.author.id)

  try {
    const permissions = msg.channel.permissionsOf(Memer.bot.user.id)
    if ((command.props.perms && command.props.perms.some(perm => !permissions.has(perm))) || !permissions.has('sendMessages')) {
      let neededPerms = command.props.perms.filter(p => !permissions.has(p))
      if (!permissions.has('sendMessages')) {
        neededPerms.push('sendMessages')
        msg.author.getDMChannel().then(c => c.createMessage(`${msg.author.mention}, this server needs to give me me the following perms so I can do that command: \n\n${neededPerms.join('\n')}`))
      } else {
        msg.channel.createMessage(`\`\`\`heck! I don't have the right permissions to execute this command. Please ask your administrators to add these perms for me: \n\n${neededPerms.join('\n')}\`\`\``)
      }
      return
    }
    msg.reply = (str) => { msg.channel.createMessage(`${msg.author.mention}, ${str}`) }
    await command.run(Memer, msg, args)
  } catch (e) {
    msg.channel.createMessage(`Something went wrong while executing this hecking command: \`${e.message}\` \nPlease join here (https://discord.gg/ebUqc7F) if the issue persists.`) // meme-ier format?
    return Memer.log(`Command error:\n\tCommand: ${command.props.name}\n\tSupplied arguments: ${args.join(', ')}\n\tError: ${e.stack}`, 'error')
  }
}
