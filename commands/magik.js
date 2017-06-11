const gm = require('gm');
const sf = require('snekfetch');

exports.run = async function (client, msg, args) {

	let avatarURL;

	if (msg.mentions.users.size > 0) {
		avatarURL = msg.mentions.users.first()
	} else if (args.length > 0) {
		if (isNaN(args[0])) {
			avatarURL = args[0];
		} else {
			avatarURL = client.users.has(args[0]) && client.users.get(args[0]);
		}
	} else {
		avatarURL = msg.author;
	}

	if (!avatarURL)
		return msg.edit("User not found.");

	if (typeof avatarURL === "object")
		avatarURL = avatarURL.displayAvatarURL.replace(/gif|webp/gi, "png");

	avatarURL = avatarURL.replace(/\<|\>/g, "");

	let data = await sf.get(avatarURL);

	msg.channel.startTyping();

	gm(data.body)
		.implode(-3)
		.toBuffer('PNG', (err, buffer) => {
			msg.channel.send({ files: [{ name: "magik.png", attachment: buffer }] })
				.catch(err => {
					msg.channel.send("Couldn't generate an image for that user.");
					msg.channel.stopTyping(true);
				});
			msg.channel.stopTyping(true);
		});

}

