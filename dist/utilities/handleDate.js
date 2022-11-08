"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDate = void 0;
function handleDate(date) {
    const handleDate = date.split("/");
    const finalDate = handleDate[0] + "-" + handleDate[1] + "-" + handleDate[3];
    return parseInt(finalDate);
}
exports.handleDate = handleDate;
