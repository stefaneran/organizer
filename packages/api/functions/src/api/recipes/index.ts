import * as express from "express";
import firebaseApp from '../../firebaseApp';
import getRecipesEndpoint from './getRecipes';
import createRecipeEndpoint from './createRecipe';
import updateRecipeEndpoint from './updateRecipe';
import deleteRecipeEndpoint from './deleteRecipe';

export const router = express.Router();
  
const firestore = firebaseApp.firestore();

// Get all recipes associated with user
getRecipesEndpoint(router, firestore)
// Create a new recipe
createRecipeEndpoint(router, firestore)
// Update existing recipe
updateRecipeEndpoint(router, firestore)
// Delete existing recipe
deleteRecipeEndpoint(router, firestore)

router.get("*", async (req: express.Request, res: express.Response) => {
  res.status(404).send("This route does not exist.");
});