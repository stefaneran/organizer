import * as express from "express";
import getUserData from '../../utils/getUserData';
import verifyUser from '../../utils/verifyUser';

export async function updateContactService(
  firestore: FirebaseFirestore.Firestore, 
  contactId: string, 
  contact: any
) {
  const contactDocRef = firestore.collection("contacts");
  await contactDocRef.doc(contactId).set(contact);
}

function updateContactEndpoint(router: express.Router, firestore: FirebaseFirestore.Firestore) {
  router.post("/update", async (req: express.Request, res: express.Response) => {
    try {
      const { userName, password, contactId, contact } = req.body;
      const user = await getUserData(firestore, userName);
      if (!user) {
        throw new Error("Error: No such user");
      }
      verifyUser(user, password);
      // ------------------------------------------------------- //
      await updateContactService(firestore, contactId, contact);
      // ------------------------------------------------------- //
      return res.status(200).send({ lastUpdate: user.lastUpdate });
    } catch (e) {
      return res.status(500).send(e);
    }
  });
}

export default updateContactEndpoint;