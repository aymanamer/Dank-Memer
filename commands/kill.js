exports.run = function (client, msg, args) {
    let mention = msg.mentions.users.first()
    let author = msg.author.username
    let kill = [`${author} slips bleach into ${mention}'s lemonade.`, `${mention} dies of natural causes.`, `${author} hired me to kill you, but I don't want to! ${mention}`, `${mention} slips on a banana peel and falls down the stairs.`, `${author} murders ${mention} with an axe.`, `${mention} dies in a horrible accident, and it was engineered by ${author}.`, `${mention} dies of starvation.`, `${author} decapitates ${mention} with a sword.`, `${author} challenges ${mention} to a fist fight to the death. ${mention} wins.`, `Sorry, ${author}, I don't like killing people.`, `${mention} dies after swallowing a toothpick.`, `${mention} was murdered by ${author} and everyone knows it, but there is no proof.`, `${author} kills ${mention} after hours of torture.`, `${mention} dies on death row via lethal injection after murdering ${author} and their family.`, `${mention} vocally opposed the Clintons and then suddenly disappeared.`, `${author} shoots ${mention} in the head.`, `${author}, are you sure you want to kill ${mention}? They seem nice to me.`, `${mention} lives, depsite ${author}'s murder attempt.`, `${mention} gets hit by a car.`, `${mention} gets struck my lightning.`, `${mention} reads memes till they die.`, `${mention} dies at the hands of ${author}.`, `${mention} has some bad chinese food, and pays the ultimate price.`, `${mention} chokes on cheerios and dies. What an idiot...`, `${mention} is killed by their own stupidity.`, `${mention} is killed in a robbery gone wrong.`, `${mention} is dead at the hands of ${author}.`, `${mention} can't be killed, as they are a ghost.`, `${mention} gets stabbed by ${author}`, `In a sudden turn of events, I **don't** kill ${mention}.`, `${mention} kills themself after realizing how dumb ${author} is.`, `${mention} bleeds out after trying to get on "Dumbest hillbilly moments".`, `${mention} is unkillable. Oh, wait, no, ${author} kills them anyway.`, `${author} strangles ${mention}.`, `After getting pushed into the ocean by ${author}, ${mention} is eaten by a shark.`, `${mention} dies.`, `After a struggle, ${mention} kills ${author}`, `${mention} is abducted by aliens, and the goverment kills them to cover it up.`, `${mention} got stepped on by an elephant.`, `${mention} died from eating too much ass.`]
    const {
        randomInArray
    } = require('../utils')
    if (!mention) return msg.reply('Please tag someone to kill.')
    try {
        msg.channel.sendMessage(randomInArray(kill))
    } catch (e) {
        console.log(Date() + " - " + e)
        msg.reply('no.')
        //   ${msg.author.username}
    }

}