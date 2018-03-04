const functions = require('firebase-functions');

const Config = require('./config.js');

const Multivocal = require('multivocal');
Multivocal.setConfig( Config );

const Color = require('./color.js');
Color.init();

exports.webhook = functions.https.onRequest( (req,res) => {
    Multivocal.process( req, res );
});
