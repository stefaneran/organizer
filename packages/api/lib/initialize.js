"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const appApi = require("./api/app");
const activitiesApi = require("./api/activities");
const contactsApi = require("./api/contacts");
const eventsApi = require("./api/events");
const inventoryApi = require("./api/inventory");
const recipesApi = require("./api/recipes");
exports.default = () => {
    const app = express();
    app.use(cors({ origin: true }));
    app.use("/app", appApi.router);
    app.use("/activities", activitiesApi.router);
    app.use("/contacts", contactsApi.router);
    app.use("/events", eventsApi.router);
    app.use("/inventory", inventoryApi.router);
    app.use("/recipes", recipesApi.router);
    return app;
};
//# sourceMappingURL=initialize.js.map