exports.run = async function (Memer, msg, args) {
    const permissions = msg.channel.permissionsOf(Memer.bot.user.id);
    if (!permissions.has('readMessageHistory') || !permissions.has('manageMessages')) {
        return msg.reply('Well shit, there was a permission error! Make sure I have `read message history` and `manage messages` so I can do this shit!');
    }

    let messages = await msg.channel.getMessages(100);
    messages = messages.filter(m => m.author.id === Memer.bot.user.id);
    messages.length = parseInt(args[0]) || 10;
    msg.channel.deleteMessages(messages.map(m => m.id));
};

exports.props = {
    name        : 'clean',
    usage       : '{command}',
    aliases     : ['purge'],
    cooldown    : 2000,
    description : 'Will quickly clean the last 10 messages, or however many you specify.'
};