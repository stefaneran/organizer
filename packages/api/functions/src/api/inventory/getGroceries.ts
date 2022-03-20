import * as express from "express";
import getUserData from '../../utils/getUserData';
import verifyUser from '../../utils/verifyUser';
import getDataByIDList from '../../core/getDataByIDList';

export async function getGroceriesService(firestore: FirebaseFirestore.Firestore, userName: string) {
  return await getDataByIDList(firestore, userName, "groceries");
}

function getGroceriesEndpoint(router: express.Router, firestore: FirebaseFirestore.Firestore) {
  router.post("/get", async (req: express.Request, res: express.Response) => {
    try {
      const { userName, password } = req.body;
      const user = await getUserData(firestore, userName);
      if (!user) {
        throw new Error("Error: No such user");
      }
      verifyUser(user, password);
      // ------------------------------------------------------- //
      const groceriesData = await getGroceriesService(firestore, userName);
      const { inventory, cart, cartSelected } = user;
      const responseData = {
        groceries: groceriesData,
        inventory,
        cart,
        cartSelected
      }
      // ------------------------------------------------------- //
      return res.status(200).send(responseData);
    } catch (e) {
      return res.status(500).send(e);
    }
  });
}

export default getGroceriesEndpoint;