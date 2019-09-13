import express from "express";
import Sequelize from "sequelize";
import Concert from "./models/concert";
import Place from "./models/place";
import concertsRoutes from "./routes/concert";

const app = express();

const sequelize = new Sequelize("postgres://dev:dev@postgres:5432/postgres");
sequelize
    .authenticate()
    .then(() => console.log("Connection to DB ok !"))
    .catch(err => console.log("Error: ", err));

Place.sync();
Concert.sync();

app.use("/api/concerts", concertsRoutes);

app.get("/", () => console.log("home sweet home"));

app.listen(12345, () => console.log("running on port 3000"));
