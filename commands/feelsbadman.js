exports.run = function (client, msg) {
	 if (!msg.guild.member(client.user).hasPermission('SEND_MESSAGES')) return msg.author.send('I do not have permission to send messages in that channel! Please fix this to use this command.').catch(console.error)
     if (!msg.guild.member(client.user).hasPermission('ATTACH_FILES')) return msg.author.send('I do not have permission to send messages in that channel! Please fix this to use this command.').catch(console.error)
    
	msg.channel.sendFile('http://vignette3.wikia.nocookie.net/cookietest/images/e/e2/FeelsBadMan.png')
}
