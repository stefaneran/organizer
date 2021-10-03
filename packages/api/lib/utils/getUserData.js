"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async (document) => {
    const userDocument = await document.get();
    const user = userDocument.data();
    return user;
};
//# sourceMappingURL=getUserData.js.map