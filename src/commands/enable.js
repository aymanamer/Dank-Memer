exports.run = async function (Memer, msg, args) {
    if (!msg.member.permission.has('manageGuild')) {
        return Memer.reply('You are not authorized to use this command. ', msg);
    }
    const gConfig = await Memer.db.getGuild(msg.channel.guild.id) || await Memer.db.createGuild(msg.channel.guild.id);
    args = removeDuplicates(args);
    args = args.map(arg => {
        if (Memer.aliases.has(arg)) {
            return Memer.aliases.get(arg);
        } else {
            return arg;
        }
    });
    if (!args[0]) {
        return Memer.reply(`Specify a command to enable, or multiple.\n\nExample: \`${gConfig.prefix} enable meme trigger shitsound\` or \`${gConfig.prefix} enable meme\``, msg);
    }
    if (args.some(cmd => !Memer.cmds.has(cmd) && !Memer.aliases.has(cmd))) {
        Memer.reply(`The following commands are invalid: \n\n${args.filter(cmd => !Memer.commands.includes(cmd) && !Memer.aliases.has(cmd)).map(cmd => `\`${cmd}\``).join(', ')}\n\nPlease make sure all of your commands are valid and try again.`, msg);
    }
    if (args.some(cmd => !gConfig.disabledCommands.includes(cmd))) {
        return msg.channel.createMessage(`The following commands currently aren't disabled: \n\n${args.filter(cmd => !gConfig.disabledCommands.includes(cmd)).map(cmd => `\`${cmd}\``).join(', ')}  \n\nPlease make sure all of your arguments are valid and try again.`);
    }
    args.map(cmd => {
        gConfig.disabledCommands.splice(gConfig.disabledCommands.indexOf(cmd), 1);
    });
    await Memer.db.updateGuild(gConfig);
    Memer.reply(`The following commands have been enabled successfully:\n\n${args.map(cmd => `\`${cmd}\``).join(', ')}`, msg);
};

function removeDuplicates (arr) {
    return Array.from(new Set(arr).values());
}

exports.props = {
    name        : 'enable',
    usage       : '{command}',
    aliases     : [],
    cooldown    : 1,
    description : ''
};