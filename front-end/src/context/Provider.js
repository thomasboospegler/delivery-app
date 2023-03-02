import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export default function Provider({ children }) {
  const [userRegister, setUserRegister] = useState({
    name: '',
    email: '',
    password: '',
  });
  const context = useMemo(() => ({
    userRegister,
    setUserRegister,
  }), [userRegister]);
  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = { children: PropTypes.node.isRequired };
