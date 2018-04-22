
const Color = require('./color.js');
Color.init();

const Multivocal = require('multivocal');
exports.webhook = Multivocal.processFirebaseWebhook;
