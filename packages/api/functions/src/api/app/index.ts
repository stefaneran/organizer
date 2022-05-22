import * as express from "express";
import firebaseApp from '../../firebaseApp';
import registerUser from './registerUser';
import loginUser from './loginUser';

export const router = express.Router();
const firestore = firebaseApp.firestore();

registerUser(router, firestore);
loginUser(router, firestore);

// Intercept un-matched routes
router.get("*", async (req: express.Request, res: express.Response) => {
  res.status(404).send("This route does not exist.");
});