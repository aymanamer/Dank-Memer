const config = require('../config.json');
module.exports = {
    disabledEvents: {
        'CHANNEL_PINS_UPDATE': true,
        'USER_SETTINGS_UPDATE': true,
        'USER_NOTE_UPDATE': true,
        'RELATIONSHIP_ADD': true,
        'RELATIONSHIP_REMOVE': true,
        'GUILD_BAN_ADD': true,
        'GUILD_BAN_REMOVE': true,
        'TYPING_START': true
    },

    colors: {
        lightblue: '12054271',
        purple: '7869695',
        red: '16711680',
        green: '65280',
        blue: '255',
        black: '0',
        slate: '2500908',
        white: '16777215',
        yellow: '16250241'
    },

    roleIDs: {
        'base': '334171428649959447',
        '5': '344571417074991105',
        '10': '344571468715261952'
    },

    bannedWords: ['kys', 'hitler', 'nazi', 'kill your self', 'kill yourself', 'nigger', 'nagger', 'nigglet', 'faggot', 'benis', 'fag', 'anus', 'anal', 'blowjob', 'blow job', 'dyke', 'dildo', 'cock', 'boner', 'homo', 'jizz', 'nigga', 'queer', 'pussy', 'scrotum', 'slut', 'aetheryx', 'jews', 'cummy', 'niqquers', 'penis', 'gay', 'nibba', 'succ', 'fucc', 'ni🅱🅱a', 'niqqa'],

    intro: `My name is Dank Memer.\n\nTo get started, send \`${config.defaultPrefix} help\`. All commands are run this way, for example, pls meme.\n\nI am maintained by Melmsie#0006, who can be found at [this server](https://discord.gg/3GNMJBG) if you need to talk to him.`,

    randomColor: () => {
        const letters = '0123456789';
        let color = '';
        for (let i = 0; i < 7; i++) {
            color += letters[Math.floor(Math.random() * 10)];
        }

        return color;
    },

    randomInArray: (array) => {
        return array[Math.floor(Math.random() * array.length)];
    },

    codeblock: (str, lang) => {
        return `${'```'}${lang || ''}\n${str}\n${'```'}`;
    }
};