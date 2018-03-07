const { exec } = require('child_process')

module.exports = {
  help: 'reboot <shard | all>',
  fn: async ({ Memer, msg, args }) => {
    if (args[0] === 'cluster') {
      await msg.channel.createMessage('Rebooting this cluster...')
      process.exit()
    } else if (args[0] === 'all') {
      await msg.channel.createMessage('All clusters rebooting...')
      exec('pm2 restart memer', () => { msg.channel.createMessage('Huh?') })
    } else {
      return 'Please specify a type of reboot, `cluster` or `all`.'
    }
  }
}
