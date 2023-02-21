const Forfait = (sequelize, DataTypes) => {
    return sequelize.define(
        "forfait",
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },

            departure: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            destination: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },

            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: "forfait",
            timestamps: false,
        }
    );
};

module.exports = Forfait;
