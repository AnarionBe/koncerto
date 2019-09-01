import express from "express";
import Concert from "./models/concert";

const app = express();

// const sequelize = new Sequelize("postgres://dev:dev@postgres:5432/postgres");
// sequelize
//     .authenticate()
//     .then(() => console.log("Connection to DB ok !"))
//     .catch(err => console.log("Error: ", err));

Concert.sync();

app.get("/", () => console.log("home sweet home"));

app.listen(3000, () => console.log("running on port 3000"));
