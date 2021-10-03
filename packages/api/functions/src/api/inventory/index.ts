import * as express from "express";
import fb from '../../fb';
import getUserData from '../../utils/getUserData';
import verifyUser from '../../utils/verifyUser';
import updateRecipesAfterItemDelete from '../../utils/updateRecipesAfterItemDelete';

export const router = express.Router();
const db = fb.firestore();

router.post("/setItem", async (req: express.Request, res: express.Response) => {
  try {
    const { userName, password, itemId, item } = req.body;
    const document = db.collection('users').doc(userName)
    const user = await getUserData(document);
    if (!user) {
      throw new Error("Error: No such user");
    }
    verifyUser(user, password);
    // ------------------------------------------------------- //
    const inventory = { ...user.inventory };
    inventory.allItems[itemId] = item;
    await document.update({ inventory });
    // ------------------------------------------------------- //
    return res.status(200).send();
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.post("/deleteItem", async (req: express.Request, res: express.Response) => {
  try {
    const { userName, password, itemIds } = req.body;
    const document = db.collection('users').doc(userName)
    const user = await getUserData(document);
    if (!user) {
      throw new Error("Error: No such user");
    }
    verifyUser(user, password);
    // ------------------------------------------------------- //
    const inventory = { ...user.inventory };

    itemIds.forEach((itemId: string) => {
      delete inventory.allItems[itemId];
    });

    inventory.availableItems = 
      inventory.availableItems.filter((itemId: string) => !itemIds.includes(itemId));
    inventory.cart = 
      inventory.cart.filter((itemId: string) => !itemIds.includes(itemId));
    inventory.selectedInCart = 
      inventory.selectedInCart.filter((itemId: string) => !itemIds.includes(itemId));

    // Remove from any recipes that may contain this item as an ingredient
    const { recipes, hasChanges, changes } = updateRecipesAfterItemDelete(user.recipes, itemIds);
    
    await document.update({ inventory, recipes });
    // ------------------------------------------------------- //
    return res.status(200).send({ itemIds, hasChanges, changes });
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.post("/addAvailable", async (req: express.Request, res: express.Response) => {
  try {
    const { userName, password, itemIds } = req.body;
    const document = db.collection('users').doc(userName)
    const user = await getUserData(document);
    if (!user) {
      throw new Error("Error: No such user");
    }
    verifyUser(user, password);
    // ------------------------------------------------------- //
    const inventory = { ...user.inventory };
    itemIds.forEach((itemId: string) => {
      if (!inventory.availableItems.includes(itemId)) {
        inventory.availableItems.push(itemId);
      }
    })
    await document.update({ inventory });
    // ------------------------------------------------------- //
    return res.status(200).send();
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.post("/removeAvailable", async (req: express.Request, res: express.Response) => {
  try {
    const { userName, password, itemIds } = req.body;
    const document = db.collection('users').doc(userName)
    const user = await getUserData(document);
    if (!user) {
      throw new Error("Error: No such user");
    }
    verifyUser(user, password);
    // ------------------------------------------------------- //
    const inventory = { ...user.inventory };
    inventory.availableItems = 
      inventory.availableItems.filter((itemId: string) => !itemIds.includes(itemId));
    await document.update({ inventory });
    // ------------------------------------------------------- //
    return res.status(200).send();
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.post("/addCart", async (req: express.Request, res: express.Response) => {
  try {
    const { userName, password, itemIds } = req.body;
    const document = db.collection('users').doc(userName)
    const user = await getUserData(document);
    if (!user) {
      throw new Error("Error: No such user");
    }
    verifyUser(user, password);
    // ------------------------------------------------------- //
    const inventory = { ...user.inventory };
    itemIds.forEach((itemId: string) => {
      if (!inventory.cart.includes(itemId)) {
        inventory.cart.push(itemId);
      }
    })
    await document.update({ inventory });
    // ------------------------------------------------------- //
    return res.status(200).send();
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.post("/removeCart", async (req: express.Request, res: express.Response) => {
  try {
    const { userName, password, itemIds } = req.body;
    const document = db.collection('users').doc(userName)
    const user = await getUserData(document);
    if (!user) {
      throw new Error("Error: No such user");
    }
    verifyUser(user, password);
    // ------------------------------------------------------- //
    const inventory = { ...user.inventory };
    inventory.cart = 
      inventory.cart.filter((itemId: string) => !itemIds.includes(itemId));
    inventory.selectedInCart = 
      inventory.selectedInCart.filter((itemId: string) => !itemIds.includes(itemId));
    await document.update({ inventory });
    // ------------------------------------------------------- //
    return res.status(200).send();
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.post("/updateSelectedCart", async (req: express.Request, res: express.Response) => {
  try {
    const { userName, password, selected } = req.body;
    const document = db.collection('users').doc(userName)
    const user = await getUserData(document);
    if (!user) {
      throw new Error("Error: No such user");
    }
    verifyUser(user, password);
    // ------------------------------------------------------- //
    const inventory = { ...user.inventory };
    inventory.selectedInCart = selected;
    await document.update({ inventory });
    // ------------------------------------------------------- //
    return res.status(200).send();
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.post("/finishShopping", async (req: express.Request, res: express.Response) => {
  try {
    const { userName, password } = req.body;
    const document = db.collection('users').doc(userName)
    const user = await getUserData(document);
    if (!user) {
      throw new Error("Error: No such user");
    }
    verifyUser(user, password);
    // ------------------------------------------------------- //
    const inventory = { ...user.inventory };
    const onlyChecked = Boolean(inventory.selectedInCart.length);
    inventory.cart.forEach((itemId: string) => {
      const notAvailable = !inventory.availableItems.includes(itemId);
      const isSelected = inventory.selectedInCart.includes(itemId);
      if (onlyChecked && isSelected && notAvailable) {
        inventory.availableItems.push(itemId)
      } else if (!onlyChecked && notAvailable) {
        inventory.availableItems.push(itemId)
      }
    })
    if (onlyChecked) {
      inventory.cart = 
        inventory.cart.filter((itemId: string) => !inventory.selectedInCart.includes(itemId));
      inventory.selectedInCart = [];
    } else {
      inventory.cart = [];
    }
    await document.update({ inventory });
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
