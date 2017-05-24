const Dickpunch = require("discord.js")
const GetYourOwnToken = require("./config.json").token

let shard = new Dickpunch.ShardingManager("./memedaddy.js", { token: GetYourOwnToken })

shard.spawn(5)

shard.on("launch", s => {
    console.log("SHARD LAUNCHED: " + s.id)
})