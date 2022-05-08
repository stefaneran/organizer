import * as express from "express";
import getUserData from '../../utils/getUserData';
import verifyUser from '../../utils/verifyUser';

export async function updateActivityService(
  firestore: FirebaseFirestore.Firestore,
  activityId: string,
  activity: any
) {
  const activityDocRef = firestore.collection("activities");
  await activityDocRef.doc(activityId).set(activity);
}

function updateActivityEndpoint(router: express.Router, firestore: FirebaseFirestore.Firestore) {
  router.post("/update", async (req: express.Request, res: express.Response) => {
    try {
      const { userName, password, activityId, activity } = req.body;
      const user = await getUserData(firestore, userName);
      if (!user) {
        throw new Error("Error: No such user");
      }
      verifyUser(user, password);
      // ------------------------------------------------------- //
      await updateActivityService(firestore, activityId, activity);
      // ------------------------------------------------------- //
      return res.status(200).send();
    } catch (e) {
      return res.status(500).send(e);
    }
  });
}

export default updateActivityEndpoint;