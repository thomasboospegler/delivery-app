import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { registerNewUser } from '../api/user';

export default function Register({ history }) {
  const [userRegister, setUserRegister] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [disabled, setDisable] = useState(true);

  const PASSWORD_MIN_LENGTH = 6;
  const NAME_MIN_LENGTH = 12;

  const handleChage = (e) => {
    const { name, value } = e.target;
    setUserRegister((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const submitClick = async () => {
    await registerNewUser(userRegister);
    history.push('/');
  };

  useEffect(() => {
    const validateEntry = () => {
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (emailRegex.test(userRegister.email)
      && userRegister.password.length >= PASSWORD_MIN_LENGTH
      && userRegister.name.length >= NAME_MIN_LENGTH) {
        console.log('if');
        setDisable(false);
      } else {
        console.log(userRegister.password.length);
        setDisable(true);
      }
    };
    validateEntry();
  }, [userRegister]);
  return (
    <div className="register-container">
      <label htmlFor="nameRegister">
        Nome:
        <input
          data-test-id="common_register__input-name"
          type="text"
          id="nameRegister"
          name="name"
          value={ userRegister.name }
          onChange={ (e) => handleChage(e) }
          required
        />
      </label>
      <label htmlFor="emailRegister">
        Email:
        <input
          data-test-id="common_register__input-email"
          type="text"
          id="email"
          name="email"
          value={ userRegister.email }
          onChange={ (e) => handleChage(e) }
          required
        />
      </label>
      <label htmlFor="passwordRegister">
        Senha:
        <input
          data-test-id="common_register__input-password"
          type="text"
          id="passwordRegister"
          name="password"
          value={ userRegister.password }
          onChange={ (e) => handleChage(e) }
          required
        />
      </label>
      <button
        data-test-id="common_register__button-register"
        type="button"
        onClick={ submitClick }
        disabled={ disabled }
      >
        Cadastrar
      </button>
      <span data-test-id="common_register__element-invalid_register">
        Elemento oculto (Mensagens de erro)
      </span>
    </div>
  );
}

Register.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
