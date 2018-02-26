module.exports = {
  help: 'plz dont to succ',
  fn: async ({ Memer }) => {
    const data = await Memer.db.getStats()
    data.total = [
      ` [00]`,
      `GUILDS: ${data.guilds}`,
      `SHARDS: ${data.clusters.map(c => c.shards).reduce((a, b) => a + b)}`,
      `RAM: ${parseFloat(data.totalRam / 1000).toFixed(2)}GB`
    ]

    data.clusters = data.clusters.map(c => {
      return [
        `${c.cluster === Memer.clusterID ? '*' : ' '}[${(c.cluster).toString().padStart(2)}]`,
        `GUILDS:   ${c.guilds}`,
        `SHARDS:  ${c.shards}`,
        `RAM: ${parseFloat(c.ram).toFixed(2)}MB`,
        `UPTIME: ${Memer.parseTime(c.uptime / 1000)}`
      ].join(' | ')
    })

    data.clusters.push('\n')
    data.clusters.push(data.total.join(' | '))

    return Memer.codeblock(data.clusters.join('\n'), 'prolog')
  }
}
