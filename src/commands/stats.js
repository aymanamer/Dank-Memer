exports.run = async function (Memer, msg) {
    const stats = await Memer.db.getStats();
    await msg.channel.createMessage({ embed: {
        color: '5881576',
        fields: [
            {
                name: '-------------------------------------- Technical ---------------------------------------',
                value: '```\n' +
                `Uptime          |   ${Memer.parseTime(process.uptime())}\n` +
                `Heap Used       |   ${stats.totalRam}MB\n` +
                `Ping            |   ${msg.channel.guild.shard.latency.toFixed()}ms\n` +
                `Build           |   v${Memer.version}\n` +
                '\n```'
            },
            {
                name: '--------------------------------------- Statistics --------------------------------------',
                value: '```\n' +
                `Guilds          |   ${stats.guilds}\n` +
                `Users           |   ${stats.users}\n` +
//                `Large Guilds    |   ${Memer.bot.guilds.filter(m => m.large).length}\n` +
//                `Exclusivity     |   ${Memer.bot.guilds.filter(g => g.members.filter(m => m.bot).length === 1).length}\n`+
                '\n```'
            },
            {
                name: '-------------------------------------- Other Info --------------------------------------',
                value: '```\n' +
                `Node Version    |   ${process.version}\n` +
                `Dependencies    |   ${Object.keys(Memer.package.dependencies).length}\n` +
                `Platform        |   ${process.platform}\n` +
                '\n```'
            }
        ]
    }});
};

exports.props = {
    name        : 'stats',
    usage       : '{command}',
    aliases     : ['info'],
    cooldown    : 1000,
    description : 'blah'
};