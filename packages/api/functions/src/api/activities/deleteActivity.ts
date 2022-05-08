import * as express from "express";
import getUserData from '../../utils/getUserData';
import verifyUser from '../../utils/verifyUser';

export async function deleteActivityService(
  firestore: FirebaseFirestore.Firestore,
  userName: string,
  activityId: string
) {
  // Delete activity from activities collection
  const activitiesCollectionRef = firestore.collection("activities");
  await activitiesCollectionRef.doc(activityId).delete();
  // Delete activity ID from user document
  const userCollectionRef = firestore.collection("users");
  const userDocument = await userCollectionRef.doc(userName).get();
  const activitiesIdsList = userDocument.data().activities;
  const updatedActivities = activitiesIdsList.filter(activity => {
    return activity !== activityId
  });
  await userCollectionRef.doc(userName).update({ 
    activities: updatedActivities
  })
}

function deleteActivityEndpoint(router: express.Router, firestore: FirebaseFirestore.Firestore) {
  router.post("/delete", async (req: express.Request, res: express.Response) => {
    try {
      const { userName, password, activityId } = req.body;
      const user = await getUserData(firestore, userName);
      if (!user) {
        throw new Error("Error: No such user");
      }
      verifyUser(user, password);
      // ------------------------------------------------------- //
      await deleteActivityService(firestore, userName, activityId);
      // ------------------------------------------------------- //
      return res.status(200).send();
    } catch (e) {
      return res.status(500).send(e);
    }
  });
}

export default deleteActivityEndpoint;