exports.run = async function (Memer, msg, args) {
  if (!args[0]) {
    return msg.channel.createMessage(`You are a ${Math.floor(Math.random() * 10 + 1)}/10 waifu 😄`)
  }
  if (args[0] === 'me') {
    return msg.channel.createMessage(`You are a ${Math.floor(Math.random() * 10 + 1)}/10 waifu 😄`)
  }
  if (msg.mentions[0]) {
    return msg.channel.createMessage(`${msg.mentions[0].username} is a ${Math.floor(Math.random() * 10 + 1)}/10 waifu 😄`)
  } 
  msg.channel.createMessage(`${args.join(' ')} is a ${Math.floor(Math.random() * 10 + 1)}/10 waifu 😄`)
}
    
  
  
  exports.props = {
    name: 'ratewaifu',
    usage: '{command}',
    aliases: ['waifu'],
    cooldown: 1000,
    description: 'People were upset about only being rated as dank or not, so we added this. You\'re welcome princess',
    perms: []
  }
  