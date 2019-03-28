
var localUndResponseDefault = [
  {
    ShouldClose: true,
    Template:{
      Text: "I seem to be a little confused."
    }
  }
];

var enWelcomeFirst = [
  "Welcome to Color Chat! We'll be talking about colors. What is your favorite?"
];

var enWelcomeNewbie = [
  "Welcome back to Color Chat.",
  "Good to have you back at Color Chat.",
];

var enWelcome = [
  "This is your {{ordinalize User.State.NumVisits}} visit to Color Chat.",

  {
    Criteria: "{{gt User.State.NumVisits 10}}",
    Template: {
      Text: [
        "Wow! This is your {{ordinalize User.State.NumVisits}} visit to Color Chat. ",
        "Great to see you again."
      ]
    }
  }
];

var enUnknown1 = [
  "I'm sorry, I didn't get that.",
  "Can you repeat that? I didn't understand.",
];

var enUnknown2 = [
  "I'm sorry, but we were talking about colors, and I'm not sure I understand.",
  "I didn't hear a color there. Can you try that again please.",
];

var enUnknown = [
  {
    Base: {Set:true},
    ShouldClose: true
  },
  "I still didn't hear anything. Perhaps another time.",
  "I didn't hear a color. Hope you come back to play later."
];

var enRepeat = [
  "Sorry about that, let me try again.",
  "I said:"
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
        "Action.multivocal.welcome.1": enWelcomeFirst,
        "Action.multivocal.welcome.2": enWelcomeNewbie,
        "Action.multivocal.welcome":   enWelcome,
        "Action.multivocal.unknown.1": enUnknown1,
        "Action.multivocal.unknown.2": enUnknown2,
        "Action.multivocal.unknown":   enUnknown,
        "Action.multivocal.repeat":    enRepeat,
        "Action.multivocal.quit":      enQuit
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
  },
  Package: require('./package.json')
};

const Multivocal = require('multivocal');
var Config = new Multivocal.Config.Simple(conf);
module.exports = Config;
