import chai = require("chai");
import {DefaultColumn} from "../../src/queries/column/column-default";
import {Create} from "../../src/queries/create/create";
import {Insert} from "../../src/queries/insert";
import {Select} from "../../src/queries/select";
import {Update} from "../../src/queries/update";

const expect = chai.expect;

describe("Query", () => {

    it("Should create a select * query", () => {
        const select = Select.Table("users");
        expect(select.sql).to.be.eq("SELECT * FROM users");
    });

    it("Should create a select name query", () => {
        const select = Select.Properties("name").table("users");
        expect(select.sql).to.be.eq("SELECT name FROM users");
    });

    it("Should create a select name and password query", () => {
        const select = Select.Properties("name", "password").table("users");
        expect(select.sql).to.be.eq("SELECT name, password FROM users");
    });

    it("Should create a select query with a where", () => {
        const select = Select.Table("users").where("id = 1");
        expect(select.sql).to.be.eq("SELECT * FROM users WHERE id = 1");
    });

    it("Should throw a exception if none table is provided", () => {
        expect(() => {
            Select.Table("");
        }).to.throw(Error);
    });

    it("Should throw a exception if none where is provided", () => {
        expect(() => {
            Select.Table("USER").where("");
        }).to.throw(Error);
    });

    it("Should create a insert query", () => {
        const insert = Insert.InTo("user").fromModel({username: "toto", FirstName: "pierre", LastName: "test"});
        expect(insert.sql)
            .to.be.eq("INSERT INTO user (username, FirstName, LastName) VALUES ('toto', 'pierre', 'test')");
    });

    it("Should throw a exception if none valid table is provided in Insert", () => {
        expect(() => {
            Insert.InTo("");
        }).to.throw(Error);
    });

    it("Should throw a exception if none valid model is provided in Insert", () => {
        expect(() => {
            Insert.InTo("user").fromModel({});
        }).to.throw(Error);
        expect(() => {
            Insert.InTo("user").fromModel(undefined);
        }).to.throw(Error);
    });

    it("Should create a update query", () => {
        const update = Update.Table("user").fromModel({username: "toto", type: 2}).where("userId = 1");
        expect(update.sql).to.be.eq("UPDATE user SET username = 'toto', type = 2 WHERE userId = 1");
    });

    it("Should throw a exception if none valid table is provided in Update", () => {
        expect(() => {
            Update.Table("");
        }).to.throw(Error);
    });

    it("Should throw a exception if none valid where is provided in Update", () => {
        expect(() => {
            Update.Table("USER").where("");
        }).to.throw(Error);
    });

    it("Should create a table", () => {
        const create = Create.Table("chat")
            .withColumnName("id").asInt32().isIdentity()
            .withColumnName("race").asString().notNull()
            .withColumnName("name").asString(400).notNull()
            .withColumnName("cityNumber").asInt64().notNull()
            .withColumnName("text_t").asText().hasDefault("T_T")
            .withColumnName("float_t").asFloat()
            .withColumnName("decimal_t").asDecimal()
            .withColumnName("decimal_set_t").asDecimal(10, 4)
            .withColumnName("date_t").asDate().hasDefault(DefaultColumn.LOCALTIME)
            .withColumnName("datetime_t").asDateTime().hasDefault(DefaultColumn.LOCALTIMESTAMP)
            .withColumnName("timestamp_t").asTimestamp().hasDefault(DefaultColumn.CURRENT_TIMESTAMP)
            .withColumnName("nullable_t").asBoolean().hasDefault(DefaultColumn.NULL);

        expect(create.toString())
            .to.be.eq("CREATE TABLE chat ( id INT NOT NULL AUTO_INCREMENT PRIMARY KEY," +
            " race VARCHAR(255) NOT NULL, name VARCHAR(400) NOT NULL, cityNumber BIGINT NOT NULL, " +
            "text_t TEXT DEFAULT 'T_T', float_t FLOAT, decimal_t DECIMAL, decimal_set_t DECIMAL(10,4), " +
            "date_t DATE DEFAULT LOCALTIME, datetime_t DATETIME DEFAULT LOCALTIMESTAMP, " +
            "timestamp_t TIMESTAMP DEFAULT CURRENT_TIMESTAMP, nullable_t BOOLEAN DEFAULT NULL)");
    });

    it("Should create a table with foreign key with default name", () => {
        const createFk = Create.Table("users")
            .withColumnName("id").asInt32().isIdentity()
            .withColumnName("contact_id").asInt32().notNull()
            .withForeignKey("contact_id", "contacts", "id");

        expect(createFk.toString()).to.be.eq("CREATE TABLE users ( id INT NOT NULL AUTO_INCREMENT PRIMARY KEY," +
            " contact_id INT NOT NULL, FOREIGN KEY fk_contact_id_contacts(contact_id) REFERENCES contacts(id))");
    });

    it("Should create a table with foreign key with custom name", () => {
        const createFk = Create.Table("users")
            .withColumnName("id").asInt32().isIdentity()
            .withColumnName("contact_id").asInt32().notNull()
            .withForeignKey("contact_id", "contacts", "id", "my_super_fk");

        expect(createFk.toString()).to.be.eq("CREATE TABLE users ( id INT NOT NULL AUTO_INCREMENT PRIMARY KEY," +
            " contact_id INT NOT NULL, FOREIGN KEY my_super_fk(contact_id) REFERENCES contacts(id))");
    });

    it("Should throw a error when property of the foreign key is not valid", () => {
        expect(() => {
            Create.Table("users")
                .withColumnName("id").asInt32().isIdentity()
                .withColumnName("contact_id").asInt32().notNull()
                .withForeignKey("", "contacts", "id");
        }).to.throw(Error);
    });

    it("Should throw a error when property of the foreign key is not defined", () => {
        expect(() => {
            Create.Table("users")
                .withColumnName("id").asInt32().isIdentity()
                .withColumnName("contact_id").asInt32().notNull()
                .withForeignKey("c_id", "contacts", "id");
        }).to.throw(Error);
    });

    it("Should throw a error when parent table of the foreign key is not set", () => {
        expect(() => {
            Create.Table("users")
                .withColumnName("id").asInt32().isIdentity()
                .withColumnName("contact_id").asInt32().notNull()
                .withForeignKey("c_id", "", "id");
        }).to.throw(Error);
    });

    it("Should throw a error when parent column of the foreign key is not set", () => {
        expect(() => {
            Create.Table("users")
                .withColumnName("id").asInt32().isIdentity()
                .withColumnName("contact_id").asInt32().notNull()
                .withForeignKey("c_id", "contacts", "");
        }).to.throw(Error);
    });
});
