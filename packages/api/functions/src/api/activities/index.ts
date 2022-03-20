import * as express from "express";
import firebaseApp from '../../firebaseApp';
import getActivitiesEndpoint from './getActivities';
import createActivityEndpoint from './createActivity';
import updateActivityEndpoint from './updateActivity';
import deleteActivityEndpoint from './deleteActivity';

export const router = express.Router();
const firestore = firebaseApp.firestore();

// Get all activities associated with user
getActivitiesEndpoint(router, firestore);
// Create new activity
createActivityEndpoint(router, firestore);
// Update existing activity
updateActivityEndpoint(router, firestore);
// Delete existing activity
deleteActivityEndpoint(router, firestore);

// Intercept un-matched routes
router.get("*", async (req: express.Request, res: express.Response) => {
	res.status(404).send("This route does not exist.");
});
