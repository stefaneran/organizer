import * as express from "express";
import getUserData from '../../utils/getUserData';
import verifyUser from '../../utils/verifyUser';
import getDataByIDList from '../../core/getDataByIDList';

export async function getActivitiesService(firestore: FirebaseFirestore.Firestore, userName: string) {
  return await getDataByIDList(firestore, userName, "activities");
}

function getActivitiesEndpoint(router: express.Router, firestore: FirebaseFirestore.Firestore) {
  router.post("/get", async (req: express.Request, res: express.Response) => {
    try {
      const { userName, password } = req.body;
      const user = await getUserData(firestore, userName);
      if (!user) {
        throw new Error("Error: No such user");
      }
      verifyUser(user, password);
      // ------------------------------------------------------- //
      const activitiesData = await getActivitiesService(firestore, userName);
      // ------------------------------------------------------- //
      return res.status(200).send(activitiesData);
    } catch (e) {
      return res.status(500).send(e);
    }
  });
}

export default getActivitiesEndpoint;