const utils = require('./utils/misc.js');
const fs = require('fs');
const msgHandler = require('./handlers/msgHandler.js');

class Memer {
    constructor (bot) {
        this.bot = bot;
        this.log = require('./utils/logger.js');
        this._snek = require('snekfetch');
        this._join = require('path').join;
        this.config = require('./config.json');
        this.r = require('rethinkdbdash')();
        this.db = require('./utils/dbFunctions.js')(this.r);
        this.cmds = new Map();
        this.aliases = new Map();
        this.tags = new Map();

        for (const i in Object.keys(utils)) {
            this[Object.keys(utils)[i]] = utils[Object.keys(utils)[i]];
        }
    }

    launch () {
        this.bot
            .on('ready', this.ready.bind(this))
            .on('guildCreate', this.guildCreate.bind(this))
            .on('guildDelete', this.guildDelete.bind(this))
            .on('messageCreate', this.messageCreate.bind(this))
            .on('error', this.onError.bind(this));

        this.ready();
        this.loadCommands();
    }

    ready () {
        this.bot.editStatus(null, {
            name: 'pls help',
            type: 1,
            url: 'https://www.twitch.tv/teamzars'
        });
    }

    loadCommands () {
        const path = './commands';
        fs.readdir(path, (error, files) => {
            if (error) {
                return this.log(error.stack, 'error');
            }

            files.forEach(file => {
                if (file === 'temp') return
                try {
                    const command = require(this._join(__dirname, path, file));
                    this.cmds.set(command.props.name, command);
                    command.props.aliases.forEach(alias => {
                        this.aliases.set(alias, command.props.name);
                    });
                } catch (error) {
                    this.log(`Failed to load command ${file}:\n${error.stack}`, 'error');
                }
            });
        });

        const tags = require('./tags.json');
        Object.keys(tags).forEach(tag => {
            this.tags.set(tag, tags[tag]);
        });
    }

    guildCreate (guild) {
        const embed = {
            color: Memer.colors.lightblue,
            title: 'Hello!',
            description: Memer.intro
        };
        guild.channels.get(guild.channels.filter(c => c.type === 0).map(c => c.id)[0]).createMessage({ embed })
            .catch(() => {});
        // this.postStats();
    }

    guildDelete (guild) {
        this.db.deleteGuild(guild.id);
        // this.postStats();
    }

    get defaultGuildConfig () {
        return {
            prefix: this.config.defaultPrefix,
            disabledCommands: []
        };
    }

    async messageCreate (msg) {
        if (!msg.channel.guild ||
        msg.author.bot/* ||
        Memer.ids.blocked.user.includes(msg.author.id) || blocked will have to be moved to db because of multiprocess
        Memer.ids.blocked.guild.includes(msg.channel.guild.id)*/
    ) {
            return;
        }

        this.log(this.config);

        const gConfig = await this.db.getGuild(msg.channel.guild.id) || this.defaultGuildConfig;
        
        if (msg.mentions.find(m => m.id === this.bot.user.id) && msg.content.toLowerCase().includes('help')) {
            return msg.channel.createMessage(`Hello, ${msg.author.username}. My prefix is \`${gConfig.prefix}\`. Example: \`${gConfig.prefix} meme\``);
        }
        this.log(gConfig.prefix + msg.content.toLowerCase())
        if (msg.content.toLowerCase().startsWith(gConfig.prefix)) {
            this.log('2')
            msgHandler.handleMeDaddy(this, msg, gConfig);
        }
    }

    onError (error) {
        this.log(error.stack, 'error');
    }

    async postStats () {
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

    get cmdConfig () {
        return cmdConfig;
    }


}

module.exports = Memer;