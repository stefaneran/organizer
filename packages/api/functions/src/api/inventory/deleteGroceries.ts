import * as express from "express";
import getUserData from '../../utils/getUserData';
import verifyUser from '../../utils/verifyUser';
import updateRecipesAfterGroceryDelete from '../../utils/updateRecipesAfterGroceryDelete';
import { getRecipesService } from '../recipes/getRecipes';

export async function deleteGroceriesService(
  firestore: FirebaseFirestore.Firestore, 
  userName: string,
  groceriesIds: string[]
) {
  // Delete groceries from collection
  const groceriesCollectionRef = firestore.collection("groceries");
  groceriesIds.forEach(async (groceryId) => {
    await groceriesCollectionRef.doc(groceryId).delete();
  })

  const userCollectionRef = firestore.collection("users");
  const userDocument = await userCollectionRef.doc(userName).get();

  // Filter groceries array
  const userGroceries = userDocument.data().groceries;
  const updatedGroceries = userGroceries.filter(groceryId => !groceriesIds.includes(groceryId));

  // Filter inventory array
  const userInventory = userDocument.data().inventory;
  const updatedInventory = userInventory.filter(groceryId => !groceriesIds.includes(groceryId));

  // Filter cart array
  const userCart = userDocument.data().cart;
  const updatedCart = userCart.filter(groceryId => !groceriesIds.includes(groceryId));

  // Filter cartSelected array
  const userCartSelected = userDocument.data().cartSelected;
  const updatedCartSelected = userCartSelected.filter(groceryId => !groceriesIds.includes(groceryId));

  // Update user doc
  await userCollectionRef.doc(userName).update({ 
    groceries: updatedGroceries,
    inventory: updatedInventory,
    cart: updatedCart,
    cartSelected: updatedCartSelected
  })

  // Update any affected recipes
  const userRecipes = await getRecipesService(firestore, userName);
  return await updateRecipesAfterGroceryDelete(firestore, userRecipes, groceriesIds);
}

function deleteGroceriesEndpoint(router: express.Router, firestore: FirebaseFirestore.Firestore) {
  router.post("/delete", async (req: express.Request, res: express.Response) => {
    try {
      const { userName, password, groceriesIds } = req.body;
      const user = await getUserData(firestore, userName);
      if (!user) {
        throw new Error("Error: No such user");
      }
      verifyUser(user, password);
      // ------------------------------------------------------- //
      const { hasChanges, changes } = await deleteGroceriesService(firestore, userName, groceriesIds);
      // ------------------------------------------------------- //
      return res.status(200).send({ 
        hasChanges, 
        changes, 
        lastUpdate: user.lastUpdate 
      });
    } catch (e) {
      return res.status(500).send(e);
    }
  });
}

export default deleteGroceriesEndpoint;