import * as express from "express";
import getDefaultUserData from '../../utils/getDefaultUserData';

function registerUser(router, firestore: FirebaseFirestore.Firestore) {
  router.post('/register', async (req: express.Request, res: express.Response) => {
    try {
      const { userName, password } = req.body;
      const newUser = getDefaultUserData(userName, password);
      const userCollectionRef = firestore.collection("users");
      await userCollectionRef.doc(userName).create(newUser);
      return res.status(201).send();
    } catch (e) { 
      return res.status(500).send(e);
    }
  })
}

export default registerUser;