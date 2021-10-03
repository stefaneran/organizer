"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const fb_1 = require("../../fb");
const getUserData_1 = require("../../utils/getUserData");
const verifyUser_1 = require("../../utils/verifyUser");
exports.router = express.Router();
const db = fb_1.default.firestore();
exports.router.post("/add", async (req, res) => {
    try {
        const { userName, password, newId, recipe } = req.body;
        const document = db.collection('users').doc(userName);
        const user = await (0, getUserData_1.default)(document);
        if (!user) {
            throw new Error("Error: No such user");
        }
        (0, verifyUser_1.default)(user, password);
        // ------------------------------------------------------- //
        const recipes = Object.assign(Object.assign({}, user.recipes), { [newId]: recipe });
        await document.update({ recipes });
        // ------------------------------------------------------- //
        return res.status(200).send();
    }
    catch (e) {
        return res.status(500).send(e);
    }
});
exports.router.post("/edit", async (req, res) => {
    try {
        const { userName, password, recipeId, recipe } = req.body;
        const document = db.collection('users').doc(userName);
        const user = await (0, getUserData_1.default)(document);
        if (!user) {
            throw new Error("Error: No such user");
        }
        (0, verifyUser_1.default)(user, password);
        // ------------------------------------------------------- //
        const recipes = Object.assign({}, user.recipes);
        recipes[recipeId] = recipe;
        await document.update({ recipes });
        // ------------------------------------------------------- //
        return res.status(200).send();
    }
    catch (e) {
        return res.status(500).send(e);
    }
});
exports.router.post("/delete", async (req, res) => {
    try {
        const { userName, password, recipeId } = req.body;
        const document = db.collection('users').doc(userName);
        const user = await (0, getUserData_1.default)(document);
        if (!user) {
            throw new Error("Error: No such user");
        }
        (0, verifyUser_1.default)(user, password);
        // ------------------------------------------------------- //
        const recipes = Object.assign({}, user.recipes);
        delete recipes[recipeId];
        await document.update({ recipes });
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