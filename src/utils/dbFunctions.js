module.exports = Bot => ({
  addEff: async function addEff (userID, guildID) {
    let effs = await this.getEffs(userID, 'userID')
    if (!effs[0] || !effs.filter(eff => eff.guildID === guildID)[0]) {
      return this.createEff(userID, guildID)
    }
    const eff = effs.filter(eff => eff.guildID === guildID)[0]
    eff.effs++

    return Bot.r.table('effs')
      .insert(eff, { conflict: 'update' })
  },

  createEff: async function createEff (userID, guildID) {
    return Bot.r.table('effs')
      .insert({
        userID,
        guildID,
        effs: 1
      })
      .run()
  },

  getEffs: async function getEffs (id, index) {
    const effs = await Bot.r.table('effs')
      .getAll(id, { index })
      .run()

    return effs.sort((a, b) => b.effs - a.effs)
  },

  getAllEffs: async function getEffs () {
    const effs = await Bot.r.table('effs')
      .run()

    return effs.sort((a, b) => b.effs - a.effs)
  },

  createGuild: async function createGuild (guildID) {
    await Bot.r.table('guilds')
      .insert({
        id: guildID,
        prefix: Bot.config.defaultPrefix,
        disabledCommands: []
      })
      .run()
    Bot.metrics.increment('db.createGuild')
    return this.getGuild(guildID)
  },

  getGuild: async function getGuild (guildID) {
    Bot.metrics.increment('db.getGuild')
    return Bot.r.table('guilds')
      .get(guildID)
      .run()
  },

  updateGuild: async function updateGuild (guildEntry) {
    Bot.metrics.increment('db.updateGuild')
    return Bot.r.table('guilds')
      .insert(guildEntry, { conflict: 'update' })
      .run()
  },

  deleteGuild: async function deleteGuild (guildID) {
    Bot.metrics.increment('db.deleteGuild')
    return Bot.r.table('guilds')
      .get(guildID)
      .delete()
      .run()
  },

  addCooldown: async function addCooldown (command, ownerID) {
    Bot.metrics.increment('db.addCooldown')
    if (!Bot.cmds.has(command)) {
      return
    }
    const cooldown = Bot.cmds.get(command).props.cooldown
    const profile = await this.getCooldowns(ownerID)
    if (!profile) {
      return this.createCooldowns(command, ownerID)
    }
    if (profile.cooldowns.some(cmd => cmd[command])) {
      profile.cooldowns.forEach(cmd => {
        if (cmd[command]) {
          cmd[command] = Date.now() + cooldown
        }
      })
    } else {
      profile.cooldowns.push({ [command]: Date.now() + cooldown })
    }
    return Bot.r.table('cooldowns')
      .insert({ id: ownerID, cooldowns: profile.cooldowns }, { conflict: 'update' })
  },

  createCooldowns: async function createCooldowns (command, ownerID) {
    Bot.metrics.increment('db.createCooldown')
    if (!Bot.cmds.has(command)) {
      return
    }
    const cooldown = Bot.cmds.get(command).props.cooldown
    return Bot.r.table('cooldowns')
      .insert({ id: ownerID, cooldowns: [ { [command]: Date.now() + cooldown } ] })
  },

  getCooldowns: async function getCooldown (ownerID) {
    Bot.metrics.increment('db.getCooldown')
    return Bot.r.table('cooldowns')
      .get(ownerID)
      .run()
  },

  getCooldown: async function getCooldown (command, ownerID) {
    Bot.metrics.increment('db.getCooldown')
    const profile = await Bot.r.table('cooldowns').get(ownerID).run()
    if (!profile) {
      return 1
    }
    const cooldowns = profile.cooldowns.find(item => item[command])
    if (!cooldowns) {
      return 1
    }
    return profile.cooldowns.find(item => item[command])[command]
  },

  addBlock: async function addBlock (id) {
    Bot.metrics.increment('db.addBlock')
    return Bot.r.table('blocked')
      .insert({ id })
      .run()
  },

  removeBlock: async function removeBlock (id) {
    Bot.metrics.increment('db.removeBlock')
    return Bot.r.table('blocked')
      .get(id)
      .delete()
      .run()
  },

  isBlocked: async function isBlocked (guildID, authorID = 1) {
    Bot.metrics.increment('db.checkBlock')
    const res = await Bot.r.table('blocked').get(guildID).run() ||
                await Bot.r.table('blocked').get(authorID).run()

    return Boolean(res)
  },

  addDonator: async function addDonator (id, donatorLevel) {
    Bot.metrics.increment('db.addDonor')
    return Bot.r.table('donators')
      .insert({ id, donatorLevel })
      .run()
  },

  removeDonator: async function removeDonator (id) {
    Bot.metrics.increment('db.removeDonor')
    return Bot.r.table('donators')
      .get(id)
      .delete()
      .run()
  },

  isDonator: async function isDonator (id, donatorLevel = 1) {
    Bot.metrics.increment('db.checkDonor')
    const res = await Bot.r.table('donators')
      .get(id)
      .run()
    return res ? res.donatorLevel >= donatorLevel : false
  },

  getStats: async function getStats () {
    Bot.metrics.increment('db.getStats')
    const res = await Bot.r.table('stats')
      .get(1)
      .run()
    return res.stats
  }
})
