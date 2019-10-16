// Trail model

module.exports = (sequelize, DataTypes) => {

  const Trail = sequelize.define("Trail", {
    trail_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    trail_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    trail_desc_short: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    trail_desc_long: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    trail_rating: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
    },
    trail_diff: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
    },
    trail_length_meters: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true,
    },
    trail_length_miles: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true,
    },
    trail_color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    connector_trail: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    loop_trail: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    one_way_trail: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    out_and_back: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    family: {
      type: DataTypes.STRING,
      default: false,
    },
    hiking: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    mtb: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    walking: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    jogging: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    trail_running: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    biking: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    pets: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    gravel: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    paved: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    single_track: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    mulch: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    sidewalk: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    dirt: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    grass: {
      type: DataTypes.BOOLEAN,
      default: false,
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
      //   associate: function(models) {
      //     Trail.belongsTo(models.Park,
      //       {
      //         foreignKey: "fk_park_id",
      //         targetKey: "park_id",
      //         onDelete: "cascade"
      //       }
      //     ),
      //     Trail.hasMany(models.Track,
      //     {
      //       foreignKey: "fk_trail_id",
      //       sourceKey: "trail_id",
      //       onDelete: "cascade"
      //     }
      //   )
        // }
      // }
    }, { underscored: true });


  return Trail;
};
