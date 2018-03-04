
var enColor = [
  "{{color}} is one of my favorite colors as well.",
  "Oh yes, {{color}} can be quite striking.",
  "I can certainly understand why you like {{color}}.",
  {
    Criteria: "{{not (eq color favoriteColor)}}",
    Template: {
      Ssml: [
        "I don't know, I agree with you that {{favoriteColor}} ",
        "is nicer than {{color}}"
      ]
    }
  }
];

var enBlue = [
  "{{color}} is my absolute favorite color.",
  "I think there is something so striking about {{color}}"
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
exports.config = require('multivocal/lib/config-simple')( config );


var Multivocal = require('multivocal');
var Util       = require('multivocal/lib/util');

var buildEnvColor = function( env ){

  console.log('Parameter',env.Parameter);
  var color = Util.objPath( env, 'Parameter/color');

  var favoriteColor = Util.objPath( env, 'User/State/favoriteColor' );
  if( !favoriteColor && color ){
    favoriteColor = color;
    Util.setObjPath( env, 'User/State/favoriteColor', favoriteColor );
  }

  env.color = color;
  env.favoriteColor = favoriteColor;

  return Promise.resolve( env );
};

var handleColor = function( env ){
  var color = env.color;
  Util.setObjPath( env, 'Outent', `Outent.color.${color}` );

  return Multivocal.handleDefault( env );
};

exports.init = function(){
  Multivocal.addBuilder( buildEnvColor );
  Multivocal.addActionHandler( 'color', handleColor );
};