exports.run = function (client, msg, args, config) {
    if (msg.author.id === config.owner) {
        try {
            let idShit = client.guilds.filter(g => g.members.has(args.join(' '))).map(g => g.name)
            msg.channel.send(idShit)
        } catch (e) {
            console.log(Date() + e)
            msg.reply('did you remember to use the user\'s id?')
        }

    } else {
        msg.reply('You cannot use this')
    }
}