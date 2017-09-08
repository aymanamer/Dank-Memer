exports.run = async function (Memer, msg, args) {
    if (!Memer.db.isDonator(msg.author.id)) {
        return msg.reply('You need to both be on Melmsie\'s server and be a donor to use this command! To join the server, use `pls invite`. To donate, use `pls donate`.');
    }
    if (!args[0]) {
        return msg.reply('What do you want me to spam?');
    }
    const intervalFunc = () => {
        msg.channel.createMessage(args.join(' '));
    };
    const haha = setInterval(intervalFunc, 1250);
    setTimeout(function () { // eslint-disable-line prefer-arrow-callback
        clearInterval(haha);
    }, 10000);
};

exports.props = {
    name        : 'spam',
    usage       : '{command}',
    aliases     : [],
    cooldown    : 1,
    description : ''
};