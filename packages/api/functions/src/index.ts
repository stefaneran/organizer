import * as functions from 'firebase-functions';
import initialize from './initialize';

// TODO - Make middleware to avoid repetition in verifying user, etc

const app = initialize();

export default functions.region('europe-west1').https.onRequest(app);