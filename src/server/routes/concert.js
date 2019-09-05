import express from "express";
import multer from "multer";
import {Op} from "sequelize";

import Concert from "../models/concert";

const router = express.Router();
const multParse = multer();

/*
 * URI: /api/concerts
 * METHOD: GET
 * ACTION: List all concerts of database not happened yet
 * PARAMS: none
 */
router.get("/", (_, res) => {
    Concert.findAll({where: {date: {[Op.gt]: Date.now()}}})
        .then(list => res.status(200).send(list))
        .catch(err => res.status(400).send(err));
});

/*
 * URI: /api/concerts
 * METHOD: POST
 * ACTION: Add concert to database
 * PARAMS: Concert informations
 */
router.post("/", multParse.single("poster"), (req, res) => {
    const {artist, event, date, place, link, informations} = req.body;
    const formatDate = new Date(date);
    const poster = req.file;

    if (formatDate < Date.now()) {
        res.status(400).json({
            status: "Invalid date",
            message: "The given date must be higher than the current date !",
        });
        return;
    }

    Concert.create({
        artist,
        event,
        date: formatDate,
        place,
        link,
        informations,
        poster,
    })
        .then(concert => res.status(200).send(concert))
        .catch(err => res.status(400).send(err));
});

export default router;
