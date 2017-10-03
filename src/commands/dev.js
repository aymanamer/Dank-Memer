const { exec } = require('child_process')
const util = require('util')
const twit = require('twit')

const twitter = require('../config.json').twitter
const tClient = new twit({
  consumer_key: twitter.consumer_key,
  consumer_secret: twitter.consumer_secret,
  access_token: twitter.access_token,
  access_token_secret: twitter.access_token_secret,
  timeout_ms: 60 * 1000,
})

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
  if (args[0] === 'help' || !args[0]) {
    return msg.channel.createMessage({ embed: {
      footer: { text: 'Now go fuck people up with these OP commands!' },
      color: 3569331,
      fields: [
        { name: 'reboot',    value: 'reboot [shard, all]' },
        { name: 'eval',    value: 'eval <args>' },
        { name: 'bash',    value: 'bash <args>' },
        { name: 'git',      value: 'git pull' },
        { name: 'donor',    value: '[add, remove] [1, 5, 10] <id or @tag>' },
        { name: 'blacklist', value: '[add, remove] [guild, user, channel] <id or @tag>' }
      ]
    }})
  }

  const command = args[0]
  args.shift()

  if (command === 'deletetweet' && msg.member.roles.includes('334170299979399169')) {
    if (!parseInt(args[0])) {
      return msg.channel.createMessage('Argument error. Make sure the argument(s) you\'re passing are numbers and exist.')
    }
    args.filter(arg => parseInt(arg)).forEach(targetTweetID => {
      tClient.post('statuses/destroy/:id', { id: targetTweetID }, (err, data, response) => {
        if (!err && response.statusCode === 200) {
          msg.channel.createMessage({ embed: {
            color: 0x4099FF,
            description: `Tweet ${targetTweetID} successfully deleted.`
          }})
        } else {
          msg.channel.createMessage(`Something went wrong.\nStatus code: ${response.statusCode}\nError: ${err.message}`)
        }
      })
    })
  }

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
    } else {
      await msg.channel.createMessage('All clusters rebooting...')
      return exec('pm2 restart memer', () => { msg.channel.createMessage('Huh?') })
    }
  }

  if (command === 'eval') {
    let input = args.join(' ')
    const silent = input.includes('--silent')
    const asynchr = input.includes('--async')
    if (silent || asynchr) {
      input = input.replace(/--silent|--async/g, '')
    }

    let result
    let evalTime
    try {
      const before = Date.now()
      result = asynchr ? eval(`(async()=>{${input}})();`) : eval(input)
      evalTime = Date.now() - before
      if (result instanceof Promise && asynchr) {
        result = await result
      }
      if (typeof result !== 'string') {
        result = util.inspect(result, { depth: 0 })
      }
      const tokenRegex = new RegExp(Memer.config.token, 'gi')
      result = result.replace(tokenRegex, '[TOKEN]')
    } catch (err) {
      result = err.message
    }

    if (!silent) {
      msg.channel.createMessage({ embed: {
        color: Memer.colors.lightblue,
        fields: [
          { name: 'Input', value: Memer.codeblock(input, 'js') },
          { name: 'Output', value: Memer.codeblock(result, 'js') }
        ],
        footer: { text: evalTime || evalTime === 0 ? `evaluated in ${evalTime}ms` : '' }
      }})
    } else {
      msg.delete().catch(() => {})
    }
  }

  if (command === 'bash') {
    msg.channel.createMessage(`**Input**\n${Memer.codeblock(args.join(' '), 'sh')}`)
    exec(args.join(' '), async (e, stdout, stderr) => {
      if (stdout.length + stderr.length > 994) {
        const res = await Memer._snek.post('https://hastebin.com/documents')
          .send(`${stdout}\n\n${stderr}`)
          .catch(err => msg.channel.createMessage(err.message))
        msg.channel.createMessage(`Console log exceeds 2000 characters. View here: https://hastebin.com/${res.body.key}.`)
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

  const arguments = msg.mentions[0] ? msg.mentions.map(u => u.id) : args.slice(2).filter(arg => parseInt(arg))

  if (command === 'donor') {
    if (!args[0] || !args[1] || !['add', 'remove'].includes(args[0]) || !['1', '5', '10'].includes(args[1])) {
      return msg.channel.createMessage('Argument error. The first argument must be one of `add` or `remove`, and the second must be one of `1`, `5` or `10`.')
    }

    if (args[0] === 'add') {
      arguments.forEach(id => Memer.db.addDonator(id, parseInt(args[1])))
      msg.channel.createMessage(`Successfully added ${arguments.join(', ')} to tier ${args[1]}.`)
    } else if (args[0] === 'remove') {
      if (!arguments.some(async arg => await Memer.db.isDonator(arg, 1))) {
        return msg.channel.createMessage(`\`${arguments.some(async arg => await Memer.db.isDonator(arg, 1))}\` not found in donor database.`)
      }
      arguments.forEach(id => Memer.db.removeDonator(id, parseInt(args[1])))
      msg.channel.createMessage(`Successfully removed ${arguments.join(', ')}.`)
    }
  }

  if (command === 'blacklist') {
    if (!args[0] || !args[1] || !args[2] ||
      !['add', 'remove'].includes(args[0].toLowerCase())) {
      return msg.channel.createMessage('Argument error. Make sure your first argument is one of `add` or `remove`, your second `guild` or `user` and your third an ID or a mention (ID\'s user only).')
    }

    if (args[0].toLowerCase() === 'add') {
      arguments.forEach(id => Memer.db.addBlock(id, parseInt(args[1])))
      msg.channel.createMessage(`Successfully blacklisted ${arguments.join(', ')}.`)
    } else if (args[0].toLowerCase() === 'remove') {
      if (!arguments.some(async arg => await Memer.db.isBlocked(arg))) {
        return msg.channel.createMessage(`\`${arguments}\` not found in blocked database. Please block to unblock. :^)`)
      }
      arguments.forEach(id => Memer.db.removeBlock(id))
      msg.channel.createMessage(`Successfully unblacklisted ${arguments.join(', ')}.`)
    }
  }
}

exports.props = {
  name        : 'dev',
  usage       : '{command} you really don\'t need docs for this ',
  aliases     : ['stupid-bot'],
  cooldown    : 1,
  description : 'henlo, u stinky birb'
}
