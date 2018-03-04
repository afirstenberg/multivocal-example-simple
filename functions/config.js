
var localUndResponseDefault = [
  {
    ShouldClose: true,
    Template:{
      Ssml: "I seem to be a little confused."
    }
  }
];

var enWelcome = [
  {Base:{Ref: 'Config/BaseLib/Welcome/First'}},
  "Welcome to Color Chat! We'll be talking about colors. What is your favorite?",

  {Base:{Ref: 'Config/BaseLib/Welcome/Returning'}},
  "Welcome back to Color Chat.",
  "Good to have you back at Color Chat.",
  {
    Criteria: "{{gt User.State.NumVisits 3}}",
    Template: {
      Ssml: "This is your {{ordinalize User.State.NumVisits}} visit to Color Chat."
    }
  },
  {
    Criteria: "{{gt User.State.NumVisits 5}}",
    Template: {
      Ssml: [
        "Wow! This is your {{ordinalize User.State.NumVisits}} visit to Color Chat. ",
        "Great to see you again."
      ]
    }
  }
];

var enUnknown = [
  {Base:{Ref: 'Config/BaseLib/Unknown/First'}},
  "I'm sorry, I didn't get that.",
  "Can you repeat that? I didn't understand.",

  {Base:{Ref: 'Config/BaseLib/Unknown/Repeat'}},
  "I'm sorry, but we were talking about colors, and I'm not sure I understand.",
  "I didn't hear a color there. Can you try that again please.",

  {Base:{Ref: 'Config/BaseLib/Unknown/Final'}},
  "I still didn't hear anything. Perhaps another time.",
  "I didn't hear a color. Hope you come back to play later."
];

var enQuit = [
  "Thanks for visiting! Hope to see you again.",
  "Hope you had fun. Let's do this again sometime.",
  "That was great. Don't be a stranger!"
];

var enSuffix =[
  "What other color are you thinking about?",
  "Tell me another color."
];

var conf = {
  Local: {
    en: {
      Response: {
        "Action.welcome":       enWelcome,
        "Action.input.unknown": enUnknown,
        "Action.quit":          enQuit
      },
      Suffix: {
        Default: enSuffix
      }
    },
    und: {
      Response: {
        Default: localUndResponseDefault
      }
    }
  }
};

var Simple = require('multivocal/lib/config-simple');
var Config = Simple(conf);
var ConfigStandard = Simple(require('multivocal/config/config-standard'));

//Config.get().then( o => console.log( 'Config', JSON.stringify(o, null, 1 ) ) );
//ConfigStandard.get().then( o => console.log( 'ConfigStandard', JSON.stringify(o, null, 1 ) ) );

module.exports = require('multivocal/lib/config-merge')([
  require('./color' ).config,
  Config,
  ConfigStandard
]);