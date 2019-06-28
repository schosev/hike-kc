// Park model

module.exports = (sequelize, DataTypes) => {

  const Park = sequelize.define("Park", {
    park_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    park_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    park_address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    park_desc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    park_rating: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
    },
    park_lon: {
      type: DataTypes.DECIMAL(10,4),
      allowNull: true,
    },
    park_lat: {
      type: DataTypes.DECIMAL(10,4),
      allowNull: true,
    },
    park_elev: {
      type: DataTypes.INTEGER,
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
      //   associate: function(models) {
      //     Park.hasMany(models.Trail,
      //     {
      //       foreignKey: "fk_park_id",
      //       sourceKey: "park_id",
      //       onDelete: "cascade"
      //     }
      //   )
      //   }
      // }
    }, { underscored: true });


  return Park;
};
