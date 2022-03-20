import * as express from "express";
import getUserData from '../../utils/getUserData';
import verifyUser from '../../utils/verifyUser';

export async function createEventService(
  firestore: FirebaseFirestore.Firestore, 
  userName: string, 
  eventId: string,
  event: any
) {
  // Create new event in events collection
  const eventsCollectionRef = firestore.collection("events");
  await eventsCollectionRef.doc(eventId).create(event);
  // Add event ID to user document
  const userCollectionRef = firestore.collection("users");
  const userDocument = await userCollectionRef.doc(userName).get();
  const eventsIdsList = userDocument.data().events;
  await userCollectionRef.doc(userName).update({ events: [...eventsIdsList, eventId] })
}

function createEventEndpoint(router: express.Router, firestore: FirebaseFirestore.Firestore) {
  router.post("/create", async (req: express.Request, res: express.Response) => {
    try {
      const { userName, password, eventId, event } = req.body;
      const user = await getUserData(firestore, userName);
      if (!user) {
        throw new Error("Error: No such user");
      }
      verifyUser(user, password);
      // ------------------------------------------------------- //
      await createEventService(firestore, userName, eventId, event);
      // ------------------------------------------------------- //
      return res.status(201).send({ lastUpdate: user.lastUpdate });
    } catch (e) {
      console.log(e)
      return res.status(500).send(e);
    }
  });
}

export default createEventEndpoint;