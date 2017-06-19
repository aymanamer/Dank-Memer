
exports.run = function (client, msg, args) {

    if (args.includes("me")) return msg.reply('no you can do it yourself. Please tag someone else to kill.')
    if (!msg.mentions.users.first()) return msg.reply('please tag someone to kill.')

    let mention = msg.mentions.users.first().username
    let author = msg.author.username


    let kill = [`${author} slips bleach into ${mention}'s lemonade.`,
    `${mention} dies of natural causes.`,
    `${author} hired me to kill you, but I don't want to! ${mention}`,
    `${mention} slips on a banana peel and falls down the stairs.`,
    `${author} murders ${mention} with an axe.`,
    `${mention} dies in a horrible accident, and it was engineered by ${author}.`,
    `${mention} dies of starvation.`,
    `${author} decapitates ${mention} with a sword.`,
    `${author} challenges ${mention} to a fist fight to the death. ${mention} wins.`,
    `Sorry, ${author}, I don't like killing people.`,
    `${mention} dies after swallowing a toothpick.`,
    `${mention} was murdered by ${author} and everyone knows it, but there is no proof.`,
    `${author} kills ${mention} after hours of torture.`,
    `${mention} dies on death row via lethal injection after murdering ${author} and their family.`,
    `${mention} vocally opposed the Clintons and then suddenly disappeared.`,
    `${author} shoots ${mention} in the head.`,
    `${author}, are you sure you want to kill ${mention}? They seem nice to me.`,
    `${mention} lives, depsite ${author}'s murder attempt.`,
    `${mention} gets hit by a car.`,
    `${mention} gets struck by lightning.`,
    `${mention} reads memes till they die.`,
    `${mention} dies at the hands of ${author}.`,
    `${mention} has some bad chinese food, and pays the ultimate price.`,
    `${mention} chokes on cheerios and dies. What an idiot...`,
    `${mention} is killed by their own stupidity.`,
    `${mention} is killed in a robbery gone wrong.`,
    `${mention} is dead at the hands of ${author}.`,
    `${mention} can't be killed, as they are a ghost.`,
    `${mention} gets stabbed by ${author}`,
    `In a sudden turn of events, I **don't** kill ${mention}.`,
    `${mention} kills themself after realizing how dumb ${author} is.`,
    `${mention} bleeds out after trying to get on "Dumbest hillbilly moments".`,
    `${mention} is unkillable. Oh, wait, no, ${author} kills them anyway.`,
    `${author} strangles ${mention}.`,
    `After getting pushed into the ocean by ${author}, ${mention} is eaten by a shark.`,
    `${mention} dies.`, `After a struggle, ${mention} kills ${author}`,
    `${mention} is abducted by aliens, and the goverment kills them to cover it up.`,
    `${mention} got stepped on by an elephant.`, `${mention} died from eating too much ass.`,
    `${mention} died from shitting for 36 hours straight.`,
    `${mention} is so dumb that they choked on oxygen.`,
    `${mention} died from not eating enough ass.`,
    `${mention} died from doing the ice bucket challenge.`,
    `${mention} died from eating too much ass.`,
    `The bullet missed Harambe and hit ${mention} instead. Yay for harambe!`,
    `Aids, ${mention} died from aids.`,
    `${mention} died because remindmebot forgot to remind them to breathe`,
    `${mention} died due to eating WAY too many hotdogs in preparation for their date Friday night.`,
    `${mention} got into a knife fight with the pope. One of them is in hell now.`,
    `${mention} died from swallowing rocks too fast`,
    `${mention} accidentally clicked on a popup ad that reads "Doctors hate us, see the one best trick for dying today!"`,
    `${mention} died from ebola.`,
    `${mention} fell into a pit of angry feminists.`,
    `${mention} died from drinking too much water Huh, I guess it IS possible!.`,
    `${mention} died while playing hopscotch on *seemingly* deactivated land mines.`,
    `${mention} ripped their own heart out to show their love for ${author}.`,
    `${mention} died from too many sunburns.`,
    `${mention} died from a swift kick to the brain.`,
    `${mention} was eaten alive by ants`,
    `${mention} died after gaming for 90 hours straight without moving or eating.`,
    `${mention} tried to outrun a train, the train won.`,
    `${mention} killed themselves after seeing the normie memes that ${author} posts.`,
    `After raid of roblox kids entered the server, ${mention} died of cancer.`,
    `${mention} talked back to mods and got destroyed by the ban hammer.`,
    `${mention} cums in eye, goes blind, runs for help but ran straight onto train tracks and gets plowed by a train.`,
    `${mention} bought a fidget spinner and drowned in pussy.`,
    `${mention} died after trying to outmeme Dank Memer.`,
    `${mention} died from eating too much bread :/`,
    `${mention} died an honorable death. Death by snoo snoo.`,
    `${mention} tried to get famous on YouTube by livingstreaming something dumb. Skydiving while chained to a fridge.`,
    `${mention} was walking normally when out of the corner of their eye they saw someone do a bottle flip and dab causing ${mention} to have a stroke.`,
    `${mention} died from eating cactus needles.`,
    `${mention} died after playing with an edgy razor blade fidget spinner.`,
    `${mention} died because they started playing with a fidget spinner but they realise its 2016 so you start fapping to the old witch in snow white and obama starts mowing their lawn and they jump out of the window and get ripped to pieces by Obama's lawn mower`,
    `${mention} ate too many laxatives and drowned in their own shit. Ew.`,
    `${mention} drowned in their own tears.`,
    `${mention} died eating expired and infected raw fish with the filthiest rice in the world as sushi while being constantly stabbed in the scrotum with a 9inch nail sharp enough to stab through kevlar. The soy sauce was cat piss.`,
    `${mention} died of oversucc`,
    `${mention} accidentally tripped and died while getting up to write their suicide note.`,
    `${mention} died from whacking it too much. (There's a healthy balance, boys)`,
    `${mention} died from not whacking it enough. (There's a healthy balance, boys)`,
    `${author} kills ${mention} with their own foot.`,
    `${mention} dies of lack of friends.`,
    ]
    const {
        randomInArray
    } = require('../utils')

    try {
        msg.channel.send(randomInArray(kill))
    } catch (e) {
        console.log(Date() + " - " + e)
        msg.reply('no.')
    }

    
}