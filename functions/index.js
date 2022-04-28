import Multivocal from 'multivocal'
import Util from 'multivocal/lib/util'

async function buildEnvColor( env ){
  // What color did the user mention
  const color = Util.objPath( env, 'Parameter/color');

  // What have they previously told us their favorite color was?
  let favoriteColor = Util.objPath( env, 'User/State/favoriteColor' );
  if( !favoriteColor && color ){
    // They didn't have a favorite color set, so remember this
    favoriteColor = color;
    Util.setObjPath( env, 'User/State/favoriteColor', favoriteColor );
  }

  // Store these in the environment
  env.color = color;
  env.favoriteColor = favoriteColor;

  return env
}

async function handleColor( env ){
  // Set our outent name based on the color they sent
  const color = env.color;
  Util.setObjPath( env, 'Outent', `Outent.color.${color}` );

  return Multivocal.handleDefault( env );
}

// Register functions
Multivocal.addBuilder( buildEnvColor );
Multivocal.addActionHandler( 'color', handleColor );

// Load our configuration from a Firestore db in the current project
// at a default location
new Multivocal.Config.Firestore()

exports.webhook = Multivocal.processFirebaseWebhook;
