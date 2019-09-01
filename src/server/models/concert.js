import Sequelize from "sequelize";

const sequelize = new Sequelize("postgres://dev:dev@postgres:5432/postgres");
sequelize
    .authenticate()
    .then(() => console.log("Connection to DB ok !"))
    .catch(err => console.log("Error: ", err));

export default sequelize.define("concert", {
    artist: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    event: {
        type: Sequelize.DataTypes.UUID, // TODO: Check if compatible with SERIAL type
        allowNull: true,
    },
    date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
    },
    poster: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    genre: {
        type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING),
        allowNull: false,
    },
});
