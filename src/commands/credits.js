const { GenericCommand } = require('../models/')

const developers = [
  'Melmsie#0001',
  'Aetheryx#2222',
  'CyberRonin#5517'
]
const contributors = [
  'Kromatic#0420'
]

const staff = [
  'Kromatic',
  'Lizard',
  'Squidaddy',
  'xXBuilderBXx',
  'Akko'
]

module.exports = new GenericCommand(
  () => ({
    title: 'Dank Memer Credits',
    fields: [
      { name: 'Developers', value: developers.join('\n') },
      { name: 'Contributors', value: contributors.join('\n') },
      { name: 'Support Server Staff', value: staff.join('\n') }
    ]
  }), {
    triggers: ['credits', 'helpers'],
    description: 'Thanks to all of you!',
    perms: ['embedLinks']
  }
)
