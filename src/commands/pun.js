exports.run = async function (Memer, msg) {
    const joek = await Memer._snek
		.get('https://icanhazdadjoke.com/')
		.set('Accept', 'application/json');
    msg.channel.createMessage(joek.body.joke);
};

exports.props = {
    name        : 'pun',
    usage       : '{command}',
    aliases     : [],
    cooldown    : 1,
    description : ''
};