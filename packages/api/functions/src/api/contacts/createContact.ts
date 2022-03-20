import * as express from "express";
import getUserData from '../../utils/getUserData';
import verifyUser from '../../utils/verifyUser';

export async function createContactService(
  firestore: FirebaseFirestore.Firestore, 
  userName: string, 
  contactId: string,
  contact: any
) {
  // Create new contact in contacts collection
  const contactsCollectionRef = firestore.collection("contacts");
  await contactsCollectionRef.doc(contactId).create(contact);
  // Add contact ID to user document
  const userCollectionRef = firestore.collection("users");
  const userDocument = await userCollectionRef.doc(userName).get();
  const contactsIdsList = userDocument.data().contacts;
  await userCollectionRef.doc(userName).update({ contacts: [...contactsIdsList, contactId] })
}

function createContactEndpoint(router: express.Router, firestore: FirebaseFirestore.Firestore) {
  router.post("/create", async (req: express.Request, res: express.Response) => {
    try {
      const { userName, password, contactId, contact } = req.body;
      const user = await getUserData(firestore, userName);
      if (!user) {
        throw new Error("Error: No such user");
      }
      verifyUser(user, password);
      // ------------------------------------------------------- //
      await createContactService(firestore, userName, contactId, contact);
      // ------------------------------------------------------- //
      return res.status(201).send({ lastUpdate: user.lastUpdate });
    } catch (e) {
      return res.status(500).send(e);
    }
  });
}

export default createContactEndpoint;