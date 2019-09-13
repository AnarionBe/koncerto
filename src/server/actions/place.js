import {Op} from "sequelize";
import Place from "../models/place";

export const addPlace = (req, res) => {
    const {name, road, number, city, zipcode, link} = req.body;

    Place.create({
        name,
        road,
        number,
        city,
        zipcode,
        link,
    })
        .then(place => res.status(200).send(place))
        .catch(err => res.status(400).send(err));
};

export const getPlaces = (req, res) => {
    const {name, zipcode} = req.query;

    const clause = {where: {}};

    name && (clause.where.name = {[Op.iLike]: `%${name}%`});
    zipcode && (clause.where.zipcode = zipcode);

    Place.findAll(clause)
        .then(list => res.status(200).send(list))
        .catch(err => res.status(400).send(err));
};
