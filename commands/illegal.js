exports.run = function (client, msg, args) {

    const needle = require('needle');

    let options = {
        headers: {
            "Api-Key": "192aa6cf36a84f69ac3f0435b8676ddf"
        }
    }
   needle.get("https://martmists.com/api/v2/illegal?query=" + args.join(" "), options, (err, res) => {
        msg.channel.sendFile(res.body, "illegal.gif")
        .catch(err => {
    
    msg.channel.send("I couldn't make that illegal. You know what should be illegal? Trump's toupee.")
});
    })
    

}
