import Place from "../models/place";
import Concert from "../models/concert";
import "@babel/polyfill";
import Sequelize from "sequelize";

export default {
    connect() {
        return new Sequelize("postgres://dev:dev@postgres:5432/postgres");
    },
    auth(db) {
        db.authenticate()
            .then(() => console.log("Connection to DB ok !"))
            .catch(err => console.log("Error: ", err));
    },
    async sync() {
        await Place.sync();
        await Concert.sync();
    },
};
