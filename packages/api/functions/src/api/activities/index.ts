import * as express from "express";
import fb from '../../fb';
import getUserData from '../../utils/getUserData';
import verifyUser from '../../utils/verifyUser';

export const router = express.Router();
const db = fb.firestore();

router.post("/getAll", async (req: express.Request, res: express.Response) => {
  try {
    const { userName, password } = req.body;
    const document = db.collection('users').doc(userName)
    const user = await getUserData(document);
    if (!user) {
      throw new Error("Error: No such user");
    }
    verifyUser(user, password);
    // ------------------------------------------------------- //
    const activities = user.activities || {}
    // ------------------------------------------------------- //
    return res.status(200).send(activities);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// Create New Activity
router.post("/create", async (req: express.Request, res: express.Response) => {
  try {
    const { userName, password, newId, activity } = req.body;
    const document = db.collection('users').doc(userName)
    const user = await getUserData(document);
    if (!user) {
      throw new Error("Error: No such user");
    }
    verifyUser(user, password);
    // ------------------------------------------------------- //
    const activities = { ...user.activities, [newId]: activity };
    await document.update({ activities });
    // ------------------------------------------------------- //
    return res.status(200).send();
  } catch (e) {
    return res.status(500).send(e);
  }
});

// Edit Existing Activity
router.post("/edit", async (req: express.Request, res: express.Response) => {
  try {
    const { userName, password, id, activity } = req.body;
    const document = db.collection('users').doc(userName)
    const user = await getUserData(document);
    if (!user) {
      throw new Error("Error: No such user");
    }
    verifyUser(user, password);
    // ------------------------------------------------------- //
    const activities = { 
      ...user.activities, 
      [id]: activity
    };
    await document.update({ activities });
    // ------------------------------------------------------- //
    return res.status(200).send();
  } catch (e) {
    return res.status(500).send(e);
  }
});

// Delete Existing Activity
router.post("/delete", async (req: express.Request, res: express.Response) => {
  try {
    const { userName, password, id } = req.body;
    const document = db.collection('users').doc(userName)
    const user = await getUserData(document);
    if (!user) {
      throw new Error("Error: No such user");
    }
    verifyUser(user, password);
    // ------------------------------------------------------- //
    const activities = { ...user.activities };
    delete activities[id];
    await document.update({ activities });
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
