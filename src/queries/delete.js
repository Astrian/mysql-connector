"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("./query");
class Delete extends query_1.Query {
    static From(table) {
        if (!table) {
            throw new Error("no valid table was provided");
        }
        const del = new Delete();
        del.sql += ` FROM ${table.trim()}`;
        return del;
    }
    constructor() {
        super();
        this.sql = "DELETE";
    }
    where(clause) {
        if (!clause) {
            throw new Error("no valid clause was provided");
        }
        this.sql += ` WHERE ${clause.trim()}`;
        return this;
    }
}
exports.Delete = Delete;
//# sourceMappingURL=delete.js.map