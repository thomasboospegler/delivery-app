import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { login } from '../api/user';
import Context from '../context/Context';

const SUCESS_STATUS = 200;
const TO_STRING = 16;
const SLICE = -2;

export default function Login() {
  const { setLsUserData } = useContext(Context);
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

  // https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
  function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window
      .atob(base64).split('')
      .map((c) => `%${(`00${c.charCodeAt(0).toString(TO_STRING)}`)
        .slice(SLICE)}`).join(''));

    return JSON.parse(jsonPayload);
  }

  // Do cliente: /customer/products,
  // Da pessoa vendedora: /seller/orders,
  // Da pessoa administradora: /admin/manage
  const saveOnLocalStorage = (token) => {
    const decoded = parseJwt(token);
    setLsUserData({
      name: decoded.data.name,
      email: decoded.data.email,
      role: decoded.data.role,
      token,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await login({ email, password });
    if (result.status === SUCESS_STATUS) {
      setErrorMessage(false);
      saveOnLocalStorage(result.data.token);
    }
    const decoded = parseJwt(result.data.token);
    console.log(decoded);
    if (decoded.data.role === 'seller') return history.push('/seller/orders');
    if (decoded.data.role === 'customer') return history.push('/customer/products');
    setErrorMessage(true);
  };

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user')) || '';
    if (token) history.push('/customer/products');
  }, [history]);

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
            onClick={ () => history.push('/register') }
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
