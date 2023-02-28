module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  },
  {
    tableName: 'users',
    underscored: true,
    timestamps: false,
  });

  User.associate = (models) => {
    User.hasMany(models.Sales, {
      as: 'user',
      foreignKey: 'userId',
    });
  };

  User.associate = (models) => {
    User.hasMany(models.Sales, {
      as: 'seller',
      foreignKey: 'sellerId',
    });
  };
  return User;
}
