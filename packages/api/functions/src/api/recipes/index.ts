import * as express from "express";
import fb from '../../fb';
import getUserData from '../../utils/getUserData';
import verifyUser from '../../utils/verifyUser';

export const router = express.Router();
const db = fb.firestore();

router.post("/add", async (req: express.Request, res: express.Response) => {
  try {
    const { userName, password, newId, recipe } = req.body;
    const document = db.collection('users').doc(userName)
    const user = await getUserData(document);
    if (!user) {
      throw new Error("Error: No such user");
    }
    verifyUser(user, password);
    // ------------------------------------------------------- //
    const recipes = { ...user.recipes, [newId]: recipe };
    await document.update({ recipes });
    // ------------------------------------------------------- //
    return res.status(200).send();
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.post("/edit", async (req: express.Request, res: express.Response) => {
  try {
    const { userName, password, recipeId, recipe } = req.body;
    const document = db.collection('users').doc(userName)
    const user = await getUserData(document);
    if (!user) {
      throw new Error("Error: No such user");
    }
    verifyUser(user, password);
    // ------------------------------------------------------- //
    const recipes = { ...user.recipes };
    recipes[recipeId] = recipe;
    await document.update({ recipes });
    // ------------------------------------------------------- //
    return res.status(200).send();
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.post("/delete", async (req: express.Request, res: express.Response) => {
  try {
    const { userName, password, recipeId } = req.body;
    const document = db.collection('users').doc(userName)
    const user = await getUserData(document);
    if (!user) {
      throw new Error("Error: No such user");
    }
    verifyUser(user, password);
    // ------------------------------------------------------- //
    const recipes = { ...user.recipes };
    delete recipes[recipeId];
    await document.update({ recipes });
    // ------------------------------------------------------- //
    return res.status(200).send();
  } catch (e) {
    return res.status(500).send(e);
  }
});

// Intercept un-matched routes
router.get("*", async (req: express.Request, res: express.Response) => {
	res.status(404).send("This route does not exist.");
});
