import React, { useContext, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import AiContext from '../../hooks/AiContext';
import { login } from '../../api';

export default function Login() {
  const {
    notify,
    user,
    setUser,
    isPasswordLoginHiden,
    validateLogin,
    emailError,
    // cookies,
    setCookie,
    passwordShowHide,
    toastId,
    loginAuth,
  } = useContext(AiContext);

  const history = useHistory();

  const submitLogin = async () => {
    toast.dismiss(toastId.current);
    notify('Loading...');
    if (emailError) {
      toast.dismiss(toastId.current);
      notify('invalid email or password');
    }

    const loginResponse = await login(user);
    if (loginResponse.status === 200) {
      setCookie('token', loginResponse.token, { path: '/' });
      loginAuth();
      // call in global
      // getNewRefreshToken(cookies.token);
      history.push('./main');
    } else {
      toast.dismiss(toastId.current);
      notify(loginResponse);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  useEffect(() => {
    validateLogin();
  }, [validateLogin, user]);

  useEffect(() => () => {
    toast.dismiss();
  }, []);

  return (
    <div className="container-login">
      <h1>Welcome!</h1>
      <form>
        <fieldset className="fieldset-container-login">
          <span className="login-description">Sign in to continue</span>
          <div className="input-container">
            <label htmlFor="email-input" className="input-login-label">
              <div className="login-icon user-icon">
                <i className="fa fa-user" aria-hidden="true" />
              </div>
              <input
                type="email"
                name="email"
                value={user.email}
                id="email-input"
                placeholder="youremail@email.com"
                onChange={(e) => handleChange(e)}
                required
              />
            </label>
            <label htmlFor="password-input" className="input-login-label">
              <div className="login-icon icon-password">
                <i className="fa fa-lock" aria-hidden="true" />
              </div>
              <input
                type={isPasswordLoginHiden ? 'password' : 'text'}
                name="password"
                value={user.password}
                id="password-input"
                placeholder="********"
                onChange={(e) => handleChange(e)}
                required
              />
              {isPasswordLoginHiden
                ? (
                  <button type="button" className="btn-hide" onClick={passwordShowHide}>
                    <i className="fas fa-eye-slash" id="hide_eye" />
                  </button>
                ) : (
                  <button type="button" className="btn-hide" onClick={passwordShowHide}>
                    <i className="fas fa-eye" id="show_eye" />
                  </button>
                )}
            </label>
          </div>
          <button
            type="button"
            className="submit-login"
            onClick={submitLogin}
          >
            Submit
            <i className="fa fa-arrow-right" aria-hidden="true" />
          </button>
          <a href="/signup" className="reset-password">Forgot password?</a>
          <button type="button" className="signup-login" onClick={() => history.push('./signup')}>
            Sign Up
          </button>
        </fieldset>
      </form>
      {/*  Docs - https://fkhadra.github.io/react-toastify/introduction/ */}
      <ToastContainer
        position="top-center"
        autoClose={15000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
