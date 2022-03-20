import * as express from "express";
import firebaseApp from '../../firebaseApp';
import getContactsEndpoint from './getContacts';
import createContactEndpoint from './createContact';
import updateContactEndpoint from './updateContact';
import deleteContactEndpoint from './deleteContact';
import updateLastContactEndpoint from './updateLastContact';

export const router = express.Router();
const firestore = firebaseApp.firestore();

// Get all contacts for specific user
getContactsEndpoint(router, firestore);
// Create a new contact
createContactEndpoint(router, firestore);
// Update existing contact
updateContactEndpoint(router, firestore);
// Delete existing contact
deleteContactEndpoint(router, firestore);
// Updates the "lastContact" property of a contact to current time
updateLastContactEndpoint(router, firestore);

// Intercept un-matched routes
router.get("*", async (req: express.Request, res: express.Response) => {
	res.status(404).send("This route does not exist.");
});
