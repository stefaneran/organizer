import * as express from "express";
import getUserData from '../../utils/getUserData';
import verifyUser from '../../utils/verifyUser';
import { getGroceriesService } from '../inventory/getGroceries';
import getDataByIDList from '../../core/getDataByIDList';

export async function getRecipesService(firestore: FirebaseFirestore.Firestore, userName: string) {
  return await getDataByIDList(firestore, userName, "recipes");
}

function getRecipesEndpoint(router: express.Router, firestore: FirebaseFirestore.Firestore) {
  router.post("/get", async (req: express.Request, res: express.Response) => {
    try {
      const { userName, password } = req.body;
      const user = await getUserData(firestore, userName);
      if (!user) {
        throw new Error("Error: No such user");
      }
      verifyUser(user, password);
      // ------------------------------------------------------- //
      const recipesData = await getRecipesService(firestore, userName);
      const groceriesData = await getGroceriesService(firestore, userName);
      const responseData = {
        recipes: recipesData,
        groceries: groceriesData,
        inventory: user.inventory,
        cart: user.cart
      }
      // ------------------------------------------------------- //
      return res.status(200).send(responseData);
    } catch (e) {
      return res.status(500).send(e);
    }
  });
}

export default getRecipesEndpoint;