import * as express from "express";
import fb from '../../fb';
import getUserData from '../../utils/getUserData';
import verifyUser from '../../utils/verifyUser';

export const router = express.Router();
const db = fb.firestore();

// Create New Event
router.post("/create", async (req: express.Request, res: express.Response) => {
  try {
    const { userName, password, newId, event } = req.body;
    const document = db.collection('users').doc(userName)
    const user = await getUserData(document);
    if (!user) {
      throw new Error("Error: No such user");
    }
    verifyUser(user, password);
    // ------------------------------------------------------- //
    const events = { ...user.events, [newId]: event };
    await document.update({ events });
    // ------------------------------------------------------- //
    return res.status(200).send();
  } catch (e) {
    return res.status(500).send(e);
  }
});

// Edit Existing Event
router.post("/edit", async (req: express.Request, res: express.Response) => {
  try {
    const { userName, password, id, event } = req.body;
    const document = db.collection('users').doc(userName)
    const user = await getUserData(document);
    if (!user) {
      throw new Error("Error: No such user");
    }
    verifyUser(user, password);
    // ------------------------------------------------------- //
    const events = { 
      ...user.events, 
      [id]: event
    };
    await document.update({ events });
    // ------------------------------------------------------- //
    return res.status(200).send();
  } catch (e) {
    return res.status(500).send(e);
  }
});

// Delete Existing Event
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
    const events = { ...user.events };
    delete events[id];
    await document.update({ events });
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
