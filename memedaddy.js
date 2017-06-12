const config = require("./config.json")
const fs = require("fs")
const util = require("util")
const snekfetch = require("snekfetch")
const Discord = require("discord.js")
const client = new Discord.Client({
	disableEveryone: true
})

client.login(config.token)


const commandsPath = "./commands"

let cooldowns = {
	active: {},
	times: {
		trigger: 10000,
		meme: 1000,
		warp: 10000,
		pupper: 5000,
		justright: 2000,
		salty: 10000,
		mama: 3000,
		fuckoff: 1500,
		shitsound: 2000,
		annoy: 20000,
		clean: 2000,
		magik: 10000,
		annoy: 900000,
		spam: 900000
	}
}


client.on("message", msg => {
	if (msg.author.bot || msg.channel.type === "dm") return

	if (msg.isMentioned(client.user.id) && msg.content.includes("help")) {
		msg.channel.send(`Hello, ${msg.author.username}. My prefix is \`pls\`. Example: \`pls meme\``)
	}

	if (!msg.content.toLowerCase().startsWith(config.prefix)) return 

	if (!cooldowns.active[msg.author.id])
		cooldowns.active[msg.author.id] = []

	const command = msg.content.substring(config.prefix.length + 1).toLowerCase().split(" ")[0]
	const args = msg.content.split(" ").slice(2)

	if (command === "eval") {
		if (msg.author.id !== config.owner) return
		try {
			let before = Date.now()
			let rep = new RegExp(client.user.email + "|" + client.token, "gi");
			let code = eval(args.join(" "));
			if (typeof code === "string") code = code.replace(rep, "*");
			else code = util.inspect(code, {
				depth: 0
			}).replace(rep, "*");
			let evalTime = Date.now() - before
			msg.channel.send({
				embed: new Discord.RichEmbed()
					.setColor("#7d5bbe")
					.setFooter(`evaluated in ${evalTime}ms`)
					.addField("Input", `\`\`\`js\n${args.join(' ')}\`\`\``)
					.addField("Output", `\`\`\`js\n${code}\`\`\``)

			})
		} catch (e) {
			msg.channel.send({
				embed: new Discord.RichEmbed()
					.setColor("#7d5bbe")
					.addField("Input", `\`\`\`js\n${args.join(' ')}\`\`\``)
					.addField("Output", `\`\`\`js\n${e}\`\`\``)

			})
		}
	}

	if (command) {
		if (cooldowns.active[msg.author.id].includes(command)) {
			if (cooldowns.active[msg.author.id].includes('annoy')) {
				return msg.channel.send("After annoying someone, it is 15 minutes until you can annoy someone again!")
			}
			if (cooldowns.active[msg.author.id].includes('spam')) {
				return msg.channel.send("After spamming, it is 15 minutes until you can spam again.")
			}
			
			return msg.channel.send("This command is currently in cooldown. Try again in a few seconds.")
		}
			
			
		cooldowns.active[msg.author.id].push(command)


		setTimeout(() => {
			cooldowns.active[msg.author.id].splice(cooldowns.active[msg.author.id].indexOf(command), 1)
		}, cooldowns.times[command])

		try {
			delete require.cache[require.resolve("./commands/" + command)]
			if (!msg.channel.permissionsFor(client.user.id).has("SEND_MESSAGES") || !msg.channel.permissionsFor(client.user.id).has("EMBED_LINKS")) {
				return msg.author.send('I either don\'t have permission to send messages or I don\'t have permission to embed links in #' + msg.channel.name)
			}
			require("./commands/" + command).run(client, msg, args, config, Discord)

		} catch (e) {
			if (e.message.includes("Cannot find module")) return
			console.log(e)
		}
	}
})

client.on("guildCreate", async(guild) => {


	const guilds = await client.shard.fetchClientValues('guilds.size')
	const count = guilds.reduce((prev, val) => prev + val, 0)

	snekfetch
		.post("https://bots.discord.pw/api/bots/270904126974590976/stats")
		.set("Authorization", config.pwtoken)
		.send({ "server_count": count })
		.then(console.log('Updated dbots status.'))

	snekfetch
		.post("https://discordbots.org/api/bots/270904126974590976/stats")
		.set("Authorization", config.orgtoken)
		.send({ "server_count": count })
		.then(console.log('Updated dbots status.'))


	let bots = guild.members.filter(gm => gm.user.bot).size
	let percentage = Math.round((bots / guild.members.size * 100))
	if (percentage > 90 && bots > 20) {
		guild.defaultChannel.send(`Thanks for trying to add ${client.user.username}, but if you're seeing this, that means you have more than 20 bots.\n\nCan you not? Just delete a few bots and you'll be good 👌`)
			.then(() => {
				guild.leave()
			})
			.catch(e => {
				console.log(e.message) // probably forbidden or something
			})

	} else {
		guild.defaultChannel.sendEmbed(new Discord.RichEmbed()
			.setColor("#ffffff")
			.setTitle("Hello!")
			.setDescription(`My name is ${client.user.username}.\n\nTo get started, send \`pls help\`.\n\nI am maintained by Melmsie#0006, who can be found at [this server](https://discord.gg/3GNMJBG) if you need to talk to him.`)
		).catch(e => {
			console.log(`Failed to send welcome message to ${guild.name}\n${e.message}`)
		})
	}
})


client.once("ready", () => {
	console.log(`[${new Date()}] ${client.user.username} loaded successfully.`)

	setTimeout(() => process.exit(), 86400000)

})

process.on('unhandledRejection', err => console.error(`${Date()} Uncaught Promise Error: \n${err.stack}`));
