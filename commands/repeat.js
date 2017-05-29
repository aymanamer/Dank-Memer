exports.run = function (client, msg, args, config, Discord) {
    if (!msg.guild.member(client.user).hasPermission('SEND_MESSAGES')) return msg.author.send('I do not have permission to send messages in that channel! Please fix this to use this command.').catch(console.error)
    
    const donators = [
        "172571295077105664", //me
        "234129266097389580" // YourPalDerpy#6380
    ]
    if (!donators.includes(msg.author.id))
        return msg.channel.send('This is a donator only command! To gain access, you must donate $1 or more here: <https://www.patreon.com/melmsie>', {
            reply: msg.author
        })
    try {
        if (!args[0]) {
            msg.channel.send('What do you want me to say?')
        } else {
            msg.channel.send(args)
        }
    } catch (e) {
        msg.channel.sendCode("js", e.message)
    }
}
