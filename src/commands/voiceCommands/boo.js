const { GenericVoiceCommand } = require('../../models/')

module.exports = new GenericVoiceCommand({
  triggers: ['boo', 'scare', 'jumpscare'],
  description: 'AHHHHH SCARY',

  existingConn: 'I only have one pet ghost, dude. Please wait until the current sound is done, you assbutt',
  dir: 'scares',
  reaction: '👻',
  files: 5
})
