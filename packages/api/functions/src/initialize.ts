import * as express from 'express';
import * as cors from 'cors';
import * as appApi from "./api/app";
import * as activitiesApi from "./api/activities";
import * as contactsApi from "./api/contacts";
import * as eventsApi from "./api/events";
import * as inventoryApi from "./api/inventory";
import * as recipesApi from "./api/recipes";

export default () => {

  const app = express();
  app.use(cors({ origin: true }))

  app.use("/app", appApi.router);
  app.use("/activities", activitiesApi.router);
  app.use("/contacts", contactsApi.router);
  app.use("/events", eventsApi.router);
  app.use("/inventory", inventoryApi.router);
  app.use("/recipes", recipesApi.router);

  return app;
}