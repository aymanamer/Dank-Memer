const {
  randomInArray
} = require('../utils')
const arrays = require('../assets/arrays.json')

exports.run = async function (client, msg) {
 
  try {
    const shitpost = await msg.channel.sendMessage(randomInArray(arrays.copy), {
      split: true
    })
   
  } catch (e) {
    console.log(Date() + e)
    msg.reply('no')
  }

}
