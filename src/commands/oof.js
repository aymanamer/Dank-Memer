const { GenericVoiceCommand } = require('../models/')

module.exports = new GenericVoiceCommand({
  triggers: ['oof', 'roblox'],
  description: 'For all you roblox fans out there',

  reaction: '💀',
  existingConn: 'I only have one pet ghost, dude. Please wait until the current sound is done, you assbutt',
  dir: 'oof',
  files: 'oof',
  ext: 'mp3'
})
