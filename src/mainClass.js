const utils = require('./utils/misc.js');
const fs = require('fs');
const cmdConfig = require('../cmdConfig.json');
class Memer {
    constructor (bot) {
        this.bot = bot;
    }

    launch () {
        this.log = require('./utils/logger.js');
        this.snek = require('snekfetch');
        this.r = require('rethinkdbdash')();
        this.db = require('./util/dbFunctions.js')(this.r);
        for (const i in Object.keys(utils)) {
            this[Object.keys(utils)[i]] = utils[Object.keys(utils)[i]];
        }
        this.bot
            .on('ready', this.ready)
            .on('guildCreate', this.guildCreate)
            .on('guildDelete', this.guildDelete)
            .on('messageCreate', this.messageCreate)
            .on('error', this.onError);
    }

    static ready () {
        this.bot.client.editStatus(null, {
            name: 'pls help',
            type: 1,
            url: 'https://www.twitch.tv/teamzars'
        });
    }

    static guildCreate (guild) {

    }

    static guildDelete (guild) {
        this.db.deleteGuild(guild.id);
        // postStats();
    }

    static messageCreate (msg) {

    }

    static onError (error) {

    }

    static async postStats () {
        const botlists = [
            ['https://bots.discord.pw/api/bots/270904126974590976/stats', Memer.config.pwtoken],
            ['https://discordbots.org/api/bots/270904126974590976/stats', Memer.config.orgtoken],
            ['https://www.carbonitex.net/discord/data/botdata.php', Memer.config.carbon]
        ];

        for (const i in botlists) {
            await this.snek
                .post(botlists[i][0])
                .set('Authorization', botlists[i][1])
                .send(botlists[i][0].includes('carbonitex') ? { 'servercount': Memer.client.guilds.size } : { 'server_count': Memer.client.guilds.size }) // matt plz
                .end();
        }
    }

    get commands () {
        const commands = fs.readdirSync('commands').join(' ').replace(/.js/g, '').split(' ');
        const aliases = Object.keys(cmdConfig.aliases);
        return commands.concat(aliases);
    }


}

module.exports = Memer;