const config = require('./config.json')
const snekfetch = require('snekfetch')
const Discord = require('discord.js')
const client = new Discord.Client({
	disableEveryone: true,
	disabledEvents: ['CHANNEL_PINS_UPDATE', 'USER_SETTINGS_UPDATE', 'USER_NOTE_UPDATE', 'RELATIONSHIP_ADD', 'RELATIONSHIP_REMOVE', 'GUILD_BAN_ADD', 'GUILD_BAN_REMOVE', 'MESSAGE_UPDATE', 'MESSAGE_DELETE_BULK', 'MESSAGE_REACTION_REMOVE', 'MESSAGE_REACTION_REMOVE_ALL']
})