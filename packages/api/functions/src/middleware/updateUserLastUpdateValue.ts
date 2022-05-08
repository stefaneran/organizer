import * as express from 'express';
import firebaseApp from '../firebaseApp';

const firestore = firebaseApp.firestore();

const endpointsToSkip = ["get", "login"];

const routeMap = {
  recipes: 'lastRecipeUpdate',
  inventory: 'lastInventoryUpdate',
  activities: 'lastActivityUpdate',
  contacts: 'lastContactUpdate',
  events: 'lastContactUpdate'
}

async function updateUserLastUpdateValue(req: express.Request, res: express.Response, next) {
  const { userName, updateTimestamp } = req.body
  const userCollectionRef = firestore.collection("users");

  // Check if user exists
  const userDocument = await userCollectionRef.doc(userName).get();
  const user = userDocument.data();
  if (!user) {
    next()
    return
  }

  const endpointSplit = req.url.split('/');

  // Map router name to which module's last update property needs to be updated 
  const moduleName = endpointSplit[1];
  const endpointVerb = endpointSplit[endpointSplit.length - 1];
  const lastUpdateModule = routeMap[moduleName];

  // If not a valid module or endpoint
  if (!lastUpdateModule || !updateTimestamp || endpointsToSkip.includes(endpointVerb)) {
    next()
    return
  }

  // If user registration
  if (endpointVerb === "register") {
    // Initialize lastUpdate value for all modules
    await userCollectionRef.doc(userName).update({ 
      "lastActivityUpdate": updateTimestamp,
      "lastContactUpdate": updateTimestamp,
      "lastInventoryUpdate": updateTimestamp,
      "lastRecipeUpdate": updateTimestamp
    })
    next()
    return
  }

  // Otherwise proceed with the update
  await userCollectionRef.doc(userName).update({ [lastUpdateModule]: updateTimestamp })
  next()
}

export default updateUserLastUpdateValue;