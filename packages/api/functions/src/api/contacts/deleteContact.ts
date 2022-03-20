import * as express from "express";
import getUserData from '../../utils/getUserData';
import verifyUser from '../../utils/verifyUser';

export async function deleteContactService(
  firestore: FirebaseFirestore.Firestore, 
  userName: string,
  contactId: string
) {
  // Delete contact from contacts collection
  const contactsCollectionRef = firestore.collection("contacts");
  await contactsCollectionRef.doc(contactId).delete();
  // Delete contact from user document
  const userCollectionRef = firestore.collection("users");
  const userDocument = await userCollectionRef.doc(userName).get();
  const contactsIdsList = userDocument.data().contacts;
  const updatedList = contactsIdsList.filter(contact => {
    return contact !== contactId
  });
  await userCollectionRef.doc(userName).update({ contacts: updatedList })
}

function deleteContactEndpoint(router: express.Router, firestore: FirebaseFirestore.Firestore) {
  router.post("/delete", async (req: express.Request, res: express.Response) => {
    try {
      const { userName, password, contactId } = req.body;
      const user = await getUserData(firestore, userName);
      if (!user) {
        throw new Error("Error: No such user");
      }
      verifyUser(user, password);
      // ------------------------------------------------------- //
      await deleteContactService(firestore, userName, contactId);
      // ------------------------------------------------------- //
      return res.status(200).send({ lastUpdate: user.lastUpdate });
    } catch (e) {
      console.log(e)
      return res.status(500).send(e);
    }
  });
}

export default deleteContactEndpoint;