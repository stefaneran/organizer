import * as express from "express";
import getUserData from '../../utils/getUserData';
import verifyUser from '../../utils/verifyUser';

export async function removeItemsCartService(
  firestore: FirebaseFirestore.Firestore, 
  userName: string,
  groceriesIds: string[]
) {
  const userCollectionRef = firestore.collection("users");
  const userDocument = await userCollectionRef.doc(userName).get();

  // Filter cart array
  const cartData = userDocument.data().cart;
  const updatedCart = cartData.filter(groceryId => !groceriesIds.includes(groceryId));

  // Filter cartSelected array
  const cartSelectedData = userDocument.data().cartSelected;
  const updatedCartSelected = cartSelectedData.filter(groceryId => !groceriesIds.includes(groceryId));

  await userCollectionRef.doc(userName).update({ 
    cart: updatedCart, 
    cartSelected: updatedCartSelected 
  })
}

function removeItemsCartEndpoint(router: express.Router, firestore: FirebaseFirestore.Firestore) {
  router.post("/removeCart", async (req: express.Request, res: express.Response) => {
    try {
      const { userName, password, groceriesIds } = req.body;
      const user = await getUserData(firestore, userName);
      if (!user) {
        throw new Error("Error: No such user");
      }
      verifyUser(user, password);
      // ------------------------------------------------------- //
      await removeItemsCartService(firestore, userName, groceriesIds);
      // ------------------------------------------------------- //
      return res.status(200).send();
    } catch (e) {
      return res.status(500).send(e);
    }
  });
}

export default removeItemsCartEndpoint;