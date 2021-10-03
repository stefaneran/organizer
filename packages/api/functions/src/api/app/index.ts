import * as express from "express";
import { uuid } from 'uuidv4';
import fb from '../../fb';
import getUserData from '../../utils/getUserData';
import verifyUser from '../../utils/verifyUser';
import updateContacts from '../../utils/updateContacts';

export const router = express.Router();
const db = fb.firestore()

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

// Register
router.post('/register', async (req: express.Request, res: express.Response) => {
  try {
    const { userName, password } = req.body;
    // Verify username is unique
    const document = db.collection('users').doc(userName)
    const user = await document.get();
    const userResponse = user.data();
    if (userResponse) {
      throw new Error("Error: User Name Taken!");
    }
    // Go through with the registration
    const id = uuid();
    await db.collection('users').doc('/' + userName + '/') 
    .create({
      id,
      userName,
      password,
      inventory: {
        allItems: {},
        availableItems: [],
        cart: [],
        selectedInCart: []
      },
      recipes: {},
      activities: {},
      contacts: {},
      lastContactsUpdate: Date.now(),
      events: {}
    });
    return res.status(200).send();
  } catch (e) {
    return res.status(500).send(e);
  }
})

// Login
router.post('/login', async (req: express.Request, res: express.Response) => {
  try {
    const { userName, password } = req.body;
    const document = db.collection('users').doc(userName)
    const userDocument = await document.get();
    const user = userDocument.data();
    if (!user) {
      throw new Error("Error: No such user");
    } else if (user.password !== password) {
      throw new Error("Error: Wrong password");
    }
    return res.status(200).send({
      data: user
    });
  } catch (e) {
    return res.status(500).send(e);
  }
})

// Save - DEPRECATED
router.put('/save', async (req: express.Request, res: express.Response) => {
  try {
    const { userName, password, data } = req.body;
    const document = db.collection('users').doc(userName);
    const userDocument = await document.get();
    const user = userDocument.data();
    if (!user) {
      throw new Error("Error: No such user");
    } else if (user.password !== password) {
      throw new Error("Error: Wrong password");
    }
    
    await document.update({ data });

    return res.status(200).send();
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

// Intercept un-matched routes
router.get("*", async (req: express.Request, res: express.Response) => {
	res.status(404).send("This route does not exist.");
});