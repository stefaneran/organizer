"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const initialize_1 = require("./initialize");
// TODO - Make middleware to avoid repetition in verifying user, etc
const app = (0, initialize_1.default)();
exports.default = functions.region('europe-west1').https.onRequest(app);
//# sourceMappingURL=index.js.map