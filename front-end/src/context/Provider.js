import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import usePersistState from '../hooks/usePersistState';

export default function Provider({ children }) {
  const [userRegister, setUserRegister] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [lsUserData, setLsUserData] = usePersistState('user', {
    name: '',
    email: '',
    role: '',
    token: '',
  });

  const [cartItems, setCartItems] = usePersistState('cartItems', {});
  const [totalCart, setTotalCart] = useState(0);

  const context = useMemo(() => ({
    userRegister,
    setUserRegister,
    lsUserData,
    setLsUserData,
    cartItems,
    totalCart,
    setCartItems,
    setTotalCart,
  }), [
    userRegister,
    lsUserData,
    setLsUserData,
    cartItems,
    totalCart,
    setCartItems,
    setTotalCart,
  ]);
  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = { children: PropTypes.node.isRequired };
