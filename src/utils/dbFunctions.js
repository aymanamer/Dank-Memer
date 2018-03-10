module.exports = Bot => ({
  createGuild: async function createGuild (guildID) {
    await Bot.r.table('guilds')
      .insert({
        id: guildID,
        prefix: Bot.config.defaultPrefix,
        disabledCommands: []
      })
      .run()
    return this.getGuild(guildID)
  },

  getGuild: async function getGuild (guildID) {
    return Bot.r.table('guilds')
      .get(guildID)
      .run()
  },

  updateGuild: async function updateGuild (guildEntry) {
    return Bot.r.table('guilds')
      .insert(guildEntry, { conflict: 'update' })
      .run()
  },

  deleteGuild: async function deleteGuild (guildID) {
    return Bot.r.table('guilds')
      .get(guildID)
      .delete()
      .run()
  },

  addCooldown: async function addCooldown (command, ownerID) {
    const pCommand = Bot.cmds.find(c => c.props.triggers.includes(command.toLowerCase()))
    if (!pCommand) {
      return
    }
    const cooldown = pCommand.props.cooldown
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
    const pCommand = Bot.cmds.find(c => c.props.triggers.includes(command.toLowerCase()))
    if (!pCommand) {
      return
    }
    const cooldown = pCommand.props.cooldown
    return Bot.r.table('cooldowns')
      .insert({ id: ownerID, cooldowns: [ { [command]: Date.now() + cooldown } ] })
  },

  getCooldowns: async function getCooldown (ownerID) {
    return Bot.r.table('cooldowns')
      .get(ownerID)
      .run()
  },

  getCooldown: async function getCooldown (command, ownerID) {
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
    return Bot.r.table('blocked')
      .insert({ id })
      .run()
  },

  removeBlock: async function removeBlock (id) {
    return Bot.r.table('blocked')
      .get(id)
      .delete()
      .run()
  },

  isBlocked: async function isBlocked (guildID, authorID = 1) {
    const res = await Bot.r.table('blocked').get(guildID).run() ||
                await Bot.r.table('blocked').get(authorID).run()

    return Boolean(res)
  },

  addTag: async function addTag (id, name, text) {
    return Bot.r.table('tags')
      .insert({guild_id: id, name: name, text: text})
  },

  getAllTags: async function getAllTags (id) {
    let tags = await Bot.r.table('tags')
      .getAll(id, {index: 'guild_id'})
      .run()
    return tags
  },

  getTag: async function getTag (name) {
    let tags = await Bot.r.table('tags')
      .filter({name: name})
      .run()
    return tags
  },

  addCoins: async function addCoins (id, amount) {
    let coins = await this.getCoins(id)
    coins.coin += amount

    return Bot.r.table('coins')
      .insert(coins, { conflict: 'update' })
  },

  removeCoins: async function removeCoins (id, amount) {
    let coins = await this.getCoins(id)
    if (coins.coin - amount <= 0) {
      coins.coin = 0
    } else {
      coins.coin -= amount
    }

    return Bot.r.table('coins')
      .insert(coins, { conflict: 'update' })
  },

  grabCoin: async function grabCoin (id) {
    let coins = await Bot.r.table('coins')
      .get(id)
      .run()
    if (!coins) {
      return Bot.r.table('coins')
        .insert({ id, coin: 0 }, { returnChanges: true })
        .run()
    }
    return coins
  },

  getCoins: async function getCoins (id) {
    let coins = await this.grabCoin(id)
    if (coins.changes) (coins = coins.changes[0].new_val)
    return coins
  },

  noCoins: async function noCoins (id) {
    return Bot.r.table('coins')
      .get(id)
      .delete()
      .run()
  },

  addDonator: async function addDonator (id, donatorLevel) {
    return Bot.r.table('donators')
      .insert({ id, donatorLevel })
      .run()
  },

  removeDonator: async function removeDonator (id) {
    return Bot.r.table('donators')
      .get(id)
      .delete()
      .run()
  },

  isDonator: async function isDonator (id, donatorLevel = 1) {
    const res = await Bot.r.table('donators')
      .get(id)
      .run()
    return res ? res.donatorLevel >= donatorLevel : false
  },

  getStats: async function getStats () {
    const res = await Bot.r.table('stats')
      .get(1)
      .run()
    return res.stats
  }
})
