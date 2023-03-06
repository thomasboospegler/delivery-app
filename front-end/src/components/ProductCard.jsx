import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(0);
  const { cartItems, setCartItems } = useContext(Context);

  const addItems = (itemQuantity) => {
    const newCartItem = {
      id: product.id,
      name: product.name,
      unitPrice: product.price,
      quantity: itemQuantity,
      urlImage: product.url_img,
      subTotal: (Number(product.price) * itemQuantity).toFixed(2),
    };
    const updatedCartItems = {
      ...cartItems,
      [product.id]: newCartItem,
    };
    setCartItems(updatedCartItems);
  };

  const rmItem = (itemQuantity) => {
    if (itemQuantity === 0) {
      const newCartItems = { ...cartItems };
      delete newCartItems[product.id];
      setCartItems(newCartItems);
    } else {
      const updatedCartItem = {
        id: product.id,
        name: product.name,
        unitPrice: product.price,
        quantity: itemQuantity,
        urlImage: product.url_img,
        subTotal: (Number(product.price) * itemQuantity).toFixed(2),
      };
      const updatedCartItems = {
        ...cartItems,
        [product.id]: updatedCartItem,
      };
      setCartItems(updatedCartItems);
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
          addItems(quantity + 1);
        } }
      >
        +

      </button>
      <input
        type="number"
        value={ quantity }
        onChange={ (e) => setQuantity(e.target.value) }
        data-testid={ `customer_products__input-card-quantity-${product.id}` }
      />
      <button
        type="button"
        data-testid={ `customer_products__button-card-rm-item-${product.id}` }
        onClick={ () => {
          setQuantity(quantity > 0 ? quantity - 1 : 0);
          rmItem(quantity - 1);
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
