const config = require('./config.json');

const Sharder = require('eris-sharder');
const sharder = new Sharder(config.token, '/mainClass.js', { stats: true });