const { kill } = require('../assets/arrays.json');

exports.run = async function (Memer, msg, args) {
    if (args[0] === 'me') {
        return msg.reply('no you can do it yourself. Please tag someone else to kill.');
    }
    if (!msg.mentions[0]) {
        return msg.reply('please tag someone to kill.');
    }
    msg.channel.createMessage(Memer.randomInArray(kill)
		.replace(/\$mention/g, msg.mentions[0].username)
		.replace(/\$author/g, msg.author.username));
};

exports.props = {
    name        : 'kill',
    usage       : '{command} @user',
    aliases     : ['murder'],
    cooldown    : 1000,
    description : 'Sick of someone? Easy! Just kill them!'
};