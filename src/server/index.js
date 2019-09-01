import express from "express";

const app = express();

app.get("/", () => console.log("home sweet home"));

app.listen(3000, () => console.log("running on port 3000"));
