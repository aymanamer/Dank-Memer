const config = require("./config.json")
const fs = require("fs")
const util = require("util")
statsdb = require("./db/statsdb.json")
prefixes = {}
const {
	whitelist,
	blacklist
} = require("./db/bwlist.json")
const superagent = require("superagent")
const Discord = require("discord.js")
const client = new Discord.Client({
	disableEveryone: true
})

client.login(config.token)


const commandsPath = "./commands"

let cooldowns = {
	active: {},
	times: {
		trigger: 8000,
		meme: 1000,
		warp: 8000,
		pupper: 5000,
		justright: 2000,
		salty: 8000,
		mama: 3000,
		fuckoff: 1500,
		feedback: 10000
	}
}

let fucks = 0
client.on("message", msg => {
	if (msg.author.bot || msg.channel.type === "dm" || blacklist.includes(msg.author.id)) return

	if (!prefixes[msg.guild.id]) prefixes[msg.guild.id] = config.prefix

	if (!msg.content.startsWith(prefixes[msg.guild.id])) return

	if (!cooldowns.active[msg.author.id])
		cooldowns.active[msg.author.id] = []

	const command = msg.content.substring(prefixes[msg.guild.id].length + 1).toLowerCase().split(" ")[0]
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

	if (command === "givefuck") {

		++fucks
		msg.channel.send('Fucks given (From all users): ' + fucks)
	}

	if (command) {
		if (cooldowns.active[msg.author.id].includes(command))
			return msg.channel.send("This command is currently in cooldown.")
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

	superagent
		.post("https://bots.discord.pw/api/bots/270904126974590976/stats")
		.send({
			"server_count": count
		})
		.set("Authorization", config.pwtoken)
		.end()

	superagent
		.post("https://discordbots.org/api/bots/270904126974590976/stats")
		.send({
			"server_count": count
		})
		.set("Authorization", config.orgtoken)
		.end()



	prefixes[guild.id] = config.prefix


	fs.writeFile("./db/prefixdb.json", JSON.stringify(prefixes, "", "\t"), (err) => {
		if (err) return console.log(Date() + " createGuildHandler error: " + err)

	})


	let bots = guild.members.filter(gm => gm.user.bot).size
	let percentage = Math.round((bots / guild.members.size * 100))
	if (!whitelist.includes(guild.id) && percentage > 90 && bots > 20) {
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

client.on("guildDelete", async guild => {

	const guilds = await client.shard.fetchClientValues('guilds.size')
	const count = guilds.reduce((prev, val) => prev + val, 0)


	superagent
		.post("https://bots.discord.pw/api/bots/270904126974590976/stats")
		.send({
			"server_count": count
		})
		.set("Authorization", config.pwtoken)
		.end()

	superagent
		.post("https://discordbots.org/api/bots/270904126974590976/stats")
		.send({
			"server_count": count
		})
		.set("Authorization", config.orgtoken)
		.end()



	if (prefixes[guild.id]) {
		delete prefixes[guild.id];

		fs.writeFile("./db/prefixdb.json", JSON.stringify(prefixes, "", "\t"), (err) => {
			if (err) return console.log(Date() + " createGuildHandler error: " + err)

		})

	}


})

client.once("ready", () => {
	console.log(`[${new Date()}] ${client.user.username} loaded successfully.`)

	client.guilds.map(g => {
		if (!prefixes[g.id]) prefixes[g.id] = config.prefix
	})
	setTimeout(() => console.log('Shutting down in 30 minutes.'), 19800000)
	setTimeout(() => process.exit(), 21600000)


	fs.writeFileSync("./db/prefixdb.json", JSON.stringify(prefixes, "", "\t"))


})

process.on('unhandledRejection', err => console.error(`${Date()} Uncaught Promise Error: \n${err.stack}`));
