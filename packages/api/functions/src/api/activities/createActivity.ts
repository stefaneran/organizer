import * as express from "express";
import getUserData from '../../utils/getUserData';
import verifyUser from '../../utils/verifyUser';

export async function createActivityService(
  firestore: FirebaseFirestore.Firestore, 
  userName: string,
  activityId: string,
  activity: any
) {
  // Create new activity in activities collection
  const activitiesCollectionRef = firestore.collection("activities");
  await activitiesCollectionRef.doc(activityId).create(activity);
  // Add activity to user document
  const userCollectionRef = firestore.collection("users");
  const userDocument = await userCollectionRef.doc(userName).get();
  const activitiesIdsList = userDocument.data().activities;
  await userCollectionRef.doc(userName).update({ 
    activities: [...activitiesIdsList, activityId]
  })
}

function createActivityEndpoint(router: express.Router, firestore: FirebaseFirestore.Firestore) {
  router.post("/create", async (req: express.Request, res: express.Response) => {
    try {
      const { userName, password, activityId, activity } = req.body;
      const user = await getUserData(firestore, userName);
      if (!user) {
        throw new Error("Error: No such user");
      }
      verifyUser(user, password);
      // ------------------------------------------------------- //
      await createActivityService(firestore, userName, activityId, activity);
      // ------------------------------------------------------- //
      return res.status(201).send();
    } catch (e) {
      return res.status(500).send(e);
    }
  });
}

export default createActivityEndpoint;