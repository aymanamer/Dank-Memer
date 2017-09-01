function logger (message, type = 'log') {
    const date = Date().toString().split(' ').slice(1, 5).join(' ');
    process.send({ type, msg: `${date} ${message}` });
}

module.exports = logger;