const { post } = require('snekfetch')
const { exec } = require('child_process')

module.exports = {
  help: 'shh bby is ok',
  fn: async ({ Memer, msg, args }) => {
    msg.channel.createMessage(`**Input**\n${Memer.codeblock(args.join(' '), 'sh')}`)
    exec(args.join(' '), async (e, stdout, stderr) => {
      if (stdout.length + stderr.length > 994) {
        const res = await post('https://hastebin.com/documents')
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
}
