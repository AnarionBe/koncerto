import {Op} from "sequelize";
import Place from "../models/place";

export const addPlace = (req, res) => {
    const {name, street, number, city, zipcode, link} = req.body;

    Place.create({
        name,
        street,
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

export const updatePlace = (req, res) => {
    const {name, street, number, city, zipcode, link} = req.body;
    const {id} = req.params;
    const update = {};

    Place.findByPk(id)
        .then(place => {
            name && (update.name = name);
            street && (update.street = street);
            number && (update.number = number);
            city && (update.city = city);
            zipcode && (update.zipcode = zipcode);
            link && (update.link = link);

            place
                .update(update)
                .then(updated => res.status(200).send(updated))
                .catch(err => res.status(400).send(err));
        })
        .catch(err => res.status(400).send(err));
};
