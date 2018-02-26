const { inspect } = require('util')
const { post } = require('snekfetch')

module.exports = {
  help: 'eval <script> (Automatically uses async when `await` or `return` is detected)',
  fn: async ({ Memer, msg, args }) => {
    let input = args.join(' ')
    const asynchr = input.includes('return') || input.includes('await')

    let result, evalTime

    try {
      const before = Date.now()
      result = await eval(asynchr ? `(async()=>{${input}})();` : input) // eslint-disable-line
      evalTime = Date.now() - before
      if (typeof result !== 'string') {
        result = inspect(result, {
          depth: +!(inspect(result, { depth: 1 }).length > 1000) // Results in either 0 or 1
        })
      }
      const tokenRegex = new RegExp(Memer.config.token, 'gi')
      result = result.replace(tokenRegex, 'i think the fuck not, you trick ass bitch')
    } catch (err) {
      result = err.message
    }

    if (input.length + result.length > 994) {
      const res = await post('https://hastebin.com/documents')
        .send(`${input}\n\n${result}`)
        .catch(err => msg.channel.createMessage(err.message))
      return `Eval exceeds 1000 characters. View here: https://hastebin.com/${res.body.key}`
    } else {
      return {
        fields: [
          { name: 'Input', value: Memer.codeblock(input, 'js') },
          { name: 'Output', value: Memer.codeblock(result, 'js') }
        ],
        footer: { text: evalTime || evalTime === 0 ? `evaluated in ${evalTime}ms` : '' }
      }
    }
  }
}
