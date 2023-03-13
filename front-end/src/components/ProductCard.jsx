import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(0);
  const { setTotalCart } = useContext(Context);
  const { cartItems, setCartItems } = useContext(Context);

  const addItems = (itemQuantity) => {
    const newCartItem = {
      id: product.id,
      name: product.name,
      unitPrice: product.price,
      quantity: itemQuantity,
      urlImage: product.urlImage,
      subTotal: (Number(product.price) * itemQuantity).toFixed(2),
    };
    const updatedCartItems = {
      ...cartItems,
      [product.id]: newCartItem,
    };
    setCartItems(updatedCartItems);
  };

  const addManualy = (value) => {
    if (value === 0 || value === '0') {
      const newCartItems = { ...cartItems };
      delete newCartItems[product.id];
      return setCartItems(newCartItems);
    }
    const newCartItem = {
      id: product.id,
      name: product.name,
      unitPrice: product.price,
      quantity: value,
      urlImage: product.urlImage,
      subTotal: (Number(product.price) * value).toFixed(2),
    };
    const updatedCartItems = {
      ...cartItems,
      [product.id]: newCartItem,
    };
    setCartItems(updatedCartItems);
  };

  const rmItem = (itemQuantity) => {
    if (itemQuantity === 0 || itemQuantity === '0') {
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

  const totalHandler = () => {
    const items = Object.values(cartItems);
    let sum = 0;
    const result = items
      .map((item) => {
        sum += Number(item.subTotal);
        return sum;
      });
    setTotalCart(sum.toFixed(2) > 0 ? sum : 0);
    return result;
  };

  useEffect(() => {
    totalHandler();
  });

  return (
    <div
      className="flex flex-col w-60 h-80
        border rounded-sm border-[#B1C2BE] drop-shadow-xl"
      key={ product.id }
    >
      <div
        className="text-xl font-bold fixed top-2 left-2 bg-white
          bg-opacity-50 p-2 rounded-xl"
      >
        R$
        {' '}
        <span data-testid={ `customer_products__element-card-price-${product.id}` }>
          {product.price.replace('.', ',')}
        </span>
      </div>
      <img
        src={ product.urlImage }
        className="w-60 h-60 object-cover"
        alt="prodcartItemsucts-img"
        data-testid={ `customer_products__img-card-bg-image-${product.id}` }
      />
      <section
        className="flex flex-col justify-center items-center h-20 gap-1
          bg-ligthBgGreen pb-2"
      >
        <div
          data-testid={ `customer_products__element-card-title-${product.id}` }
        >
          {product.name}
        </div>
        <div>
          <button
            type="button"
            className="bg-primary w-8 p-1 rounded-l-lg border-y border-l
            text-white border-black font-bold"
            data-testid={ `customer_products__button-card-rm-item-${product.id}` }
            onClick={ () => {
              setQuantity(quantity > 0 ? quantity - 1 : 0);
              rmItem(quantity - 1);
            } }
          >
            -
          </button>
          <input
            type="number"
            className="w-8 p-1 border-y text-center"
            value={ quantity }
            onChange={ (e) => {
              addManualy(e.target.value);
              setQuantity(e.target.value);
              totalHandler();
            } }
            data-testid={ `customer_products__input-card-quantity-${product.id}` }
          />
          <button
            type="button"
            className="bg-primary w-8 p-1 rounded-r-lg border-y border-r
              text-white border-black font-bold"
            data-testid={ `customer_products__button-card-add-item-${product.id}` }
            onClick={ () => {
              setQuantity(quantity + 1);
              addItems(quantity + 1);
            } }
          >
            +
          </button>
        </div>
      </section>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    url_img: PropTypes.string,
    price: PropTypes.string,
    urlImage: PropTypes.string,
    totalCart: PropTypes.number,
  }).isRequired,
};
