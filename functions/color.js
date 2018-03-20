
var enColor = [
  "{{color}} is one of my favorite colors as well.",
  "Oh yes, {{color}} can be quite striking.",
  "I can certainly understand why you like {{color}}.",
  {
    Criteria: "{{not (eq color favoriteColor)}}",
    Template: {
      Text: [
        "I don't know, I agree with you that {{favoriteColor}} ",
        "is nicer than {{color}}."
      ]
    }
  }
];

var enBlue = [
  "{{color}} is my absolute favorite color.",
  "I think there is something so striking about {{color}}."
];

var config = {
  Local: {
    en: {
      Response: {
        "Action.color":      enColor,
        "Outent.color.blue": enBlue
      }
    }
  }
};

var Multivocal = require('multivocal');
var Util       = require('multivocal/lib/util');

var buildEnvColor = function( env ){

  // What color did the user mention
  var color = Util.objPath( env, 'Parameter/color');

  // What have they previously told us their favorite color was?
  var favoriteColor = Util.objPath( env, 'User/State/favoriteColor' );
  if( !favoriteColor && color ){
    // They didn't have a favorite color set, so remember this
    favoriteColor = color;
    Util.setObjPath( env, 'User/State/favoriteColor', favoriteColor );
  }

  // Store these in the environment
  env.color = color;
  env.favoriteColor = favoriteColor;

  return Promise.resolve( env );
};

var handleColor = function( env ){
  // Set our outent name based on the color they sent
  var color = env.color;
  Util.setObjPath( env, 'Outent', `Outent.color.${color}` );

  return Multivocal.handleDefault( env );
};

exports.init = function(){
  // Load / register our configurations
  require('./config' );
  new Multivocal.Config.Simple( config );

  // Register functions
  Multivocal.addBuilder( buildEnvColor );
  Multivocal.addActionHandler( 'color', handleColor );
};
