module.exports = {
  help: 'reload [command | all]',
  fn: async ({ Memer, msg, args }) => {
    if (!args[0]) {
      return `Please specify a command to reload, or put 'all'.`
    }

    if (args[0].toLowerCase() === 'all') {
      try {
        Memer.cmds.map(cmd => {
          delete require.cache[require.resolve(`../../${cmd.props.triggers[0]}`)]
        })
        Memer.cmds = []
        Memer.loadCommands()
        return 'Successfully reloaded all commands.'
      } catch (err) {
        return `We had a hecking error: \n\`\`\`${err.stack || err.message || err}\`\`\``
      }
    }

    const command = Memer.cmds.find(c => c.props.triggers.includes(args[0].toLowerCase()))
    if (!command) {
      return `\`${args[0]}\` is not a valid command.`
    }

    try {
      Memer.cmds.splice(Memer.cmds.indexOf(command), 1)
      delete require.cache[require.resolve(`../../${args[0]}`)]
      Memer.cmds.push(require(`../../${args[0]}`))
      return `Reloaded \`${args[0]}\`.`
    } catch (err) {
      return `We had a hecking error: \n\`\`\`${err.stack || err.message || err}\`\`\``
    }
  }
}
