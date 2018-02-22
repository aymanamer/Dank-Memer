const { exec } = require('child_process')
const util = require('util')

const table = require('table')
const tableConfig = {
  columns: {
    0: { width: 7 },
    1: { width: 6 },
    2: { width: 15 },
    3: { width: 15 }
  },
  border: {
    topBody: '─',
    topJoin: '┬',
    topLeft: '┌',
    topRight: '┐',
    bottomBody: '─',
    bottomJoin: '┴',
    bottomLeft: '└',
    bottomRight: '┘',
    bodyLeft: '│',
    bodyRight: '│',
    bodyJoin: '│',
    joinBody: '─',
    joinLeft: '├',
    joinRight: '┤',
    joinJoin: '┼'
  }
}

exports.run = async function (Memer, msg, args) {
  if (!Memer.config.devs.includes(msg.author.id)) {
    return
  }
  if (args[0] === 'help' || !args[0]) {
    return msg.channel.createMessage({ embed: {
      footer: { text: 'Now go fuck people up with these OP commands!' },
      color: 3569331,
      fields: [
        { name: 'reboot', value: 'reboot [shard, all]' },
        { name: 'eval', value: 'eval <args>' },
        { name: 'bash', value: 'bash <args>' },
        { name: 'git', value: 'git pull' },
        { name: 'donor', value: '[add, remove] [1, 5, 10] <id or @tag>' },
        { name: 'blacklist', value: '[add, remove] [guild, user, channel] <id or @tag>' }
      ]
    }})
  }

  const command = args.shift()

  if (!Memer.config.devs.includes(msg.author.id)) {
    return
  }

  if (command === 'info') {
    const tableData = [[[
      'Cluster',
      'Shards',
      'Memory Usage',
      'Uptime'
    ]], [], [], []]

    const totalData = (await Memer.db.getStats()).clusters
    const shardCount = totalData.length
    const section = shardCount / 4

    for (let i = 0; i <= shardCount - 1; i++) {
      const data = totalData[i]
      const target = i < section * 1 ? 0 : i < section * 2 ? 1 : i < section * 3 ? 2 : 3
      tableData[target].push([
        data.cluster,
        data.shards,
        `${parseFloat(data.ram).toFixed(2)}MB`,
        Memer.parseTime(data.uptime / 1000)
      ])
    }

    tableData[3].push(['Total',
      totalData.map(c => c.shards).reduce((a, b) => a + b, 0),
      `${parseFloat(totalData.map(c => c.ram).reduce((a, b) => a + b, 0) / 1024).toFixed(2)}GB`,
      ''
    ])

    tableData.forEach(data => {
      msg.channel.createMessage(Memer.codeblock(table.table(data, tableConfig), 'prolog'))
    })
  }

  if (command === 'reboot') {
    if (args[0] === 'cluster') {
      await msg.channel.createMessage('Rebooting this cluster...')
      return process.exit()
    } else if (args[0] == 'all') {
      await msg.channel.createMessage('All clusters rebooting...')
      return exec('pm2 restart memer', () => { msg.channel.createMessage('Huh?') })
    } else {
      await msg.channel.createMessage('Please specify a type of reboot, `cluster` or `all`')
      return
    }
  }

  if (command === 'reload') {
  	if (!args[0]) {
  		msg.channel.send(`Please specify a command to reload, or put 'all'.`)
  		return
  	} else {
  		const rCommand = args[0]
  		if (!(Memer.cmds.get(rCommand) == undefined)) {
  			try {
  				Memer.cmds.delete(rCommand)
  				delete require.cache[require.resolve(`./${rCommand}.js`)]
  				Memer.cmds.set(rCommand, require(`./${rCommand}.js`))
  				msg.channel.createMessage(`Reloaded ${rCommand}.`)
  			} catch (e) {
  				msg.channel.createMessage(`We had a hecking error: \n\`\`\`${e}\`\`\``)
  			}
  		} else {
  			msg.channel.createMessage(`${rCommand} is not a valid command.`)
  		}
  	}
  }

  if (command === 'ping') {
    let ping
    if (args[0] === '--trump') {
      ping = `${msg.channel.guild.shard.latency * Math.floor(Math.random() * 100) + 5}ms which is the BIGLIEST PING SEEN IN AMERICAN HISTORY, **PERIOD**.`
    } else {
      ping = `${msg.channel.guild.shard.latency}ms`
    }
    msg.channel.createMessage(ping)
  }

  if (command === 'eval') {
    const input = args.join(' ')
    let result
    let evalTime
    try {
      const before = Date.now()
      result = await eval(`(async()=>{${input}})();`) // eslint-disable-line
      evalTime = Date.now() - before
      if (typeof result !== 'string') {
        result = util.inspect(result, { depth: 1 })
      }
      const tokenRegex = new RegExp(Memer.config.token, 'gi')
      result = result.replace(tokenRegex, 'i think the fuck not, you trick ass bitch')
    } catch (err) {
      result = err.message
    }
    if (input.length + result.length > 994) {
      const res = await Memer._snek.post('https://hastebin.com/documents')
        .send(`${input}\n\n${result}`)
        .catch(err => msg.channel.createMessage(err.message))
      msg.channel.createMessage(`Eval exceeds 1000 characters. View here: https://hastebin.com/${res.body.key}`)
    } else {
      msg.channel.createMessage({ embed: {
        color: Memer.colors.lightblue,
        fields: [
          { name: 'Input', value: Memer.codeblock(input, 'js') },
          { name: 'Output', value: Memer.codeblock(result, 'js') }
        ],
        footer: { text: evalTime || evalTime === 0 ? `evaluated in ${evalTime}ms` : '' }
      }})
    }
    
  }

  if (command === 'bash') {
    msg.channel.createMessage(`**Input**\n${Memer.codeblock(args.join(' '), 'sh')}`)
    exec(args.join(' '), async (e, stdout, stderr) => {
      if (stdout.length + stderr.length > 994) {
        const res = await Memer._snek.post('https://hastebin.com/documents')
          .send(`${stdout}\n\n${stderr}`)
          .catch(err => msg.channel.createMessage(err.message))
        msg.channel.createMessage(`Console log exceeds 2000 characters. View here: https://hastebin.com/${res.body.key}`)
      } else {
        if (stdout) {
          msg.channel.createMessage(`**Output**\n${Memer.codeblock(stdout, 'bash')}`)
        }
        if (stderr) {
          msg.channel.createMessage(`**Errors**\n${Memer.codeblock(stdout, 'bash')}`)
        }
        if (!stderr && !stdout) {
          msg.react('\u2611')
        }
      }
    })
  }

  if (command === 'avi') {
    try {
      setAvatar(Memer, args[0])
      msg.channel.createMessage('k boss')
    } catch (err) {
      console.log(err.stack)
    }
  }

  if (command === 'speedtest') {
    msg.channel.createMessage(`**nice speed test bro, too bad ur internet sux**\n${Memer.codeblock('speed-test -j', 'sh')}`)
    exec('speed-test -j', async (e, stdout, stderr) => {
      if (stdout) {
        msg.channel.createMessage(`**heres ur speedtest bruv**\n${Memer.codeblock(stdout, 'bash')}`)
      }
      if (stderr) {
        msg.channel.createMessage(`**ur speedtest is bork brah**\n${Memer.codeblock(stdout, 'bash')}`)
      }
      if (!stderr && !stdout) {
        msg.react('\u2611')
      }
    })
  }

  if (command === 'git') {
    if (args[0] === 'pull') {
      await msg.channel.createMessage('Pulling out...')
      exec('git pull', (e, stderr, stdout) => {
        if (stdout || stderr) {
          msg.channel.createMessage(`**Output**\n${Memer.codeblock(`${stdout}\n\n${stderr}`, 'bash')}`)
        }
      })
    } else {
      msg.channel.createMessage('As of right now, only `git pull` is available.')
    }
  }

  const ids = msg.mentions[0] ? msg.mentions.map(u => u.id) : args.slice(2).filter(arg => parseInt(arg))

  if (command === 'donor') {
    if (!args[0] || !args[1] || !['add', 'remove'].includes(args[0]) || !['1', '5', '10'].includes(args[1])) {
      return msg.channel.createMessage('Argument error. The first argument must be one of `add` or `remove`, and the second must be one of `1`, `5` or `10`.')
    }

    if (args[0] === 'add') {
      ids.forEach(id => Memer.db.addDonator(id, parseInt(args[1])))
      msg.channel.createMessage(`Successfully added ${ids.join(', ')} to tier ${args[1]}.`)
    } else if (args[0] === 'remove') {
      if (!ids.some(async arg => await Memer.db.isDonator(arg, 1))) { // eslint-disable-line
        return msg.channel.createMessage(`\`${ids.some(async arg => await Memer.db.isDonator(arg, 1))}\` not found in donor database.`) // eslint-disable-line
      }
      ids.forEach(id => Memer.db.removeDonator(id, parseInt(args[1])))
      msg.channel.createMessage(`Successfully removed ${ids.join(', ')}.`)
    }
  }

  if (command === 'blacklist') {
    if (!args[0] || !args[1] || !args[2] ||
      !['add', 'remove'].includes(args[0].toLowerCase())) {
      return msg.channel.createMessage('Argument error. Make sure your first argument is one of `add` or `remove`, your second `guild` or `user` and your third an ID or a mention (ID\'s user only).')
    }

    if (args[0].toLowerCase() === 'add') {
      ids.forEach(id => Memer.db.addBlock(id, parseInt(args[1])))
      msg.channel.createMessage(`Successfully blacklisted ${ids.join(', ')}.`)
    } else if (args[0].toLowerCase() === 'remove') {
      if (!ids.some(async arg => await Memer.db.isBlocked(arg))) { // eslint-disable-line
        return msg.channel.createMessage(`\`${ids}\` not found in blocked database. Please block to unblock. :^)`)
      }
      ids.forEach(id => Memer.db.removeBlock(id))
      msg.channel.createMessage(`Successfully unblacklisted ${ids.join(', ')}.`)
    }
  }
}

exports.props = {
  name: 'dev',
  usage: '{command} you really don\'t need docs for this ',
  aliases: ['stupid-bot'],
  cooldown: 1,
  description: 'henlo, u stinky birb',
  perms: []
}

function setAvatar (Memer, url) {
  require('snekfetch').get(url).end((err, res) => {
    if (err) {
      throw err
    }
    console.log(JSON.stringify(res.body))
    Memer.bot.editSelf({ avatar: `data:${res.header['content-type']};base64,${res.body.toString('base64')}` })
  })
}
