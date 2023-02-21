const Price = (sequelize, DataTypes) => {
    return sequelize.define(
        "price",
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },

            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            value: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: "price",
            timestamps: false,
        }
    );
};

module.exports = Price;
