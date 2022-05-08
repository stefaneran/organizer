import * as express from "express";
import getUserData from '../../utils/getUserData';
import verifyUser from '../../utils/verifyUser';

export async function createGroceryService(
  firestore: FirebaseFirestore.Firestore, 
  userName: string,
  groceryId: string,
  groceryItem: any
) {
  // Create new grocery in groceries collection
  const groceriesCollectionRef = firestore.collection("groceries");
  await groceriesCollectionRef.doc(groceryId).create(groceryItem);
  // Add grocery ID to user document
  const userCollectionRef = firestore.collection("users");
  const userDocument = await userCollectionRef.doc(userName).get();
  const groceriesIdsList = userDocument.data().groceries;
  await userCollectionRef.doc(userName).update({ groceries: [...groceriesIdsList, groceryId] })
}

function createGroceryEndpoint(router: express.Router, firestore: FirebaseFirestore.Firestore) {
  router.post("/create", async (req: express.Request, res: express.Response) => {
    try {
      const { userName, password, groceryId, groceryItem } = req.body;
      const user = await getUserData(firestore, userName);
      if (!user) {
        throw new Error("Error: No such user");
      }
      verifyUser(user, password);
      // ------------------------------------------------------- //
      await createGroceryService(firestore, userName, groceryId, groceryItem)
      // ------------------------------------------------------- //
      return res.status(201).send();
    } catch (e) {
      return res.status(500).send(e);
    }
  });
}

export default createGroceryEndpoint;