exports.run = function (client, msg, args) {
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