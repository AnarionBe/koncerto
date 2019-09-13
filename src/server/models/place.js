import Sequelize from "sequelize";

const sequelize = new Sequelize("postgres://dev:dev@postgres:5432/postgres");

export default sequelize.define("place", {
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    road: {
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
});
