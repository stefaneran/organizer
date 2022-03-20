import * as express from "express";
import firebaseApp from '../../firebaseApp';
import getEventsEndpoint from './getEvents';
import createEventEndpoint from './createEvent';
import updateEventEndpoint from './updateEvent';
import deleteEventEndpoint from './deleteEvent';

export const router = express.Router();
const firestore = firebaseApp.firestore();

// Get all events for a specific user
getEventsEndpoint(router, firestore);
// Create new event
createEventEndpoint(router, firestore);
// Update existing event
updateEventEndpoint(router, firestore);
// Delete existing event
deleteEventEndpoint(router, firestore);

// Intercept un-matched routes
router.get("*", async (req: express.Request, res: express.Response) => {
	res.status(404).send("This route does not exist.");
});
