module.exports = {
  help: 'donor <add | remove> <1 | 5 | 10> <id | @tag>',
  fn: async ({ Memer, msg, args }) => {
    const ids = msg.mentions[0] ? msg.mentions.map(u => u.id) : args.slice(2).filter(arg => parseInt(arg))

    if (
      !args[0] ||
      !args[1] ||
      !['add', 'remove'].includes(args[0]) || !['1', '5', '10'].includes(args[1])
    ) {
      return 'Argument error. The first argument must be one of `add` or `remove`, and the second must be one of `1`, `5` or `10`.'
    }

    if (args[0] === 'add') {
      ids.forEach(id => Memer.db.addDonator(id, parseInt(args[1])))
      return `Successfully added ${ids.join(', ')} to tier ${args[1]}.`
    } else if (args[0] === 'remove') {
      ids.forEach(id => Memer.db.removeDonator(id, parseInt(args[1])))
      return `Successfully removed ${ids.join(', ')}.`
    }
  }
}
