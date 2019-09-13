import Sequelize from "sequelize";
import db from "../utils/database";

const sequelize = db.connect();

export default sequelize.define("place", {
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    street: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    number: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    city: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    zipcode: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
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
