import "@babel/polyfill";
import Sequelize from "sequelize";
import Artist from "../models/artist";
import Place from "../models/place";
import Concert from "../models/concert";

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
        await Artist.sync();
        await Place.sync();
        await Concert.sync();
    },
};
