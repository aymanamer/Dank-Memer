exports.handleMeDaddy = async function (Memer, msg, gConfig) {
    let command = msg.content.slice(gConfig.prefix.length + 1).toLowerCase().split(' ')[0];
    const args = msg.cleanContent.split(' ').slice(gConfig.prefix.split(' ').length + 1);

    if (Memer.cmds.has(command)) {
        command = Memer.cmds.get(command);
    } else if (Memer.aliases.has(command)) {
        command = Memer.commands.get(Memer.aliases.get(command));
    } else if (Memer.tags.has(command)) {
        const tag = Memer.tags.get(command);
        if (args[0] === 'info') {
            await msg.channel.createMessage({ embed: {
                color: Memer.colors.lightblue,
                thumbnail: { url: tag.img },
                description: tag.info,
                footer: { text: 'brought to you by knowyourmeme.com' }
            }});
        } else {
            const res = await Memer._snek.get(tag.img);
            await msg.channel.createMessage('', { file: res.body, name: 'hi.png' });
        }
        return;
    }

    if (!command.run || gConfig.disabledCommands.includes(command)) {
        return;
    }

    const cooldown = await Memer.db.getCooldown(command.props.name, msg.author.id);
    Memer.log(cooldown);
    if (cooldown > Date.now()) {
        return msg.channel.createMessage(`u got 2 wait ${(cooldown - Date.now()) / 1000} seconds`);
    }
    await Memer.db.addCooldown(command, msg.author.id);

    try {
        if (!msg.channel.permissionsOf(Memer.bot.user.id).has('sendMessages') ||
        !msg.channel.permissionsOf(Memer.bot.user.id).has('embedLinks') ||
        !msg.channel.permissionsOf(Memer.bot.user.id).has('attachFiles') ||
        !msg.channel.permissionsOf(Memer.bot.user.id).has('addReactions')) {
            return;
        }
        await command.run(Memer, msg, args);
    } catch (e) {
        return Memer.log(`Command error:\n\tCommand: ${command.props.name}\n\tSupplied arguments: ${args.join(', ')}\n\tError: ${e.stack}`, 'error');
    }
};
