import * as admin from 'firebase-admin';
import * as serviceAccount from './permissions.json';

const firebaseConfig = {
  credential: admin.credential.cert({
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    projectId: serviceAccount.project_id
  }),
  databaseURL: "https://sem-organizer.firebaseio.com"
}

export default firebaseConfig;