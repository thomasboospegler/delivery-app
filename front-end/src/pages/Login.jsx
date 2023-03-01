import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { login } from '../api/user';

const SUCESS_STATUS = 200;

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);

  const validateInputs = () => {
    const emailRegex = /[^@]+@[^@]+\.[^@]+/gi;
    const MIN_LENGTH = 5;
    const isEmailValid = emailRegex.test(email);
    const isNameValid = password.length > MIN_LENGTH;
    return !(isNameValid && isEmailValid);
  };

  // Do cliente: /customer/products,
  // Da pessoa vendedora: /seller/orders,
  // Da pessoa administradora: /admin/manage

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await login({ email, password });
    if (result === SUCESS_STATUS) {
      console.log('logou');
      setErrorMessage(false);
      return history.push('/customer/products');
    }
    setErrorMessage(true);
  };

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <h1>LOGIN</h1>
        <div>
          <label htmlFor="email-input">
            Login
            <input
              type="text"
              data-testid="common_login__input-email"
              id="email-input"
              placeholder="email@trybeer.com.br"
              name="email"
              value={ email }
              onChange={ ({ target }) => setEmail(target.value) }
            />
          </label>
        </div>
        <div>
          <label htmlFor="password-input">
            Senha
            <input
              type="password"
              id="password-input"
              data-testid="common_login__input-password"
              placeholder="***********"
              name="password"
              value={ password }
              onChange={ ({ target }) => setPassword(target.value) }
            />
          </label>
        </div>
        <div>
          <button
            type="submit"
            data-testid="common_login__button-login"
            disabled={ validateInputs() }
          >
            LOGIN
          </button>
          <button
            type="button"
            data-testid="common_login__button-register"
          >
            Ainda não tenho conta
          </button>
        </div>
      </form>
      { errorMessage
        ? (
          <span
            data-testid="common_login__element-invalid-email"
          >
            Usuário ou senha inválidos
          </span>
        ) : null}
    </div>
  );
}