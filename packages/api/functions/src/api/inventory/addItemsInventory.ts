import * as express from "express";
import getUserData from '../../utils/getUserData';
import verifyUser from '../../utils/verifyUser';

export async function addItemsInventoryService(
  firestore: FirebaseFirestore.Firestore, 
  userName: string,
  groceriesIds: string[]
) {
  const userCollectionRef = firestore.collection("users");
  const userDocument = await userCollectionRef.doc(userName).get();
  const inventoryData = userDocument.data().inventory;
  const updatedInventory = [...inventoryData];
  groceriesIds.forEach(groceryId => {
    if (!inventoryData.includes(groceryId)) {
      updatedInventory.push(groceryId)
    }
  })
  await userCollectionRef.doc(userName).update({ inventory: updatedInventory })
}

function addItemsInventoryEndpoint(router: express.Router, firestore: FirebaseFirestore.Firestore) {
  router.post("/addInventory", async (req: express.Request, res: express.Response) => {
    try {
      const { userName, password, groceriesIds } = req.body;
      const user = await getUserData(firestore, userName);
      if (!user) {
        throw new Error("Error: No such user");
      }
      verifyUser(user, password);
      // ------------------------------------------------------- //
      await addItemsInventoryService(firestore, userName, groceriesIds);
      // ------------------------------------------------------- //
      return res.status(200).send({ lastUpdate: user.lastUpdate });
    } catch (e) {
      return res.status(500).send(e);
    }
  });
}

export default addItemsInventoryEndpoint;