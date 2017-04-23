const config = require("./config.json")
const fs = require("fs")
statsdb  = require("./db/statsdb.json")
prefixes = {};
const {whitelist, blacklist} = require("./db/bwlist.json")
const superagent = require("superagent")
const Discord = require("discord.js")
const client = new Discord.Client({
	disableEveryone: true
})

client.login(config.token)

const commandsPath = "./commands"
let statuses = ["with dank memes", "with Melmsie", `with %u people`, `on %s servers`]
let index = 0

client.on("message", msg => {
	if (msg.author.bot || msg.channel.type === "dm" || blacklist.includes(msg.author.id)) return

	if (!prefixes[msg.guild.id]) prefixes[msg.guild.id] = config.prefix

	if (!msg.content.startsWith(prefixes[msg.guild.id])) return

	const command = msg.content.substring(prefixes[msg.guild.id].length + 1).toLowerCase().split(" ")[0]
	const args = msg.content.split(" ").slice(2)

	if (command === "eval") {
		if (msg.author.id !== config.owner) return
		try {
			const dank = eval(args.join(" "))
			msg.channel.sendCode("js", dank)
		} catch(e) {
			msg.channel.sendCode("js", e.message)
		}
	}

	try {
		delete require.cache[require.resolve("./commands/" + command)]
		require("./commands/" + command).run(client, msg, args, config, Discord)
		client.channels.get("303459884521881600").sendEmbed(new Discord.RichEmbed()
			.setTitle(`Command: ${command}`)
			.setDescription(`Server: ${msg.guild.name}`)
			.setColor("#7d5bbe")
			.setFooter(new Date())
		)

		if (!statsdb[command]) statsdb[command] = "0"
		statsdb[command]++
		statsdb["total"]++
		fs.writeFile("./db/statsdb.json", JSON.stringify(statsdb, "", "\t"), (err) => {
			if (err) return
		})
	} catch (e) {
		if (e.message.includes("Cannot find module")) return
		console.log(e)
	}
})

client.on("guildCreate", guild => {
	superagent
	.post("https://bots.discord.pw/api/bots/270904126974590976/stats")
	.send({"server_count": client.guilds.size})
	.set("Authorization", config.pwtoken)
	.end()

	superagent
	.post("https://discordbots.org/api/bots/270904126974590976/stats")
	.send({"server_count": client.guilds.size})
	.set("Authorization", config.orgtoken)
	.end()

	prefixes[guild.id] = config.prefix

/*
	fs.writeFile("./db/prefixdb.json", JSON.stringify(prefixes, "", "\t"), (err) => {
		if (err) return console.log(Date() + " createGuildHandler error: " + err)
		console.log(Date() + "Guild Joined, Prefix DB updated.")
	})
*/

	let bots = guild.members.filter(gm => gm.user.bot).size
	let users = guild.members.filter(gm => !gm.user.bot).size
	let percentage = Math.round((bots / guild.members.size * 100))
	if (!whitelist.includes(guild.id) && percentage > 70 && bots > 15) {
		client.channels.get("297554251452776458").sendEmbed(new Discord.RichEmbed()
			.setTitle("🤖 Joined Bot Guild 🤖")
			.setColor("#FFC93F")
			.setDescription(`Server: ${guild.name} | ${guild.id}`)
			.addField("Server Info", `Owner: ${guild.owner.displayName}#${guild.owner.user.discriminator}\nMembers: ${guild.members.size}\nUsers: ${users}\nBots: ${bots}\nPercentage: ${percentage}`)
			.setFooter(new Date())
		)
		guild.defaultChannel.send(`Thanks for trying to add ${client.user.username}, but our anti-bot guild protection system has flagged this server.\n\nIf you"d like to appeal that, join Melmsie"s Server and talk to him https://discord.gg/3GNMJBG`)
		.then(() => {
			guild.leave()
		})
		.catch(e => {
			console.log(e.message) // probably forbidden or something
		})
	} else if (blacklist.includes(guild.ownerID) || blacklist.includes(guild.id)) {
		client.channels.get("297554251452776458").sendEmbed(new Discord.RichEmbed()
			.setTitle("⚠ Joined Blacklisted Guild ⚠")
			.setColor("#FFC93F")
			.setDescription(`Server: ${guild.name} | ${guild.id}`)
			.addField("Server Info", `Owner: ${guild.owner.displayName}#${guild.owner.user.discriminator}\nMembers: ${guild.members.size}\nUsers: ${users}\nBots: ${bots}\nPercentage: ${percentage}`)
			.setFooter(new Date())
		)

		guild.defaultChannel.send(`Thanks for trying to add ${client.user.username}, but either this server or this server"s owner has been blacklisted.\n\nIf you"d like to appeal that, join Melmsie"s Server and talk to him https://discord.gg/3GNMJBG`)
		.then(() => {
			guild.leave()
		})
		.catch(e => {
			console.log(e.message) // probably forbidden or something
		})
	} else {
		client.channels.get("297554251452776458").sendEmbed(new Discord.RichEmbed()
			.setTitle("Joined Guild")
			.setColor("#00ff00")
			.setDescription(`Server: ${guild.name} | ${guild.id}`)
			.addField("Server Info", `Owner: ${guild.owner.displayName}#${guild.owner.user.discriminator}\nMembers: ${guild.members.size}\nUsers: ${users}\nBots: ${bots}\nPercentage: ${percentage}`)
			.setFooter(new Date())
		)

		guild.defaultChannel.sendEmbed(new Discord.RichEmbed()
			.setColor("#ffffff")
			.setTitle("Hello!")
			.setDescription(`My name is ${client.user.username}.\n\nTo get started, send \`pls help\`.\n\nI am maintained by Melmsie#8769, who adds new commands to me often!\n\nYou can change my prefix at any time with \`pls prefix <new prefix>\`\n\nHave a ｄａｎｋ day!`)
		).catch(e => {
			console.log(`Failed to send welcome message to ${guild.name}\n${e.message}`)
		})
	}
})

client.on("guildDelete", guild => {
	superagent
	.post("https://bots.discord.pw/api/bots/270904126974590976/stats")
	.send({"server_count": client.guilds.size})
	.set("Authorization", config.pwtoken)
	.end()


	superagent
	.post("https://discordbots.org/api/bots/270904126974590976/stats")
	.send({"server_count": client.guilds.size})
	.set("Authorization", config.orgtoken)
	.end()


	if (prefixes[guild.id]) {
		delete prefixes[guild.id];
		/*
		fs.writeFile("./db/prefixdb.json", JSON.stringify(prefixes, "", "\t"), (err) => {
			if (err) return console.log(Date() + " createGuildHandler error: " + err)
			console.log(Date() + "Guild Left, Prefix DB updated.")
		})
		*/
	}

	client.channels.get("297554251452776458").sendEmbed(new Discord.RichEmbed()
		.setTitle("Left Guild")
		.setColor("#FF0000")
		.setDescription(`Server: ${guild.name} | ${guild.id}`)
		.setFooter(new Date())
	)
})

client.once("ready", () => {
	console.log(`[${new Date()}] ${client.user.username} loaded successfully.`)

	client.guilds.map(g => {
		if (!prefixes[g.id]) prefixes[g.id] = config.prefix
	})

	fs.writeFileSync("./db/prefixdb.json", JSON.stringify(prefixes, "", "\t"))

	setInterval(function() {
        index = (index + 1) % statuses.length;
        this.user.setGame(statuses[index].replace('%s', client.guilds.size).replace('%u', client.users.size));
    }.bind(client), 20000)

})

process.on("unhandledRejection", err => {
	console.error(Date() + "\n" + err)
})
