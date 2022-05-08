import * as express from "express";
import getUserData from '../../utils/getUserData';
import verifyUser from '../../utils/verifyUser';

export async function updateItemsCartSelectedService(
  firestore: FirebaseFirestore.Firestore, 
  userName: string,
  groceriesIds: string[]
) {
  const userCollectionRef = firestore.collection("users");
  await userCollectionRef.doc(userName).update({ cartSelected: groceriesIds })
}

function updateItemsCartSelectedEndpoint(router: express.Router, firestore: FirebaseFirestore.Firestore) {
  router.post("/updateCartSelected", async (req: express.Request, res: express.Response) => {
    try {
      const { userName, password, groceriesIds } = req.body;
      const user = await getUserData(firestore, userName);
      if (!user) {
        throw new Error("Error: No such user");
      }
      verifyUser(user, password);
      // ------------------------------------------------------- //
      await updateItemsCartSelectedService(firestore, userName, groceriesIds);
      // ------------------------------------------------------- //
      return res.status(200).send();
    } catch (e) {
      return res.status(500).send(e);
    }
  });
}

export default updateItemsCartSelectedEndpoint;