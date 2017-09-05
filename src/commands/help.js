exports.run = async function (Memer, msg) {
    let funemoji;
    if (msg.channel.permissionsOf(Memer.bot.user.id).has('externalEmojis')) {
        funemoji = '<:feelsgreatman:326155536800284673>';
    } else {
        funemoji = ':joy:';
    }
    msg.channel.createMessage({ embed: {
        color: Memer.colors.purple,
        title: 'Available Commands',
        description: 'Henlo, stinky.',
        fields: [
			{ name: `${funemoji} Fun Commands`, value: 'asktrump, greentext, joke, justright, kill, meme, memegen, mock, pupper, pun, shitpost, spin' },
			{ name: '📷 Image Manipulation', value: 'batslap, brazzers, byemom, dank, invert, jail, magik, pride, salty, shit, spank, trigger, warp' },
            { name: '🔧 Utilities and Information', value: 'clean, disable, enable, help, patreon, ping, prefix, stats' },
			{ name: '🖼 Image Tags', value: 'alone, doge, dolan, godno, kappa, lul, megusta, notsure, pepe, troll, wat ' },
			{ name: '💰 Donor Commands', value: 'say, tweet' }
        ],
        footer: { text: 'Want access to donor commands? Donate here: https://www.patreon.com/melmsie' }
    } });
};

exports.props = {
    name        : 'help',
    usage       : '{command}',
    aliases     : ['cmds', 'commands'],
    cooldown    : 1000,
    description : 'See a list of commands available.'
};