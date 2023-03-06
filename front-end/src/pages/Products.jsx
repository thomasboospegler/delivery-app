import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { products } from '../api/products';
import Context from '../context/Context';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const history = useHistory();
  const { totalCart } = useContext(Context);
  const [isDisabled, setIsDisabled] = useState(true);
  const [productsData, setProduct] = useState('');

  const setStateProduct = async () => {
    const dataProducts = await products();
    return setProduct(dataProducts);
  };

  const totalButtonHandler = () => {
    if (totalCart > 0) setIsDisabled(false);
    if (totalCart === 0) setIsDisabled(true);
  };

  useEffect(() => {
    setStateProduct();
  }, []);

  useEffect(() => {
    totalButtonHandler();
  });

  return (
    <section>
      <Header />
      <div>
        {productsData && productsData.map((product, i) => (
          <ProductCard key={ `${product.id}-${i}` } product={ { ...product } } />
        ))}
        <button
          type="button"
          name="totalButton"
          data-testid="customer_products__checkout-bottom-value"
          disabled={ isDisabled }
          onClick={ () => history.push('/customer/checkout') }
        >
          {totalCart.toFixed(2).replace('.', ',')}
        </button>
      </div>
    </section>
  );
}
