exports.run = function (client, msg, args, config, Discord) {
    let user = msg.mentions.users.first()
    let member = msg.guild.member(user)
    const donators = [
        "172571295077105664", //me
        "234129266097389580" // YourPalDerpy#6380
    ]
    if (!donators.includes(msg.author.id))
        return msg.channel.send('This is a donator only command! To gain access, you must donate $1 or more here: <https://www.patreon.com/melmsie>', {
            reply: msg.author
        })
    if (!msg.guild.member(msg.author).hasPermission('BAN_MEMBERS')) return msg.reply('You don\'t have permission to ban people on this server!').catch(console.error)
    if (msg.mentions.users.size < 1) return msg.reply('Please mention someone in the server to ban!').catch(console.error)
    


    if (!msg.guild.member(client.user).hasPermission('BAN_MEMBERS')) return msg.reply('I do not have the correct permissions!').catch(console.error)

    if (msg.guild.member(member) && member.kickable) {

        msg.guild.member(user).ban().catch(console.error)

    } else if (!member.kickable) {
        msg.react('❌')
        msg.reply('This user is not hurt by your puny ban hammer!')
    } else {
        msg.react('❌')
        msg.reply("This user doesn't exist in the server!")
    }

}
