import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export default function Provider({ children }) {
  const [userRegister, setUserRegister] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [customerAddress, setCustomerAddress] = useState({
    seller: 'Fulana Pereira',
    address: '',
    addressNumber: '',
  });

  const context = useMemo(() => ({
    userRegister,
    setUserRegister,
    customerAddress,
    setCustomerAddress,
  }), [userRegister, customerAddress]);
  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = { children: PropTypes.node.isRequired };
