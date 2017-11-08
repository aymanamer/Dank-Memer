exports.run = function (Memer, msg, args) {
  msg.channel.createMessage({
    embed: {
      color: Memer.colors.lightblue,
      author: { name: 'Call Dank Memer!' },
      description: 'Dank Memer went and got himself a phone number. He\'d love to text you/hear any voicemails you have for him. Call or text him at `(765) 753-2191`.',
      footer: { text: 'If you call, he will not answer. Leave a voicemail.' }
    }
  })
}

exports.props = {
  name: 'call',
  usage: '{command}',
  aliases: ['ring'],
  cooldown: 1000,
  description: 'Call dank memer or shoot him a text',
  perms: ['embedLinks']
}
