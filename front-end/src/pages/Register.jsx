import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import { registerNewUser } from '../api/user';
import Context from '../context/Context';

export default function Register() {
  const {
    userRegister,
    setUserRegister,
  } = useContext(Context);
  const history = useHistory();
  const [disabled, setDisable] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const PASSWORD_MIN_LENGTH = 6;
  const NAME_MIN_LENGTH = 12;
  const SUCCESS = 201;

  const handleChage = (e) => {
    const { name, value } = e.target;
    setUserRegister((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const submitClick = async () => {
    const registered = await registerNewUser(userRegister);
    if (registered === SUCCESS) {
      history.push('/customer/products');
    } else {
      setHasError(true);
      setErrorMessage(registered);
    }
  };

  useEffect(() => {
    const validateEntry = () => {
      const emailRegex = /[^@]+@[^@]+\.[^@]+/gi;
      if (emailRegex.test(userRegister.email)
      && userRegister.password.length >= PASSWORD_MIN_LENGTH
      && userRegister.name.length >= NAME_MIN_LENGTH) {
        setDisable(false);
      } else {
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
          data-testid="common_register__input-name"
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
          data-testid="common_register__input-email"
          type="text"
          id="emailRegister"
          name="email"
          value={ userRegister.email }
          onChange={ (e) => handleChage(e) }
          required
        />
      </label>
      <label htmlFor="passwordRegister">
        Senha:
        <input
          data-testid="common_register__input-password"
          type="password"
          id="passwordRegister"
          name="password"
          value={ userRegister.password }
          onChange={ (e) => handleChage(e) }
          required
        />
      </label>
      <button
        data-testid="common_register__button-register"
        type="button"
        onClick={ submitClick }
        disabled={ disabled }
      >
        Cadastrar
      </button>
      { hasError && (
        <span data-testid="common_register__element-invalid_register">
          { errorMessage }
        </span>
      )}
    </div>
  );
}
