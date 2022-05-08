import * as express from "express";
import getUserData from '../../utils/getUserData';
import verifyUser from '../../utils/verifyUser';

export async function updateEventService(
  firestore: FirebaseFirestore.Firestore,
  eventId: string, 
  event: any
) {
  const eventDocRef = firestore.collection("events");
  await eventDocRef.doc(eventId).set(event);
}

function updateEventEndpoint(router: express.Router, firestore: FirebaseFirestore.Firestore) {
  router.post("/update", async (req: express.Request, res: express.Response) => {
    try {
      const { userName, password, eventId, event } = req.body;
      const user = await getUserData(firestore, userName);
      if (!user) {
        throw new Error("Error: No such user");
      }
      verifyUser(user, password);
      // ------------------------------------------------------- //
      await updateEventService(firestore, eventId, event);
      // ------------------------------------------------------- //
      return res.status(200).send();
    } catch (e) {
      return res.status(500).send(e);
    }
  });
}

export default updateEventEndpoint;