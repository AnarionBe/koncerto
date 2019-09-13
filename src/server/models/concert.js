import Sequelize from "sequelize";
import Place from "./place";

const sequelize = new Sequelize("postgres://dev:dev@postgres:5432/postgres");

const Concert = sequelize.define("concert", {
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
    link: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
    },
    informations: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
    },
});

Concert.belongsTo(Place);

export default Concert;
