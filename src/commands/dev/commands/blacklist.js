module.exports = {
  help: 'shut',
  fn: async ({ Memer, msg, args }) => {
    const ids = msg.mentions[0] ? msg.mentions.map(u => u.id) : args.slice(2).filter(arg => parseInt(arg))

    if (
      !args[0] || !args[1] || !args[2] ||
      !['add', 'remove'].includes(args[0].toLowerCase())
    ) {
      return 'Argument error. Make sure your first argument is one of `add` or `remove`, your second `guild` or `user` and your third an ID or a mention (ID\'s user only).'
    }

    if (args[0].toLowerCase() === 'add') {
      ids.forEach(id => Memer.db.addBlock(id, parseInt(args[1])))
      return `Successfully blacklisted ${ids.join(', ')}.`
    } else if (args[0].toLowerCase() === 'remove') {
      ids.forEach(id => Memer.db.removeBlock(id))
      return `Successfully unblacklisted ${ids.join(', ')}.`
    }
  }
}
