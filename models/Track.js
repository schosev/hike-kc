// Track model

module.exports = (sequelize, DataTypes) => {

  const Track = sequelize.define("Track", {
    track_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // trail_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   autoIncrement: false
    // },
    track_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // created_at: {
    //   type: Sequelize.DATE(3),
    //   defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
    // },
    //  updated_at: {
    //   type: Sequelize.DATE(3),
    //   defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
    // },
  }, {
      // classMethods: {
      //   associate(models) {
      //     Track.belongsTo(models.Trail,
      //     {
      //       foreignKey: "fk_trail_id",
      //       targetKey: "trail_id",
      //       onDelete: "cascade"
      //     }
      //   ),
      //   Track.hasMany(models.Cord,
      //     {
      //       foreignKey: "fk_track_id",
      //       sourceKey: "track_id",
      //       onDelete: "cascade"
      //     }
      //   )
        // }
      // }
    }, { underscored: true });


  return Track;
};
