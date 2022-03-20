import * as express from "express";
import firebaseApp from '../../firebaseApp';
import getUserData from '../../utils/getUserData';
import verifyUser from '../../utils/verifyUser';
import updateContacts from '../../utils/updateContacts';
import registerUser from './registerUser';
import loginUser from './loginUser';

export const router = express.Router();
const firestore = firebaseApp.firestore();

registerUser(router, firestore);
loginUser(router, firestore);

router.post("/getAll", async (req: express.Request, res: express.Response) => {
  try {
    const { userName, password } = req.body;
    const document = firestore.collection('users').doc(userName)
    const user = await getUserData(firestore, userName);
    if (!user) {
      throw new Error("Error: No such user");
    }
    verifyUser(user, password);
    // ------------------------------------------------------- //
    const { contacts, events } = user;

    const updatedData = updateContacts({ ...contacts }, events);
    await document.update({ contacts: updatedData });

    const response = {
      activities: user.activities,
      contacts: user.contacts,
      events: user.events,
      inventory: user.inventory,
      recipes: user.recipes
    }
    // ------------------------------------------------------- //
    return res.status(200).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// Intercept un-matched routes
router.get("*", async (req: express.Request, res: express.Response) => {
	res.status(404).send("This route does not exist.");
});