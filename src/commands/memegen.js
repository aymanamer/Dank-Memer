const { GenericCommand } = require('../models/')
const { get } = require('snekfetch')
const memes = require('../assets/memes.json')

module.exports = new GenericCommand(
  async ({ Memer, msg, args, addCD }) => {
    let meme
    if (memes.map(m => m.toLowerCase()).includes(args.join(' '))) {
      meme = memes.find(m => m.toLowerCase() === args.join(' ').toLowerCase())
      Memer.log(meme)
    } else {
      msg.channel.createMessage({ embed: {
        title: 'Pick a meme!',
        color: Memer.randomColor(),
        description: 'I need you to tell me which meme you want to make. Pick from [this list](https://github.com/melmsie/Dank-Memer/wiki/Memegen-list) and reply with your answer.'
      }})

      const memeMsg = await Memer.MessageCollector.awaitMessage(msg.channel.id, msg.author.id, 30e3)
      if (!memeMsg) {
        return 'Prompt timed out.'
      } else if (!memes.map(r => r.toLowerCase()).includes(memeMsg.content.toLowerCase())) {
        return 'That is not a valid meme template.'
      }
      meme = memes.find(m => m.toLowerCase() === memeMsg.content.toLowerCase())
    }

    msg.channel.createMessage('What will your top line be?')
    const top = await Memer.MessageCollector.awaitMessage(msg.channel.id, msg.author.id, 30e3)
    if (!top) {
      return 'Prompt timed out.'
    } else if (!top.cleanContent) {
      return 'idk, whatever you say when someone sends an image/embed'
    }

    msg.channel.createMessage('What will your bottom line be?')
    const bottom = await Memer.MessageCollector.awaitMessage(msg.channel.id, msg.author.id, 30e3)
    if (!bottom) {
      return 'Prompt timed out.'
    } else if (!bottom.cleanContent) {
      return 'idk, whatever you say when someone sends an image/embed'
    }

    const maymay = await get(`https://ronreiter-meme-generator.p.mashape.com/meme?bottom=${bottom.cleanContent}&font=Impact&font_size=35&meme=${meme}&top=${top.cleanContent}`)
      .set('X-Mashape-Key', Memer.config.mashape)

    await addCD()
    return { content: '', file: { file: maymay.body, name: 'mymeme.png' } }
  }, {
    triggers: ['memegen', 'make'],
    description: 'Make some hot new memes on your own!',
    perms: ['attachFiles']
  }
)
