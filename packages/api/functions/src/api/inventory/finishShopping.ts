import * as express from "express";
import getUserData from '../../utils/getUserData';
import verifyUser from '../../utils/verifyUser';

export async function finishShoppingService(firestore: FirebaseFirestore.Firestore, userName: string) {
  // Get user groceries list
  const userCollectionRef = firestore.collection("users");
  const userDocument = await userCollectionRef.doc(userName).get();
  const userData = userDocument.data();

  const { cart, cartSelected, inventory } = userData;
  // Has any checked items in cart
  const hasChecked = Boolean(cartSelected.length);
  let updatedCart = [];
  let updatedInventory = [...inventory];

  // Go through cart
  cart.forEach((groceryId: string) => {
    const notInInventory = !inventory.includes(groceryId);
    const isSelected = cartSelected.includes(groceryId);
    // If item is checked, add to inventory if item not in it 
    if (hasChecked && isSelected && notInInventory) {
      updatedInventory.push(groceryId)
    }
    // If none checked, add to inventory if item not in it 
    else if (!hasChecked && notInInventory) {
      updatedInventory.push(groceryId)
    }
  })

  // If any items were checked
  if (hasChecked) {
    // Remove checked items from cart and leave the rest in
    updatedCart = cart.filter((groceryId: string) => !cartSelected.includes(groceryId));
  }

  await userCollectionRef.doc(userName).update({ 
    cart: updatedCart, 
    cartSelected: [], 
    inventory: updatedInventory 
  })
}

function finishShoppingEndpoint(router: express.Router, firestore: FirebaseFirestore.Firestore) {
  router.post("/finishShopping", async (req: express.Request, res: express.Response) => {
    try {
      const { userName, password } = req.body;
      const user = await getUserData(firestore, userName);
      if (!user) {
        throw new Error("Error: No such user");
      }
      verifyUser(user, password);
      // ------------------------------------------------------- //
      await finishShoppingService(firestore, userName);
      // ------------------------------------------------------- //
      return res.status(200).send({ lastUpdate: user.lastUpdate });
    } catch (e) {
      return res.status(500).send(e);
    }
  });
}

export default finishShoppingEndpoint;