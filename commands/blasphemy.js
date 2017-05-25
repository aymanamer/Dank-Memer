exports.run = function (client, msg, args) {
    blasphemer = require('blasphemy')

    if (!msg.guild.member(client.user).hasPermission('SEND_MESSAGES')) return msg.author.send('I do not have permission to send messages in that channel! Please fix this to use this command.').catch(console.error)
   
    msg.reply('you are a ' + blasphemer.blaspheme())
}