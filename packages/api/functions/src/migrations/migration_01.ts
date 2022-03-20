
import getUserData from '../utils/getUserData';
import getDefaultUserData from '../utils/getDefaultUserData';
import { createGroceryService } from '../api/inventory/createGrocery';
import { createRecipeService } from '../api/recipes/createRecipe';
import { createActivityService } from '../api/activities/createActivity';
import { createContactService } from '../api/contacts/createContact';
import { createEventService } from '../api/events/createEvent';

export const migration = async (firestore) => {
  const user = await getUserData(firestore, "stefan");

  // Create new user
  const newUserName = "migration-test1"
  const newUser = getDefaultUserData(newUserName, "123");
  const userCollectionRef = firestore.collection("users");
  await userCollectionRef.doc(newUserName).create(newUser);

  // Migrate groceries items DB
  const groceriesItems = user.inventory.allItems;
  await Promise.all(
    Object.entries(groceriesItems).map(([id, grocery]) => createGroceryService(firestore, newUserName, id, grocery))
  )

  // Migrate groceries, inventory and cart collections
  const groceries = Object.keys(groceriesItems);
  const inventory = user.inventory.availableItems;
  const cart = user.inventory.cart;
  const cartSelected = user.inventory.selectedInCart;
  await userCollectionRef.doc(newUserName).update({ groceries, inventory, cart, cartSelected })

  // Migrate recipes
  const recipes = user.recipes;
  await Promise.all(
    Object.entries(recipes).map(([id, recipe]) => createRecipeService(firestore, newUserName, id, recipe))
  )
  await userCollectionRef.doc(newUserName).update({ recipes: Object.keys(recipes) })

  // Migrate Activities
  const activities = user.activities;
  await Promise.all(
    Object.entries(activities).map(([id, activity]) => createActivityService(firestore, newUserName, id, activity))
  )
  await userCollectionRef.doc(newUserName).update({ activities: Object.keys(activities) })

  // Migrate Contacts
  const contacts = user.contacts;
  await Promise.all(
    Object.entries(contacts).map(([id, contact]) => createContactService(firestore, newUserName, id, contact))
  )
  await userCollectionRef.doc(newUserName).update({ contacts: Object.keys(contacts) })

  // Migrate Events
  const events = user.events;
  await Promise.all(
    Object.entries(events).map(([id, event]) => createEventService(firestore, newUserName, id, event))
  )
  await userCollectionRef.doc(newUserName).update({ events: Object.keys(events) })
  

}