import * as express from "express";
import getUserData from '../../utils/getUserData';
import verifyUser from '../../utils/verifyUser';

export async function createRecipeService(
  firestore: FirebaseFirestore.Firestore, 
  userName: string, 
  recipeId: string,
  recipe: any
) {
  // Create new recipe in recipes collection
  const recipesCollectionRef = firestore.collection("recipes");
  await recipesCollectionRef.doc(recipeId).create(recipe);
  // Add recipe ID to user document
  const userCollectionRef = firestore.collection("users");
  const userDocument = await userCollectionRef.doc(userName).get();
  const recipesIdsList = userDocument.data().recipes;
  await userCollectionRef.doc(userName).update({ recipes: [...recipesIdsList, recipeId] })
}

function createRecipeEndpoint(router: express.Router, firestore: FirebaseFirestore.Firestore) {
  router.post("/create", async (req: express.Request, res: express.Response) => {
    try {
      const { userName, password, recipeId, recipe } = req.body;
      const user = await getUserData(firestore, userName);
      if (!user) {
        throw new Error("Error: No such user");
      }
      verifyUser(user, password);
      // ------------------------------------------------------- //
      await createRecipeService(firestore, userName, recipeId, recipe);
      // ------------------------------------------------------- //
      return res.status(201).send({ lastUpdate: user.lastUpdate });
    } catch (e) {
      return res.status(500).send(e);
    }
  });
}

export default createRecipeEndpoint;