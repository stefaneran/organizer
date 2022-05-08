import * as express from "express";
import getUserData from '../../utils/getUserData';
import verifyUser from '../../utils/verifyUser';

export async function deleteRecipeService(
  firestore: FirebaseFirestore.Firestore, 
  userName: string,
  recipeId: string
) {
  // Delete recipe from recipes collection
  const recipesCollectionRef = firestore.collection("recipes");
  await recipesCollectionRef.doc(recipeId).delete();
  // Delete recipe from user document
  const userCollectionRef = firestore.collection("users");
  const userDocument = await userCollectionRef.doc(userName).get();
  const recipesIdsList = userDocument.data().recipes;
  const updatedList = recipesIdsList.filter(recipe => {
    return recipe !== recipeId
  });
  await userCollectionRef.doc(userName).update({ recipes: updatedList })
}

function deleteRecipeEndpoint(router: express.Router, firestore: FirebaseFirestore.Firestore) {
  router.post("/delete", async (req: express.Request, res: express.Response) => {
    try {
      const { userName, password, recipeId } = req.body;
      const user = await getUserData(firestore, userName);
      if (!user) {
        throw new Error("Error: No such user");
      }
      verifyUser(user, password);
      // ------------------------------------------------------- //
      await deleteRecipeService(firestore, userName, recipeId);
      // ------------------------------------------------------- //
      return res.status(200).send();
    } catch (e) {
      return res.status(500).send(e);
    }
  });
}

export default deleteRecipeEndpoint;