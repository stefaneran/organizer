import * as express from "express";
// import { migrate } from "../../migrations";

function loginUser(router, firestore: FirebaseFirestore.Firestore) {
  router.post('/login', async (req: express.Request, res: express.Response) => {
    try {
      // MIGRATION
      // await migrate(firestore);

      const { userName, password } = req.body;
      const userCollectionRef = firestore.collection("users");
      const userDocument = await userCollectionRef.doc(userName).get();
      const user = userDocument.data();
      if (!user) {
        throw new Error("Error: No such user");
      } else if (user.password !== password) {
        throw new Error("Error: Wrong password");
      }
      return res.status(200).send({ 
        lastRecipeUpdate: user.lastRecipeUpdate,
        lastInventoryUpdate: user.lastInventoryUpdate,
        lastActivityUpdate: user.lastActivityUpdate,
        lastContactUpdate: user.lastContactUpdate
      });
    } catch (e) {
      return res.status(500).send(e);
    }
  })
}

export default loginUser;