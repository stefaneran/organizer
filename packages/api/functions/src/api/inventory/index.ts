import * as express from "express";
import firebaseApp from '../../firebaseApp';
import getGroceriesEndpoint from './getGroceries';
import createGroceryEndpoint from './createGrocery';
import updateGroceryEndpoint from './updateGrocery';
import deleteGroceriesEndpoint from './deleteGroceries';
import addItemsInventoryEndpoint from './addItemsInventory';
import removeItemsInventoryEndpoint from './removeItemsInventory';
import addItemsCartEndpoint from './addItemsCart';
import removeItemsCartEndpoint from './removeItemsCart';
import updateItemsCartSelectedEndpoint from './updateItemsCartSelected';
import finishShoppingEndpoint from './finishShopping';

export const router = express.Router();
const firestore = firebaseApp.firestore();

// Get all groceries associated with user
getGroceriesEndpoint(router, firestore);
// Create a new grocery item
createGroceryEndpoint(router, firestore);
// Update existing grocery item
updateGroceryEndpoint(router, firestore);
// Delete one or several grocery items
deleteGroceriesEndpoint(router, firestore);

// Add one or several existing items to user inventory
addItemsInventoryEndpoint(router, firestore);
// Remove one or several items from user inventory
removeItemsInventoryEndpoint(router, firestore);
// Add one or several existing items to user cart
addItemsCartEndpoint(router, firestore);
// Remove one or several items from user cart
removeItemsCartEndpoint(router, firestore);
// Update which cart items are selected
updateItemsCartSelectedEndpoint(router, firestore);

// Transfer selected (or all) items from cart to inventory
finishShoppingEndpoint(router, firestore);

// Intercept un-matched routes
router.get("*", async (req: express.Request, res: express.Response) => {
	res.status(404).send("This route does not exist.");
});
