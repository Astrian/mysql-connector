"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../query");
const column_data_type_1 = require("./column-data-type");
const column_default_1 = require("./column-default");
class Column extends query_1.Query {
    constructor() {
        super(...arguments);
        this.columns = 0;
    }
    withColumnName(name) {
        if (!name) {
            throw new Error("invalid columns name");
        }
        this.sql += `${this.columns > 0 ? "," : ""} ${name.trim()}`;
        this.columns++;
        return this;
    }
    asInt32() {
        this.sql += ` ${column_data_type_1.ColumnDataType.INT}`;
        return this;
    }
    asInt64() {
        this.sql += ` ${column_data_type_1.ColumnDataType.BIGINT}`;
        return this;
    }
    asBoolean() {
        this.sql += ` ${column_data_type_1.ColumnDataType.BOOLEAN}`;
        return this;
    }
    asString(length) {
        this.sql += ` ${column_data_type_1.ColumnDataType.STRING}(${length ? length : "255"})`;
        return this;
    }
    isIdentity() {
        this.sql += ` NOT NULL AUTO_INCREMENT PRIMARY KEY`;
        return this;
    }
    notNull() {
        this.sql += ` NOT NULL`;
        return this;
    }
    asFloat() {
        this.sql += ` ${column_data_type_1.ColumnDataType.FLOAT}`;
        return this;
    }
    asDecimal(n, n2) {
        this.sql += ` ${column_data_type_1.ColumnDataType.DECIMAL}${n && n2 ? "(" + n + "," + n2 + ")" : ""}`;
        return this;
    }
    asDouble() {
        this.sql += ` ${column_data_type_1.ColumnDataType.DOUBLE}`;
        return this;
    }
    asDate() {
        this.sql += ` ${column_data_type_1.ColumnDataType.DATE}`;
        return this;
    }
    asDateTime() {
        this.sql += ` ${column_data_type_1.ColumnDataType.DATETIME}`;
        return this;
    }
    asTimestamp() {
        this.sql += ` ${column_data_type_1.ColumnDataType.TIMESTAMP}`;
        return this;
    }
    asText() {
        this.sql += ` ${column_data_type_1.ColumnDataType.TEXT}`;
        return this;
    }
    hasDefault(def) {
        if (!def) {
            throw new Error("invalid default value");
        }
        const m = column_default_1.DefaultColumn[def];
        if (m) {
            this.sql += ` DEFAULT ${def.toString()}`;
        }
        else {
            this.sql += ` DEFAULT ${typeof def === "string" ? "'" + def + "'" : def.toString()}`;
        }
        return this;
    }
}
exports.Column = Column;
//# sourceMappingURL=column.js.map