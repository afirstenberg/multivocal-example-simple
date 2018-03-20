const functions = require('firebase-functions');

const Multivocal = require('multivocal');
const Color = require('./color.js');
Color.init();

exports.webhook = functions.https.onRequest( (req,res) => {
    Multivocal.process( req, res );
});
