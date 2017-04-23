exports.run = function (client, msg, args, config, Discord, prefixdb) {
  if (msg.author.id === config.owner) {
    if (isNaN(args.join(' '))) {
      let guildName = client.guilds.find("name", args.join(" "))
      guildName.fetchMembers()
        .then(x => {
          let c = (x.members.filter(guildMember => guildMember.user.bot).array().length)
          let d = x.memberCount - c
          let percentage = Math.round((c / x.memberCount) * 100)
          try {
            const embed = new Discord.RichEmbed()
              .setColor('#7d5bbe')
              .setTitle(guildName.name)
              .setDescription("(" + guildName.id + ")")
              .setFooter('Joined at ' + guildName.joinedAt)
              .addField('Owner:', `${guildName.owner.user.username + "#" + guildName.owner.user.discriminator} (${guildName.owner.user.id})`)
              .addField('Humans', d, true)
              .addField('Bots', c, true)
              .addField('Percentage', percentage, true)


            msg.channel.sendEmbed(embed, {
              disableEveryone: true
            })
          } catch (e) {
            console.log(e)
            msg.reply('hmm, couldn\'t find that guild.')
          }
        })
      try {
        client.guilds.find("name", args.join(' ')).defaultChannel.createInvite({
          maxAge: 60
        }).then(inv => msg.channel.sendMessage(inv.url ? inv.url : "discord.gg/" + inv.code))
      } catch (e) {
        console.log(e)
        msg.reply(' they don\'t allow me to generate invites ok?')
      }
    } else if (isNaN(args.join(' ')) === false) {

      let guildName = client.guilds.get(args.join(' '))

      guildName.fetchMembers()
        .then(x => {
          let c = (x.members.filter(guildMember => guildMember.user.bot).array().length)
          let d = x.memberCount - c
          let percentage = Math.round((c / x.memberCount) * 100)
          try {
            const embed = new Discord.RichEmbed()
              .setColor('#7d5bbe')
              .setTitle(guildName.name)
              .setDescription("(" + guildName.id + ")")
              .setFooter('Joined at ' + guildName.joinedAt)
              .addField('Owner:', `${guildName.owner.user.username + "#" + guildName.owner.user.discriminator} (${guildName.owner.user.id})`)
              .addField('Humans', d, true)
              .addField('Bots', c, true)
              .addField('Percentage', percentage, true)


            msg.channel.sendEmbed(embed, {
              disableEveryone: true
            })
          } catch (e) {
            console.log(e)
            msg.reply('hmm, couldn\'t find that guild.')
          }
        })
      try {
        client.guilds.get(args.join(' ')).defaultChannel.createInvite({
          maxAge: 60
        }).then(inv => msg.channel.sendMessage(inv.url ? inv.url : "discord.gg/" + inv.code))
      } catch (e) {
        console.log(e)
        msg.reply(' they don\'t allow me to generate invites :(')
      }
    } else {
      msg.reply('who am I spying on?')
    }


  } else {
    msg.reply(" only melmsie gets to spy on servers, sorry")
  }
}