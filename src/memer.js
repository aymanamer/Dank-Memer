const config = require('./config.json');

const Sharder = require('eris-sharder');
const master = new Sharder(config.token, '/mainClass.js', {
    stats: true,
    webhooks: {

    }
});

const snek = require('snekfetch');
const botlists = new Map([
    ['https://bots.discord.pw/api/bots/270904126974590976/stats', config.pwtoken],
    ['https://discordbots.org/api/bots/270904126974590976/stats', config.orgtoken],
    ['https://www.carbonitex.net/discord/data/botdata.php', config.carbon]
]);

master.on('stats', res => {
    return;
    botlists.forEach(async (token, url) => {
        await snek
            .post(url)
            .set('Authorization', token)
            .send({ [`server${url.includes('carbonitex') ? '_' : ''}count`] : res.guilds }) // matt plz
            .end();
    });
});
