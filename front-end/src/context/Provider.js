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

  const [lsUserData, setLsUserData] = usePersistState('userData', {
    name: '',
    email: '',
    role: '',
    token: '',
  });

  const context = useMemo(() => ({
    userRegister,
    setUserRegister,
    lsUserData,
    setLsUserData,
  }), [userRegister, lsUserData, setLsUserData]);
  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = { children: PropTypes.node.isRequired };
