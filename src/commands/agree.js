exports.run = function (Memer, msg) {
	msg.channel.createMessage(`I agree with ${msg.author.mention}.`);
};

exports.props = {
	name: 'agree',
	usage: '{command}',
	aliases: [],
	cooldown: 1000,
	description: 'When no one else agrees with you, Dank Memer does.'
};
