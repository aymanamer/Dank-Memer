const capitalizeEven = (char, index) => {
    if (index % 2 === 0) {
        return char.toUpperCase();
    } else {
        return char;
    }
}

exports.run = async function (Memer, msg, args) {
    if (!args[0]) {
        return Memer.reply('You gotta give me something to mock :eyes:', msg);
    }

    const dumb = args.join(' ').replace(/c/gi, 'k').replace(/v/gi, 'c');
    const textArray = dumb.toLowerCase().split('');
    const done = textArray.map(capitalizeEven).join('');

    const mockimg = await Memer._snek.get('https://pbs.twimg.com/media/DAU-ZPHUIAATuNy.jpg');

    msg.channel.createMessage(done, { file: mockimg.body, name: 'mock.jpg' });
};

exports.props = {
    name        : 'mock',
    usage       : '{command} "text to be mocked"',
    aliases     : [],
    cooldown    : 1000,
    description : 'Mock the stupid shit your friend says!'
};