exports.run = function (client, msg, args, utils) {
	msg.channel.send({
		embed: {
			title: 'Donate to Dank Memer on Patreon!',
			description: '**__Premium Key Contents:__**\n❯ *75% reduced cooldowns on all commands*\n❯ *Donor role on Meme Central*\n❯ *Donor role on Melmsie Central*\n❯ *Access to pls repeat*\n❯ *Guaranteed faster support*\n❯ *Early Access to new bots*\n❯ *Access to donor image tags*',
			url: 'https://www.patreon.com/melmsie',
			color: utils.lightblue,
			fields:
			[ { name: '$2 Tier :feelsbadman:',
				value: '❯ 1 Premium Key',
				inline: false },
				{ name: '$5 Tier :feelscuteman:',
				value: '❯ 1 Premium Key\n❯ Access to pls spam\n❯ pls dank will generate a gif for you\n❯ Access to Dank Stars (coming soon)',
				inline: false },
				{ name: '$10 Tier :feelskawaiiman:',
				value: '❯ 2 Premium Keys (Give one to a friend!)\n❯ Access to pls spamv\n❯ pls dank will generate a gif for you\n❯ Access to Dank Stars (coming soon)\n❯ 1 custom command',
				inline: false },
				{ name: '$20 Tier :feelsgreatman:',
				value: '❯ 3 Premium Keys (Give perks to two friends!)\n❯ Access to pls spam\n❯ pls dank will generate a gif for you\n❯ Access to Dank Stars (coming soon)\n❯ 2 custom commands',
				inline: false } ],
			footer: { text: 'Donating will always be optional, and always appreciated! :D' },
		}})
}
