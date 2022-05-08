import * as express from "express";
import getUserData from '../../utils/getUserData';
import verifyUser from '../../utils/verifyUser';

export async function updateRecipeService(
  firestore: FirebaseFirestore.Firestore, 
  recipeId: string, 
  recipe: any
) {
  const recipeDocRef = firestore.collection("recipes");
  await recipeDocRef.doc(recipeId).set(recipe);
}

function updateRecipeEndpoint(router: express.Router, firestore: FirebaseFirestore.Firestore) {
  router.post("/update", async (req: express.Request, res: express.Response) => {
    try {
      const { userName, password, recipeId, recipe } = req.body;
      const user = await getUserData(firestore, userName);
      if (!user) {
        throw new Error("Error: No such user");
      }
      verifyUser(user, password);
      // ------------------------------------------------------- //
      await updateRecipeService(firestore, recipeId, recipe);
      // ------------------------------------------------------- //
      return res.status(200).send();
    } catch (e) {
      return res.status(500).send(e);
    }
  });
}

export default updateRecipeEndpoint;