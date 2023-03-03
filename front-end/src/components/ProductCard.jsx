import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(0);
  const [cartProduct, setCartProduct] = useState();
  const { setCartItems } = useContext(Context);

  const sendToLocalStorage = (productItem) => {
    setCartItems(productItem);
  };

  const addItems = () => {
    setCartProduct({
      id: product.id,
      name: product.name,
      unitPrice: product.price,
      quantity,
      urlImage: product.url_img,
    });
    sendToLocalStorage(cartProduct);
  };

  const rmQuantity = () => {
    if (quantity > 0) {
      setCartProduct({
        id: product.id,
        name: product.name,
        unitPrice: product.price,
        quantity,
        urlImage: product.url_img,
      });
      sendToLocalStorage(cartProduct);
    } else {
      setCartProduct({ });
      setCartItems('');
    }
  };

  return (
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
        {product.price.replace('.', ',')}
      </div>
      <button
        type="button"
        data-testid={ `customer_products__button-card-add-item-${product.id}` }
        onClick={ () => {
          setQuantity(quantity + 1);
          addItems();
        } }
      >
        +

      </button>
      <input
        type="number"
        value={ quantity }
        data-testid={ `customer_products__input-card-quantity-${product.id}` }
      />
      <button
        type="button"
        data-testid={ `customer_products__button-card-rm-item-${product.id}` }
        onClick={ () => {
          setQuantity(quantity > 0 ? quantity - 1 : 0);
          rmQuantity();
        } }
      >
        -

      </button>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    url_img: PropTypes.string,
    price: PropTypes.string,
  }).isRequired,
};
