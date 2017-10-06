
exports.run = async function (Memer, msg) {
	msg.channel.createMessage('This command is dead and gone for good. Twitter has completely locked the account. You can thank STW#3839 (id 326673560842010624) for his tweet at an airline threatening to fly a plane into the new world trade center. ')
}

exports.props = {
	name        : 'tweet',
	usage       : '{command} what you wanna tweet',
	aliases     : ['twitter'],
	cooldown    : 20000,
	description : 'this was ruined'
}
