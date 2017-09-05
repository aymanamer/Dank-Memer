exports.run = async function (Memer, msg) {
    msg.channel.createMessage({ embed: {
        title: 'Donate to Dank Memer on Patreon!',
        description: 'For donating at any tier on patreon, you can get a ton of rewards!',
        url: 'https://www.patreon.com/melmsie',
        color: Memer.colors.lightblue,
        footer: { text: 'Donating will always be optional, and always appreciated! :D' },
    }});
};

exports.props = {
    name        : 'patreon',
    usage       : '{command}',
    aliases     : [],
    cooldown    : 1,
    description : ''
};