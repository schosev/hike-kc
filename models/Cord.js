// Cord model

module.exports = (sequelize, DataTypes) => {

  const Cord = sequelize.define("Cord", {
    cord_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    lat: {
      type: DataTypes.DECIMAL(14,9),
      allowNull: true,
    },
    lon: {
      type: DataTypes.DECIMAL(14,9),
      allowNull: true,
    },
    distance: {
      type: DataTypes.DECIMAL(10,4),
      allowNull: true,
    },
    elev: {
      type: DataTypes.DECIMAL(10,4),
      allowNull: true,
    },
    ascent: {
      type: DataTypes.DECIMAL(10,4),
      allowNull: true,
    },
    descent: {
      type: DataTypes.DECIMAL(10,4),
      allowNull: true,
    },
    // created_at: {
    //   type: sequelize.DATE(3),
    //   defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
    // },
    //  updated_at: {
    //   type: sequelize.DATE(3),
    //   defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
    // },
  }, {
      // classMethods: {
      //   associate(models) {
      //     Cord.belongsTo(models.Track,
      //     {
      //       foreignKey: "fk_track_id",
      //       targetKey: "track_id",
      //       onDelete: "cascade"
      //     }
      //   )
      //   }
      // }
    }, { underscored: true });


  return Cord;
};
