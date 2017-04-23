exports.run = function (client, msg, args, config, Discord) {
  if (msg.author.id === config.owner) {
    const rp = require('request-promise')
    let options = {
      method: "POST",
      uri: "https://hastebin.com/documents",
      body: client.guilds.map(x=>x.name).join("\n"),
      json: false
    }
    rp(options).then(data => {
      msg.channel.sendEmbed(new Discord.RichEmbed().setColor("#2D7FFF").setDescription(`Server list created. View [here](https://hastebin.com/${JSON.parse(data).key}).`))
    })
  } else {
    msg.reply('you don\'t have permission to use this command, noob.')
  }
}
