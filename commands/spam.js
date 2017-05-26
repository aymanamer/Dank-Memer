exports.run = function (client, msg, args, config, Discord) {
    const donators = ["172571295077105664"]
    if (!msg.guild.member(client.user).hasPermission('SEND_MESSAGES'))
        return msg.author.send('I do not have permission to send messages in that channel! Please fix this to use this command.').catch(console.error);

    if (!donators.includes(msg.author.id))
        return msg.channel.send('This is a donator only command! To gain access, you must donate $5 or more here: <https://www.patreon.com/melmsie>', {
            reply: msg.author
        })

    if (!msg.author['cooldown'])
        msg.author['cooldown'] = 1


    if (msg.author['cooldown'] + 60000 > Date.now())
        return msg.channel.send('ratelimited by b1nzy bytch http://b1nzy-ratelimited.me/', {
            reply: msg.author
        });

    if (!args[0])
        return msg.reply('What do you want me to spam?');

    if (args.join(' ').length > 1500) //change 1000 to whatever you wawnt
        return msg.channel.send('Too long.', {
            reply: msg.author
        });

    msg.author['cooldown'] = Date.now();

    for (let spam = 0; spam < 10; spam++) {
        msg.channel.send(args.join(' '))
    }
}
