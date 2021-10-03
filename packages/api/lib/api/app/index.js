"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const uuidv4_1 = require("uuidv4");
const fb_1 = require("../../fb");
const getUserData_1 = require("../../utils/getUserData");
const verifyUser_1 = require("../../utils/verifyUser");
const updateContacts_1 = require("../../utils/updateContacts");
exports.router = express.Router();
const db = fb_1.default.firestore();
exports.router.post("/getAll", async (req, res) => {
    try {
        const { userName, password } = req.body;
        const document = db.collection('users').doc(userName);
        const user = await (0, getUserData_1.default)(document);
        if (!user) {
            throw new Error("Error: No such user");
        }
        (0, verifyUser_1.default)(user, password);
        // ------------------------------------------------------- //
        const { contacts, events } = user;
        const updatedData = (0, updateContacts_1.default)(Object.assign({}, contacts), events);
        await document.update({ contacts: updatedData });
        const response = {
            activities: user.activities,
            contacts: user.contacts,
            events: user.events,
            inventory: user.inventory,
            recipes: user.recipes
        };
        // ------------------------------------------------------- //
        return res.status(200).send(response);
    }
    catch (e) {
        return res.status(500).send(e);
    }
});
// Register
exports.router.post('/register', async (req, res) => {
    try {
        const { userName, password } = req.body;
        // Verify username is unique
        const document = db.collection('users').doc(userName);
        const user = await document.get();
        const userResponse = user.data();
        if (userResponse) {
            throw new Error("Error: User Name Taken!");
        }
        // Go through with the registration
        const id = (0, uuidv4_1.uuid)();
        await db.collection('users').doc('/' + userName + '/')
            .create({
            id,
            userName,
            password,
            inventory: {
                allItems: {},
                availableItems: [],
                cart: [],
                selectedInCart: []
            },
            recipes: {},
            activities: {},
            contacts: {},
            lastContactsUpdate: Date.now(),
            events: {}
        });
        return res.status(200).send();
    }
    catch (e) {
        return res.status(500).send(e);
    }
});
// Login
exports.router.post('/login', async (req, res) => {
    try {
        const { userName, password } = req.body;
        const document = db.collection('users').doc(userName);
        const userDocument = await document.get();
        const user = userDocument.data();
        if (!user) {
            throw new Error("Error: No such user");
        }
        else if (user.password !== password) {
            throw new Error("Error: Wrong password");
        }
        return res.status(200).send({
            data: user
        });
    }
    catch (e) {
        return res.status(500).send(e);
    }
});
// Save - DEPRECATED
exports.router.put('/save', async (req, res) => {
    try {
        const { userName, password, data } = req.body;
        const document = db.collection('users').doc(userName);
        const userDocument = await document.get();
        const user = userDocument.data();
        if (!user) {
            throw new Error("Error: No such user");
        }
        else if (user.password !== password) {
            throw new Error("Error: Wrong password");
        }
        await document.update({ data });
        return res.status(200).send();
    }
    catch (e) {
        return res.status(500).send(e.message);
    }
});
// Intercept un-matched routes
exports.router.get("*", async (req, res) => {
    res.status(404).send("This route does not exist.");
});
//# sourceMappingURL=index.js.map