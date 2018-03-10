module.exports = class GenericCommand {
  constructor (fn, props) {
    this.fn = fn
    this.passedProps = props
  }

  async run ({ Memer, msg, args, addCD, cleanArgs }) {
    if (this.props.missingArgs && !args[0]) {
      return this.props.missingArgs
    }
    return this.fn({ Memer, msg, args, addCD, cleanArgs })
  }

  get props () {
    return Object.assign({
      usage: '{command}',
      cooldown: 500,
      isNSFW: false,
      ownerOnly: false
    }, this.passedProps, {
      perms: ['sendMessages'].concat(this.passedProps.perms || [])
    })
  }
}
