import * as express from "express";
import fb from '../../fb';
import getUserData from '../../utils/getUserData';
import verifyUser from '../../utils/verifyUser';

export const router = express.Router();
const db = fb.firestore();

// Create New Contact
router.post("/create", async (req: express.Request, res: express.Response) => {
  try {
    const { userName, password, newId, contact } = req.body;
    const document = db.collection('users').doc(userName)
    const user = await getUserData(document);
    if (!user) {
      throw new Error("Error: No such user");
    }
    verifyUser(user, password);
    // ------------------------------------------------------- //
    const contacts = { ...user.contacts, [newId]: contact };
    await document.update({ contacts });
    // ------------------------------------------------------- //
    return res.status(200).send();
  } catch (e) {
    return res.status(500).send(e);
  }
});

// Edit Existing Contact
router.post("/edit", async (req: express.Request, res: express.Response) => {
  try {
    const { userName, password, id, contact } = req.body;
    const document = db.collection('users').doc(userName)
    const user = await getUserData(document);
    if (!user) {
      throw new Error("Error: No such user");
    }
    verifyUser(user, password);
    // ------------------------------------------------------- //
    const contacts = { 
      ...user.contacts, 
      [id]: contact
    };
    await document.update({ contacts });
    // ------------------------------------------------------- //
    return res.status(200).send();
  } catch (e) {
    return res.status(500).send(e);
  }
});

// Delete Existing Contact
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
    const contacts = { ...user.contacts };
    delete contacts[id];
    await document.update({ contacts });
    // ------------------------------------------------------- //
    return res.status(200).send();
  } catch (e) {
    return res.status(500).send(e);
  }
});

// Update last contact time with this person
router.post("/updateLast", async (req: express.Request, res: express.Response) => {
  try {
    const { userName, password, id } = req.body;
    const document = db.collection('users').doc(userName)
    const user = await getUserData(document);
    if (!user) {
      throw new Error("Error: No such user");
    }
    verifyUser(user, password);
    // ------------------------------------------------------- //
    const contacts = { ...user.contacts };
    contacts[id].lastContact = Date.now();
    await document.update({ contacts });
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
