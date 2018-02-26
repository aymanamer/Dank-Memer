module.exports = {
  run: async function run ({ Memer, msg, args }) {
    return {
      description: args.join(' ')
    }
  },
  props: {
    triggers: ['ping', 'pong'],
    description: 'hi'
  }
}
