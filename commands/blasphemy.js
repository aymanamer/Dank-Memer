exports.run = function (client, msg, args) {
    console.log('3')
    blasphemer = require('blasphemy')
    console.log('2')
    if (!msg.guild.member(client.user).hasPermission('SEND_MESSAGES')) return msg.author.send('I do not have permission to send messages in that channel! Please fix this to use this command.').catch(console.error)
   console.log('1')
    msg.reply('you are a ' + blasphemer.blaspheme())
}