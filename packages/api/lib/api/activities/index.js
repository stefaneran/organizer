"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const fb_1 = require("../../fb");
const getUserData_1 = require("../../utils/getUserData");
const verifyUser_1 = require("../../utils/verifyUser");
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
        const activities = user.activities || {};
        // ------------------------------------------------------- //
        return res.status(200).send(activities);
    }
    catch (e) {
        return res.status(500).send(e);
    }
});
// Create New Activity
exports.router.post("/create", async (req, res) => {
    try {
        const { userName, password, newId, activity } = req.body;
        const document = db.collection('users').doc(userName);
        const user = await (0, getUserData_1.default)(document);
        if (!user) {
            throw new Error("Error: No such user");
        }
        (0, verifyUser_1.default)(user, password);
        // ------------------------------------------------------- //
        const activities = Object.assign(Object.assign({}, user.activities), { [newId]: activity });
        await document.update({ activities });
        // ------------------------------------------------------- //
        return res.status(200).send();
    }
    catch (e) {
        return res.status(500).send(e);
    }
});
// Edit Existing Activity
exports.router.post("/edit", async (req, res) => {
    try {
        const { userName, password, id, activity } = req.body;
        const document = db.collection('users').doc(userName);
        const user = await (0, getUserData_1.default)(document);
        if (!user) {
            throw new Error("Error: No such user");
        }
        (0, verifyUser_1.default)(user, password);
        // ------------------------------------------------------- //
        const activities = Object.assign(Object.assign({}, user.activities), { [id]: activity });
        await document.update({ activities });
        // ------------------------------------------------------- //
        return res.status(200).send();
    }
    catch (e) {
        return res.status(500).send(e);
    }
});
// Delete Existing Activity
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
        const activities = Object.assign({}, user.activities);
        delete activities[id];
        await document.update({ activities });
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