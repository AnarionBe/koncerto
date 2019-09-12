import Sequelize from "sequelize";

const sequelize = new Sequelize("postgres://dev:dev@postgres:5432/postgres");

export default sequelize.define("concert", {
    artist: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true, // TODO: set to false when add artist implemented
    },
    event: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
    },
    date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
    },
    hour: {
        type: Sequelize.DataTypes.TIME,
        allowNull: false,
    },
    poster: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
    },
    place: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true, // TODO: set to false when add artist implemented
    },
    link: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    informations: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
    },
});
