import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(0);
  // const [cartProduct, setCartProduct] = useState({});
  const { cartItems, setCartItems } = useContext(Context);

  // const sendToLocalStorage = (productItem) => {
  //   setCartItems(productItem);
  // };

  const addItems = () => {
    const newCartItem = {
      id: product.id,
      name: product.name,
      unitPrice: product.price,
      quantity,
      urlImage: product.url_img,
    };
    const updatedCartItems = {
      ...cartItems,
      [product.id]: newCartItem,
    };
    setCartItems(updatedCartItems);
  };

  const rmQuantity = () => {
    if (quantity > 0) {
      const updatedCartItem = {
        id: product.id,
        name: product.name,
        unitPrice: product.price,
        quantity,
        urlImage: product.url_img,
      };
      const updatedCartItems = {
        ...cartItems,
        [product.id]: updatedCartItem,
      };
      setCartItems(updatedCartItems);
    } else {
      const newCartItems = { ...cartItems };
      delete newCartItems[product.id];
      setCartItems(newCartItems);
    }
  };

  useEffect(() => {
    addItems();
  }, [quantity]);

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
        onChange={ (e) => setQuantity(e.target.value) }
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
