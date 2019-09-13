import path from "path";
import fs from "fs";
import {Op} from "sequelize";
import Concert from "../models/concert";

export const listConcerts = (req, res) => {
    const {artist, event, date, hour, place, showFinished} = req.query;
    const clause = {
        include: ["place"],
        where: {},
    };
    const formatDate = new Date(date);

    artist && (clause.where.artist = artist);
    event && (clause.where.event = event);
    date && (clause.where.date = formatDate);
    hour && (clause.where.hour = hour);
    place && (clause.where.placeId = place);
    if (!showFinished && !date) {
        clause.where.date = {[Op.gt]: Date.now()};
    }

    Concert.findAll(clause)
        .then(list => res.status(200).send(list))
        .catch(err => res.status(400).send(err));
};

export const addConcert = (req, res) => {
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
        placeId: place,
        link,
        informations,
        poster: targetPath,
    })
        .then(concert => res.status(200).send(concert))
        .catch(err => res.status(400).send(err));
};

// FIXME: (node:477) Warning: a promise was created in a handler at src/app/bin/server/routes/concert.js:183:17 but was not returned from it, see http://goo.gl/rRqMUw
export const updateConcert = (req, res) => {
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
};

export const deleteConcert = (req, res) => {
    Concert.findByPk(req.params.id)
        .then(concert => {
            concert
                .destroy()
                .then(() => res.status(200).send(concert))
                .catch(err => res.status(400).send(err));
        })
        .catch(err => res.status(400).send(err));
};

export const getPoster = (req, res) => {
    res.status(200).sendFile(req.query.poster);
};
