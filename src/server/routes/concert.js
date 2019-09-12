import express from "express";
import multer from "multer";
import {Op} from "sequelize";
import path from "path";
import fs from "fs";

import Concert from "../models/concert";

const router = express.Router();
const multParse = multer({dest: "/uploads"});

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
 * URI: /api/concerts/finished
 * METHOD: GET
 * ACTION: List all finished concerts
 * PARAMS: none
 */
router.get("/finished", (_, res) => {
    Concert.findAll({where: {date: {[Op.lt]: Date.now()}}})
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
    const {artist, event, date, hour, place, link, informations} = req.body;
    const poster = req.file;
    const formatDate = new Date(date);

    if (formatDate < Date.now()) {
        res.status(400).json({
            status: "Invalid date",
            message: "The given date must be higher than the current date !",
        });
        return;
    }

    let targetPath = ""; // TODO: put a default image path

    if (poster) {
        const fileName = `${Date.now()}.png`;
        targetPath = path.join(__dirname, `../../uploads/${fileName}`);
        fs.readFile(poster.path, (err, data) => {
            if (err) {
                res.status(400).json({
                    status: "Can't read image",
                    message: "The given image can't be readed !",
                });
                return;
            }
            fs.writeFileSync(targetPath, data);
        });
    }

    Concert.create({
        artist,
        event,
        date: formatDate,
        hour,
        place,
        link,
        informations,
        poster: targetPath,
    })
        .then(concert => res.status(200).send(concert))
        .catch(err => res.status(400).send(err));
});

/*
 * URI: /api/concerts/:id
 * METHOD: PUT
 * ACTION: update target concert
 * PARAMS:  params:id -> concert id
 *          body -> concert informations
 */
// FIXME: (node:477) Warning: a promise was created in a handler at src/app/bin/server/routes/concert.js:183:17 but was not returned from it, see http://goo.gl/rRqMUw
router.put("/:id", multParse.single("poster"), (req, res) => {
    const {artist, event, date, hour, place, link, informations} = req.body;
    const {id} = req.params;
    const poster = req.file;
    const update = {};

    if (date) {
        const formatDate = new Date(date);
        if (formatDate < Date.now()) {
            res.status(400).json({
                status: "Invalid date",
                message:
                    "The given date must be higher than the current date !",
            });
        }
        update.date = date;
    }

    Concert.findByPk(id)
        .then(concert => {
            hour && (update.hour = hour);
            artist && (update.artist = artist);
            event && (update.event = event);
            place && (update.place = place);
            link && (update.link = link);
            informations && (update.informations = informations);

            if (poster) {
                if (concert.poster === "/src/app/bin/uploads/default.png") {
                    const fileName = `${Date.now()}.png`;
                    const targetPath = path.join(
                        __dirname,
                        `../../uploads/${fileName}`,
                    );
                    fs.readFile(poster.path, (err, data) => {
                        if (err) {
                            res.status(400).json({
                                status: "Can't read image",
                                message: "The given image can't be readed !",
                            });
                            return;
                        }
                        fs.writeFileSync(targetPath, data);
                        update.poster = targetPath;
                    });
                } else {
                    fs.readFile(poster.path, (err, data) => {
                        if (!err) {
                            fs.writeFileSync(concert.poster, data);
                        }
                    });
                }
            }
            concert
                .update(update)
                .then(updated => res.status(200).send(updated))
                .catch(err => res.status(400).send(err));
        })
        .catch(err => res.status(400).send(err));
});

/*
 * URI: /api/concerts/:id
 * METHOD: DELETE
 * ACTION: Delete target concert
 * PARAMS: id -> concert id
 */
router.delete("/:id", (req, res) => {
    Concert.findByPk(req.params.id)
        .then(concert => {
            concert
                .destroy()
                .then(() => res.status(200).send(concert))
                .catch(err => res.status(400).send(err));
        })
        .catch(err => res.status(400).send(err));
});

/*
 * URI: /api/concerts/poster/:path
 * METHOD: GET
 * ACTION: Get the concert poster
 * PARAMS: query.poster -> path to the poster
 */
router.get("/poster", (req, res) => {
    res.status(200).sendFile(req.query.poster);
});

export default router;
