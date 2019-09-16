import Sequelize from "sequelize";
// import db from "../utils/database";

// FIXME: const sequelize = db.connect();
const sequelize = new Sequelize("postgres://dev:dev@postgres:5432/postgres");

const Artist = sequelize.define("artist", {
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    poster: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
    },
    country: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
    },
    genres: {
        type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING),
        allowNull: false,
    },
    information: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
    },
});

Artist.hasMany(Artist);

export default Artist;
