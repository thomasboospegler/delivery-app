module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(10,2),
    urlImage: DataTypes.STRING,
  },
  {
    tableName: 'products',
    underscored: true,
    timestamps: false,
  },
  );
  
  // Products.associate = (models) => {
  //   Products.hasMany(models.SalesProducts,
  //     {
  //       as: 'product',
  //       foreignKey: 'productId',
  //     },
  //   );
  // };
  return Products;
}
