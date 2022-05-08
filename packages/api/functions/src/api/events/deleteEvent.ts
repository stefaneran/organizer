import * as express from "express";
import getUserData from '../../utils/getUserData';
import verifyUser from '../../utils/verifyUser';

export async function deleteEventService(
  firestore: FirebaseFirestore.Firestore,
  userName: string,
  eventId: string
) {
  // Delete event from events collection
  const eventsCollectionRef = firestore.collection("events");
  await eventsCollectionRef.doc(eventId).delete();
  // Delete event ID from user document
  const userCollectionRef = firestore.collection("users");
  const userDocument = await userCollectionRef.doc(userName).get();
  const eventsIdsList = userDocument.data().events;
  const updatedList = eventsIdsList.filter(event => {
    return event !== eventId
  });
  await userCollectionRef.doc(userName).update({ 
    events: updatedList
  })
}

function deleteEventEndpoint(router: express.Router, firestore: FirebaseFirestore.Firestore) {
  router.post("/delete", async (req: express.Request, res: express.Response) => {
    try {
      const { userName, password, eventId } = req.body;
      const user = await getUserData(firestore, userName);
      if (!user) {
        throw new Error("Error: No such user");
      }
      verifyUser(user, password);
      // ------------------------------------------------------- //
      await deleteEventService(firestore, userName, eventId);
      // ------------------------------------------------------- //
      return res.status(200).send();
    } catch (e) {
      return res.status(500).send(e);
    }
  });
}

export default deleteEventEndpoint;