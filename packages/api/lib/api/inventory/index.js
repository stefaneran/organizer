"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const fb_1 = require("../../fb");
const getUserData_1 = require("../../utils/getUserData");
const verifyUser_1 = require("../../utils/verifyUser");
const updateRecipesAfterItemDelete_1 = require("../../utils/updateRecipesAfterItemDelete");
exports.router = express.Router();
const db = fb_1.default.firestore();
exports.router.post("/setItem", async (req, res) => {
    try {
        const { userName, password, itemId, item } = req.body;
        const document = db.collection('users').doc(userName);
        const user = await (0, getUserData_1.default)(document);
        if (!user) {
            throw new Error("Error: No such user");
        }
        (0, verifyUser_1.default)(user, password);
        // ------------------------------------------------------- //
        const inventory = Object.assign({}, user.inventory);
        inventory.allItems[itemId] = item;
        await document.update({ inventory });
        // ------------------------------------------------------- //
        return res.status(200).send();
    }
    catch (e) {
        return res.status(500).send(e);
    }
});
exports.router.post("/deleteItem", async (req, res) => {
    try {
        const { userName, password, itemIds } = req.body;
        const document = db.collection('users').doc(userName);
        const user = await (0, getUserData_1.default)(document);
        if (!user) {
            throw new Error("Error: No such user");
        }
        (0, verifyUser_1.default)(user, password);
        // ------------------------------------------------------- //
        const inventory = Object.assign({}, user.inventory);
        itemIds.forEach((itemId) => {
            delete inventory.allItems[itemId];
        });
        inventory.availableItems =
            inventory.availableItems.filter((itemId) => !itemIds.includes(itemId));
        inventory.cart =
            inventory.cart.filter((itemId) => !itemIds.includes(itemId));
        inventory.selectedInCart =
            inventory.selectedInCart.filter((itemId) => !itemIds.includes(itemId));
        // Remove from any recipes that may contain this item as an ingredient
        const { recipes, hasChanges, changes } = (0, updateRecipesAfterItemDelete_1.default)(user.recipes, itemIds);
        await document.update({ inventory, recipes });
        // ------------------------------------------------------- //
        return res.status(200).send({ itemIds, hasChanges, changes });
    }
    catch (e) {
        return res.status(500).send(e);
    }
});
exports.router.post("/addAvailable", async (req, res) => {
    try {
        const { userName, password, itemIds } = req.body;
        const document = db.collection('users').doc(userName);
        const user = await (0, getUserData_1.default)(document);
        if (!user) {
            throw new Error("Error: No such user");
        }
        (0, verifyUser_1.default)(user, password);
        // ------------------------------------------------------- //
        const inventory = Object.assign({}, user.inventory);
        itemIds.forEach((itemId) => {
            if (!inventory.availableItems.includes(itemId)) {
                inventory.availableItems.push(itemId);
            }
        });
        await document.update({ inventory });
        // ------------------------------------------------------- //
        return res.status(200).send();
    }
    catch (e) {
        return res.status(500).send(e);
    }
});
exports.router.post("/removeAvailable", async (req, res) => {
    try {
        const { userName, password, itemIds } = req.body;
        const document = db.collection('users').doc(userName);
        const user = await (0, getUserData_1.default)(document);
        if (!user) {
            throw new Error("Error: No such user");
        }
        (0, verifyUser_1.default)(user, password);
        // ------------------------------------------------------- //
        const inventory = Object.assign({}, user.inventory);
        inventory.availableItems =
            inventory.availableItems.filter((itemId) => !itemIds.includes(itemId));
        await document.update({ inventory });
        // ------------------------------------------------------- //
        return res.status(200).send();
    }
    catch (e) {
        return res.status(500).send(e);
    }
});
exports.router.post("/addCart", async (req, res) => {
    try {
        const { userName, password, itemIds } = req.body;
        const document = db.collection('users').doc(userName);
        const user = await (0, getUserData_1.default)(document);
        if (!user) {
            throw new Error("Error: No such user");
        }
        (0, verifyUser_1.default)(user, password);
        // ------------------------------------------------------- //
        const inventory = Object.assign({}, user.inventory);
        itemIds.forEach((itemId) => {
            if (!inventory.cart.includes(itemId)) {
                inventory.cart.push(itemId);
            }
        });
        await document.update({ inventory });
        // ------------------------------------------------------- //
        return res.status(200).send();
    }
    catch (e) {
        return res.status(500).send(e);
    }
});
exports.router.post("/removeCart", async (req, res) => {
    try {
        const { userName, password, itemIds } = req.body;
        const document = db.collection('users').doc(userName);
        const user = await (0, getUserData_1.default)(document);
        if (!user) {
            throw new Error("Error: No such user");
        }
        (0, verifyUser_1.default)(user, password);
        // ------------------------------------------------------- //
        const inventory = Object.assign({}, user.inventory);
        inventory.cart =
            inventory.cart.filter((itemId) => !itemIds.includes(itemId));
        inventory.selectedInCart =
            inventory.selectedInCart.filter((itemId) => !itemIds.includes(itemId));
        await document.update({ inventory });
        // ------------------------------------------------------- //
        return res.status(200).send();
    }
    catch (e) {
        return res.status(500).send(e);
    }
});
exports.router.post("/updateSelectedCart", async (req, res) => {
    try {
        const { userName, password, selected } = req.body;
        const document = db.collection('users').doc(userName);
        const user = await (0, getUserData_1.default)(document);
        if (!user) {
            throw new Error("Error: No such user");
        }
        (0, verifyUser_1.default)(user, password);
        // ------------------------------------------------------- //
        const inventory = Object.assign({}, user.inventory);
        inventory.selectedInCart = selected;
        await document.update({ inventory });
        // ------------------------------------------------------- //
        return res.status(200).send();
    }
    catch (e) {
        return res.status(500).send(e);
    }
});
exports.router.post("/finishShopping", async (req, res) => {
    try {
        const { userName, password } = req.body;
        const document = db.collection('users').doc(userName);
        const user = await (0, getUserData_1.default)(document);
        if (!user) {
            throw new Error("Error: No such user");
        }
        (0, verifyUser_1.default)(user, password);
        // ------------------------------------------------------- //
        const inventory = Object.assign({}, user.inventory);
        const onlyChecked = Boolean(inventory.selectedInCart.length);
        inventory.cart.forEach((itemId) => {
            const notAvailable = !inventory.availableItems.includes(itemId);
            const isSelected = inventory.selectedInCart.includes(itemId);
            if (onlyChecked && isSelected && notAvailable) {
                inventory.availableItems.push(itemId);
            }
            else if (!onlyChecked && notAvailable) {
                inventory.availableItems.push(itemId);
            }
        });
        if (onlyChecked) {
            inventory.cart =
                inventory.cart.filter((itemId) => !inventory.selectedInCart.includes(itemId));
            inventory.selectedInCart = [];
        }
        else {
            inventory.cart = [];
        }
        await document.update({ inventory });
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