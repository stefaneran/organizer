import * as express from "express";
import getUserData from '../../utils/getUserData';
import verifyUser from '../../utils/verifyUser';

export async function updateLastContactService(
  firestore: FirebaseFirestore.Firestore,
  contactId: string
) {
  const contactDocRef = firestore.collection("contacts");
  await contactDocRef.doc(contactId).update({ lastContact: Date.now() });
}

function updateLastContactEndpoint(router: express.Router, firestore: FirebaseFirestore.Firestore) {
  router.post("/updateLast", async (req: express.Request, res: express.Response) => {
    try {
      const { userName, password, contactId } = req.body;
      const user = await getUserData(firestore, userName);
      if (!user) {
        throw new Error("Error: No such user");
      }
      verifyUser(user, password);
      // ------------------------------------------------------- //
      await updateLastContactService(firestore, contactId);
      // ------------------------------------------------------- //
      return res.status(200).send();
    } catch (e) {
      return res.status(500).send(e);
    }
  });
}

export default updateLastContactEndpoint;