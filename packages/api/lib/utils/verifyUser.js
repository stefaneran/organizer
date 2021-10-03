"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (user, password) => {
    if (user && user.password !== password) {
        throw new Error("Error: Wrong password");
    }
};
//# sourceMappingURL=verifyUser.js.map