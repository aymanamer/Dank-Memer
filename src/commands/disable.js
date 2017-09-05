exports.run = async function (Memer, msg, args) {
    if (!msg.member.permission.has('manageGuild')) {
        return msg.reply('You are not authorized to use this command.');
    }
    const gConfig = await Memer.db.getGuild(msg.channel.guild.id) || await Memer.db.createGuild(msg.channel.guild.id);
    args = Memer.removeDuplicates(args);
    args = args.map(arg => {
        if (Memer.aliases.has(arg)) {
            return Memer.aliases.get(arg);
        } else {
            return arg;
        }
    }).filter(cmd => !gConfig.disabledCommands.includes(cmd));
    if (!args[0]) {
        return msg.reply(`Specify a command to disable, or multiple.\n\nExample: \`${gConfig.prefix} disable meme trigger shitsound\` or \`${gConfig.prefix} disable meme\``);
    }
    if (args.some(cmd => !Memer.cmds.has(cmd))) {
        return msg.reply(`The following commands are invalid: \n\n${args.filter(cmd => !Memer.cmds.has(cmd)).map(cmd => `\`${cmd}\``).join(', ')}\n\nPlease make sure all of your commands are valid and try again.`);
    }
    gConfig.disabledCommands = gConfig.disabledCommands.concat(args);
    await Memer.db.updateGuild(gConfig);
    msg.reply(`The following commands have been disabled successfully:\n\n${args.map(cmd => `\`${cmd}\``).join(', ')}`);
};

exports.props = {
    name        : 'disable',
    usage       : '{command} <commands to disable>',
    aliases     : [],
    cooldown    : 1000,
    description : 'Use this command to disable commands you do not wish for your server to use'
};