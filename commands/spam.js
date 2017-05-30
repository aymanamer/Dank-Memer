exports.run = function (client, msg, args, config, Discord) {
    const donators = [
        "172571295077105664", //me
        "234129266097389580" // YourPalDerpy#6380
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

    if (!msg.author['cooldown'])
        msg.author['cooldown'] = 1


    if (msg.author['cooldown'] + 30000 > Date.now())
        return msg.channel.send('ratelimited by b1nzy bytch http://b1nzy-ratelimited.me/ \nAka, you can only spam once per 30 seconds, otherwise the bot is bannable by discord', {
            reply: msg.author
        })

    if (!args[0])
        return msg.reply('What do you want me to spam?')

    if (args.join(' ').length > 1950) //change 1000 to whatever you wawnt
        return msg.channel.send('Too long.', {
            reply: msg.author
        })

    msg.author['cooldown'] = Date.now()



    function intervalFunc() {
        msg.channel.send(args.join(' '))
    }

    let haha = setInterval(intervalFunc, 1250)

    setTimeout(function () {
        clearInterval(haha)
    }, 30000)

}
