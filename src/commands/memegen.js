exports.run = async function (Memer, msg, args) {
    if (args.length === 0) {
        return msg.channel.createMessage('You can use this command to make your own memes! See meme templates here: <https://github.com/melmsie/Dank-Memer/wiki/Memegen-list>\n\nUsage: `pls memegen "meme name" = "line one" | "line two"`\nExample usage: `pls memegen Lion King = its the | circle of life`');
    }
    let top;
    let meme;
    let bottom;
    args = args.join(' ');

    if (args.includes('=')) {
        if (args.split('=')[0].trim().length > 0 && args.split('=')[1].trim().length > 0) {
            meme = args.split('=')[0].trim();
            args = args.split('=')[1].trim();
        } else {
            return msg.channel.createMessage('You need to select a meme template. Please look at the list of possible memes here: <https://github.com/melmsie/Dank-Memer/wiki/Memegen-list> and try again.');
        }

    } else {
        return msg.channel.createMessage('You need to select a meme template and use `=` after it. Please look at the list of possible memes here: <https://github.com/melmsie/Dank-Memer/wiki/Memegen-list> and try again.');
    }

    if (args.includes('|')) {
        if (args.split('|')[0].trim().length > 0 && args.split('|')[1].trim().length > 0) {
            top = args.split('|')[0].trim();
            bottom = args.split('|')[1].trim();
        } else {
            return msg.channel.createMessage('You need two lines to make a meme right now. Try again.');
        }
    }

    if (!Memer.memes.includes(meme)) {
        return msg.channel.createMessage('That is not a valid meme template. Please look at the list of possible memes here: <https://github.com/melmsie/Dank-Memer/wiki/Memegen-list> and try again.');
    }
    const maymay = await Memer._snek
		.get(`https://ronreiter-meme-generator.p.mashape.com/meme?bottom=${bottom}&font=Impact&font_size=35&meme=${meme}&top=${top}`)
		.set('X-Mashape-Key', Memer.config.mashape);
    msg.channel.createMessage('', { file: maymay.body, name: 'mymeme.png' });
};


exports.props = {
    name        : 'memegen',
    usage: '{command} "meme name" = "line one" | "line two"',
    aliases     : ['make'],
    cooldown    : 1000,
    description : 'Make some hot new memes on your own!'
};