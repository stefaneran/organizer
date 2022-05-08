import * as express from "express";
import getUserData from '../../utils/getUserData';
import verifyUser from '../../utils/verifyUser';

export async function updateGroceryService(
  firestore: FirebaseFirestore.Firestore,
  groceryId: string,
  groceryItem: any
) {
  const groceryDocRef = firestore.collection("groceries");
  await groceryDocRef.doc(groceryId).set(groceryItem);
}

function updateGroceryEndpoint(router: express.Router, firestore: FirebaseFirestore.Firestore) {
  router.post("/update", async (req: express.Request, res: express.Response) => {
    try {
      const { userName, password, groceryId, groceryItem } = req.body;
      const user = await getUserData(firestore, userName);
      if (!user) {
        throw new Error("Error: No such user");
      }
      verifyUser(user, password);
      // ------------------------------------------------------- //
      await updateGroceryService(firestore, groceryId, groceryItem);
      // ------------------------------------------------------- //
      return res.status(200).send();
    } catch (e) {
      return res.status(500).send(e);
    }
  });
}

export default updateGroceryEndpoint;