"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const fb_1 = require("../../fb");
const getUserData_1 = require("../../utils/getUserData");
const verifyUser_1 = require("../../utils/verifyUser");
exports.router = express.Router();
const db = fb_1.default.firestore();
// Create New Contact
exports.router.post("/create", async (req, res) => {
    try {
        const { userName, password, newId, contact } = req.body;
        const document = db.collection('users').doc(userName);
        const user = await (0, getUserData_1.default)(document);
        if (!user) {
            throw new Error("Error: No such user");
        }
        (0, verifyUser_1.default)(user, password);
        // ------------------------------------------------------- //
        const contacts = Object.assign(Object.assign({}, user.contacts), { [newId]: contact });
        await document.update({ contacts });
        // ------------------------------------------------------- //
        return res.status(200).send();
    }
    catch (e) {
        return res.status(500).send(e);
    }
});
// Edit Existing Contact
exports.router.post("/edit", async (req, res) => {
    try {
        const { userName, password, id, contact } = req.body;
        const document = db.collection('users').doc(userName);
        const user = await (0, getUserData_1.default)(document);
        if (!user) {
            throw new Error("Error: No such user");
        }
        (0, verifyUser_1.default)(user, password);
        // ------------------------------------------------------- //
        const contacts = Object.assign(Object.assign({}, user.contacts), { [id]: contact });
        await document.update({ contacts });
        // ------------------------------------------------------- //
        return res.status(200).send();
    }
    catch (e) {
        return res.status(500).send(e);
    }
});
// Delete Existing Contact
exports.router.post("/delete", async (req, res) => {
    try {
        const { userName, password, id } = req.body;
        const document = db.collection('users').doc(userName);
        const user = await (0, getUserData_1.default)(document);
        if (!user) {
            throw new Error("Error: No such user");
        }
        (0, verifyUser_1.default)(user, password);
        // ------------------------------------------------------- //
        const contacts = Object.assign({}, user.contacts);
        delete contacts[id];
        await document.update({ contacts });
        // ------------------------------------------------------- //
        return res.status(200).send();
    }
    catch (e) {
        return res.status(500).send(e);
    }
});
// Update last contact time with this person
exports.router.post("/updateLast", async (req, res) => {
    try {
        const { userName, password, id } = req.body;
        const document = db.collection('users').doc(userName);
        const user = await (0, getUserData_1.default)(document);
        if (!user) {
            throw new Error("Error: No such user");
        }
        (0, verifyUser_1.default)(user, password);
        // ------------------------------------------------------- //
        const contacts = Object.assign({}, user.contacts);
        contacts[id].lastContact = Date.now();
        await document.update({ contacts });
        // ------------------------------------------------------- //
        return res.status(200).send();
    }
    catch (e) {
        return res.status(500).send(e);
    }
});
// Intercept un-matched routes
exports.router.get("*", async (req, res) => {
    res.status(404).send("This route does not exist.");
});
//# sourceMappingURL=index.js.map