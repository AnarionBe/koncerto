import express from "express";
import concertsRoutes from "./routes/concert";
import placesRoutes from "./routes/place";
import db from "./utils/database";

const app = express();

const sequelize = db.connect();
db.auth(sequelize);
db.sync();

app.use("/api/concerts", concertsRoutes);
app.use("/api/places", placesRoutes);

app.get("/", () => console.log("home sweet home"));

app.listen(12345, () => console.log("running on port 3000"));
