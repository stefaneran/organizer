import * as express from 'express';
import firebaseApp from '../firebaseApp';

const firestore = firebaseApp.firestore();

const endpointsToSkip = ["get", "login", "register"];

async function updateUserLastUpdateValue(req: express.Request, res: express.Response, next) {
  const { userName } = req.body
  const userCollectionRef = firestore.collection("users");

  // Check if user exists
  const userDocument = await userCollectionRef.doc(userName).get();
  const user = userDocument.data();
  if (!user) {
    console.log('===== NO USER')
    next()
    return
  }

  // Check if it's an endpoint that should be skipped
  const endpointSplit = req.url.split('/');
  const endpoint = endpointSplit[endpointSplit.length - 1];
  if (endpointsToSkip.includes(endpoint)) {
    console.log('===== SKIP ENDPOINT')
    next()
    return
  }

  console.log('===== SUCCESS')
  // Otherwise proceed with the update
  await userCollectionRef.doc(userName).update({ lastUpdate: Date.now() })
  next()
}

export default updateUserLastUpdateValue;