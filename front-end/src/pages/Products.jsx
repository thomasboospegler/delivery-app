import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
// import { useHistory } from 'react-router';
import { products } from '../api/products';
// import Context from '../context/Context';

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
        {productsData && productsData.map((product) => (
          <div key={ product.id }>
            <div
              data-testid={ `customer_products__element-card-title-${product.id}` }
            >
              {product.name}
            </div>
            <img
              src={ product.url_img }
              alt="products-img"
              data-testid={ `customer_products__img-card-bg-image-${product.id}` }
            />
            <div
              data-testid={ `customer_products__element-card-price-${product.id}` }
            >
              {product.price}
            </div>
            <button
              type="button"
              data-testid={ `customer_products__button-card-add-item-${product.id}` }
            >
              +

            </button>
            <input
              type="number"
              data-testid={ `customer_products__input-card-quantity-${product.id}` }
            />
            <button
              type="button"
              data-testid={ `customer_products__button-card-rm-item-${product.id}` }
            >
              -

            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
