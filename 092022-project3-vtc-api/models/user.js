const User = (sequelize, DataTypes) => {
  return sequelize.define(
    "user",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(180),
        allowNull: false,
        unique: "UNIQ_8D93D649E7927C74",
      },
      hashedpassword: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      firstname: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      birthday: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      adress: {
        type: DataTypes.STRING(180),
        allowNull: false,
      },
      zipcode: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING(180),
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING(180),
        allowNull: false,
      },
      offer: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    },

    {
      sequelize,
      tableName: "user",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "UNIQ_8D93D649E7927C74",
          unique: true,
          using: "BTREE",
          fields: [{ name: "email" }],
        },
      ],
    }
  );
};

module.exports = User;
