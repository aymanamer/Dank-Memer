exports.run = async function (Memer, msg) {
    getCatPic(Memer, msg);
};

async function getCatPic(Memer, msg) {
    const data = await Memer._snek.get('https://random.cat/meow');
    if (data.body.file.includes('.mp4')) {
        return getCatPic(Memer, msg);
    }

    msg.channel.createMessage({
        embed: {
            title: '😻',
            color: parseInt('59BEE8', 16),
            image: { url: data.body.file },
            footer: { text: `Requested by ${msg.author.username}#${msg.author.discriminator}` }
        }
    });
}

exports.props = {
    name        : 'kitty',
    usage       : '{command}',
    aliases     : ['pussy', 'cat', 'meow'],
    cooldown    : 1000,
    description : 'Lets see some pretty kittys!'
};