const Jimp = require('jimp');
exports.run = async function (Memer, msg, args) {
    if (args.length < 1) {
        return msg.channel.createMessage('You need to add some text, try again.');
    }
    if (args.join(' ').length > 40) {
        return msg.channel.createMessage(`Text too long. You're ${args.join(' ').length - 40} characters over the limit!`);
    }

    if (msg.mentions.length > 0) {
        args = args.join(' ').substr(21);
    } else {
        args = args.join(' ');
    }

    const text = args;
    const mom = await Jimp.read('./assets/imgen/afa.jpg');
    const blank = await Jimp.read('./assets/imgen/Empty.png');
    mom.resize(500, 500);
    Jimp.loadFont(Jimp.FONT_SANS_16_BLACK).then(function (font) {
        blank.resize(500, 500);
        const search = blank.print(font, 0, 0, text, 105);

        mom.composite(search, 382, 270);
        mom.getBuffer(Jimp.MIME_PNG, async (err, buffer) => {
            await msg.channel.createMessage('', { file: buffer, name: 'search.png' });
        });
    });

};

exports.props = {
    name        : 'pony',
    usage       : '{command}',
    aliases     : [],
    cooldown    : 1,
    description : ''
};