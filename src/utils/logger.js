function logger (message, type = 'log') {
  const date = Date().toString().split(' ').slice(1, 5).join(' ')
  process.send({ type, msg: `[${date}] ${message}` })
}
global.console.error = (str) => { logger(`Rethink log: ${str}`, 'warn') } // rethinkdb automatically sends any information to console.error
module.exports = logger
