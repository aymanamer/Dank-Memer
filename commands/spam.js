exports.run = function (client, msg, args, config, Discord) {
    const donators = [
        "172571295077105664", //me
        "162134224353230848" // magikarp
    ]
    const servers = [
        "281482896265707520",
        "264445053596991498",
        "110373943822540800"
    ]
    if (!msg.guild.member(client.user).hasPermission('SEND_MESSAGES'))
        return msg.author.send('I do not have permission to send messages in that channel! Please fix this to use this command.').catch(console.error)

    if (!donators.includes(msg.author.id))
        return msg.channel.send('This is a donator only command! To gain access, you must donate $5 or more here: <https://www.patreon.com/melmsie>', {
            reply: msg.author
        })

    if (servers.includes(msg.guild.id)){
        return msg.channel.send('Sorry, Melmsie likes this server too much to let you spam.')
    }

    if (!args[0])
        return msg.reply('What do you want me to spam?')

    if (args.join(' ').length > 1900) 
        return msg.channel.send('Too long.', {
            reply: msg.author
        })




    function intervalFunc() {
        msg.channel.send(args.join(' '))
    }

    let haha = setInterval(intervalFunc, 1250)

    setTimeout(function () {
        clearInterval(haha)
    }, 30000)

}
