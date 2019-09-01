// Image model

module.exports = (sequelize, DataTypes) => {

  const Image = sequelize.define("Image", {
    image_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    aws_image_key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.DECIMAL(14,9),
      allowNull: true,
    },
    lon: {
      type: DataTypes.DECIMAL(14,9),
      allowNull: true,
    },
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


  return Image;
};
