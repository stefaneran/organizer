"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const serviceAccount = require("./permissions.json");
exports.default = admin.initializeApp({
    credential: admin.credential.cert({
        privateKey: serviceAccount.private_key,
        clientEmail: serviceAccount.client_email,
        projectId: serviceAccount.project_id
    }),
    databaseURL: "https://sem-organizer.firebaseio.com"
});
//# sourceMappingURL=fb.js.map