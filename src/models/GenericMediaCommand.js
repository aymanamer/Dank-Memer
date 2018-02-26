const { get } = require('snekfetch')

const { GenericCommand } = require('.')

module.exports = class GenericMediaCommand {
  constructor (cmdProps) {
    this.cmdProps = cmdProps
  }

  async run ({ Memer, msg: { author }, addCD }) {
    const data = await get(this.props.reqURL, this.props.tokenKey && { headers: { key: Memer.config[this.props.tokenKey] } })
      .then(res => this.props.JSONKey ? res.body : res.text)
      .then(res => this.props.JSONKey ? res[this.props.JSONKey] : res)

    await addCD()
    return {
      title: this.props.title,
      image: { url: `${this.props.prependURL || ''}${data}` },
      footer: { text: `Requested by ${author.username}#${author.discriminator} | ${this.props.message || ''}` }
    }
  }

  get props () {
    return new GenericCommand(
      null,
      Object.assign({
        cooldown: 2000,
        perms: ['embedLinks']
      }, this.cmdProps)
    ).props
  }
}
