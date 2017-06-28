const prompt = require('prompt');
const fetch = require('snekfetch');
const token = 'MzI5MjEwNzU0MTgyMDIxMTIw.DDRzRQ._p9Y9r7KKLFAHR351uUZnlOqQGM'
const Discord = require('discord.js');
const client = new Discord.Client();
prompt.start();
fetch
    .post('https://discordapp.com/api/oauth2/applications')
    .set('authorization', token)
    .set('content-type', 'application/json')
    .send({ name: 'bdsdfsdffasda', desciption: '', icon: '' })
    .then(res => {
        fetch
            .post('https://discordapp.com/api/oauth2/applications/' + res.body.id + '/bot')
            .set('authorization', token)
            .set('content-type', 'application/json')
            .then(res => {
                console.log(res.body.token)
                console.log('discrim: ' + res.body.discriminator + '\n reroll or nah? enter with y / n')
                prompt.get(['confirmation'], function (err, cres) {
                    if (cres.confirmation === 'y') {
                        client.login(res.body.token)
                        client.once('ready', clientInit)
                    } else {
                        console.log('k')
                        return;
                    }
                })
            }).catch(errHandler)
    }).catch(errHandler)

function errHandler (err) {
    return console.log(err.body.message + err.body.retry_after ? `\nRetry after ${err.body.retry_after / 1000 / 60} minutes.` : '')
}

async function clientInit () {
    console.log(`Logged in as ${client.user.tag}.`)
    console.log('Fetching target username...')
    let res = await fetch
        .get(`https://raidforums.com/hoa/lul.php?user=f&discrim=${client.user.discriminator}`);
    let newUsername = /change your username to (.*?)\<br><br>/.exec(res.body.toString())[1]
    client.user.setUsername(newUsername).then(() => console.log('New username: ' + client.user.tag))
}