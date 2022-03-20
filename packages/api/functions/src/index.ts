import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import preMiddleware from './core/preMiddleware';
import * as appApi from "./api/app";
import * as activitiesApi from "./api/activities";
import * as contactsApi from "./api/contacts";
import * as eventsApi from "./api/events";
import * as inventoryApi from "./api/inventory";
import * as recipesApi from "./api/recipes";

const init = () => {
  const app = express();
  app.use(cors({ origin: true }))

  preMiddleware(app);

  app.use("/app", appApi.router);
  app.use("/activities", activitiesApi.router);
  app.use("/contacts", contactsApi.router);
  app.use("/events", eventsApi.router);
  app.use("/inventory", inventoryApi.router);
  app.use("/recipes", recipesApi.router);
  
  return app;
}

const app = init();

export default functions.region('europe-west1').https.onRequest(app);