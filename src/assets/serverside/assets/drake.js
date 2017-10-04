const Jimp = require('jimp')

exports.run = (URL) => {
  return new Promise(async(resolve, reject) => {
    try {
      URL = JSON.parse(URL)
    } catch (e) {
      return reject('Unable to parse data-src')
    }
    if (URL.length < 2) { return reject('data-src must be an array of 2 strings (URLs)') }

    const [avatar, author] = await Promise.all([
      Jimp.read(URL[0]),
      Jimp.read(URL[1])
    ]).catch(reject)
    const drake = await Jimp.read('./resources/drake/drake.png').catch(err => {
      reject(err)
    })

    avatar.resize(260, 250)
    author.resize(260, 250)
    drake.resize(500, 500)
    drake.composite(author, 240, 250)
    drake.composite(avatar, 240, 0)
    drake.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
      if (err) { return reject(err) }
      resolve(buffer)
    })
  })
}
