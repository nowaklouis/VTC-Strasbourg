const infoTrajets = (sequelize, DataTypes) => {
  return sequelize.define(
    "infoTrajets",
    {
      name: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },

      line1: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      line2: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      line3: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      line4: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      line5: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      line6: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      line7: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "infoTrajets",
      timestamps: false,
    }
  );
};

module.exports = infoTrajets;
