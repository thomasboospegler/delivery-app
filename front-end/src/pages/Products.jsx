import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
// import { useHistory } from 'react-router';
import { products } from '../api/products';
// import Context from '../context/Context';
import ProductCard from '../components/ProductCard';

export default function Products() {
//   const history = useHistory();
  const [productsData, setProduct] = useState('');

  const setStateProduct = async () => {
    const dataProducts = await products();
    return setProduct(dataProducts);
  };

  useEffect(() => {
    setStateProduct();
  }, []);

  return (
    <section>
      <Header />
      <div>
        {productsData && productsData.map((product, i) => (
          <ProductCard key={ `${product.id}-${i}` } product={ { ...product } } />
        ))}
      </div>
    </section>
  );
}
