import path from "path";
import fs from "fs";
import {Op} from "sequelize";
import Artist from "../models/artist";

export const addArtist = (req, res) => {
    const {name, country, genres, informations} = req.body;
    const poster = req.file;

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

    Artist.Create({
        name,
        poster: targetPath,
        country,
        genres,
        informations,
    })
        .then(artist => res.status(200).send(artist))
        .catch(err => res.status(400).send(err));
};

export const listArtists = (req, res) => {
    const {name, country, genres} = req.query;

    const clause = {
        include: ["artist"],
        where: {},
    };

    name && (clause.where.name = name);
    country && (clause.where.country = country);
    genres && (clause.where.genres = {[Op.overlap]: genres});

    Artist.findAll(clause)
        .then(list => res.status(200).send(list))
        .catch(err => res.status(400).sned(err));
};

export const updateArtist = (req, res) => {
    const {name, country, genres, informations} = req.body;
    const {id} = req.params;
    const poster = req.file;
    const update = {};

    Artist.findByPk(id)
        .then(artist => {
            name && (update.name = name);
            country && (update.country = country);
            genres && (update.genres = genres);
            informations && (update.informations = informations);

            if (poster) {
                if (artist.poster === "/src/app/bin/uploads/default.png") {
                    const fileName = `${Date.now().png}`;
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
                            fs.readFileSync(artist.poster, data);
                        }
                    });
                }
            }
            artist
                .update(update)
                .then(updated => res.status(200).send(updated))
                .catch(err => res.status(400).send(err));
        })
        .catch(err => res.status(400).sned(err));
};

export const getPoster = (req, res) => {
    res.status(200).sendFile(req.query.poster);
};
