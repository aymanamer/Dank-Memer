exports.run = function (client, msg) {
    if (!msg.channel.permissionsFor(client.user.id).has("MANAGE_MESSAGES")) {
        return msg.author.send('I don\'t have permission to send pictures in #' + msg.channel.name).catch(console.error)
    }

    let num = parseInt(25)
    msg.channel.fetchMessages({
        limit: 100
    }).then(msgs => {
        let mga = msgs.array()
        mga = mga.filter(m => m.author.id === client.user.id)
        mga.length = num
        mga.map(m => m.delete().catch())
    })
}