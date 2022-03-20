import * as admin from 'firebase-admin';
import firebaseConfig from './config';

const firebaseApp = admin.initializeApp(firebaseConfig);

export default firebaseApp;