import React, { useContext, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import AiContext from '../../hooks/AiContext';
import 'react-toastify/dist/ReactToastify.css';
import { registerUser } from '../../api';

export default function SignUp({ history }) {
  const {
    userRegister,
    setUserRegister,
    birthDate,
    setBirthDate,
    isPasswordHiden,
    setPasswordHiden,
    notify,
    registerError,
    validateRegister,
    toastId,
  } = useContext(AiContext);

  const handleChage = (e) => {
    const { name, value } = e.target;
    setUserRegister({
      ...userRegister,
      [name]: value,
    });
    validateRegister();
  };

  const formatBirthDay = (value) => {
    const newDate = dayjs(value).format('YYYY-MM-DD');
    setUserRegister({
      ...userRegister,
      birth: newDate,
    });
  };

  const submitClick = async (e) => {
    e.preventDefault();
    notify('Loading...');

    if (registerError) {
      toast.dismiss();
      return notify('Some fields are invalids');
    }

    const registeredUser = await registerUser(userRegister);

    if (typeof registeredUser === 'string') {
      toast.dismiss(toastId.current);
      return notify(registeredUser);
    }
    return history.push('/validate');
  };

  const passwordShowHide = () => {
    setPasswordHiden(!isPasswordHiden);
  };

  useEffect(() => {
    validateRegister();
  }, [validateRegister, userRegister]);

  return (
    <div className="signup-container">
      <h1>Hello!</h1>
      <span className="signup-description">Lets introduce</span>
      <form action="post">
        <fieldset className="fieldset-container-signup">
          <div className="input-container">
            <label htmlFor="name" className="label-signup">
              <div className="icon-signup">
                <i className="fa fa-user" aria-hidden="true" />
              </div>
              <input
                type="text"
                placeholder="Your full name"
                id="name"
                name="name"
                value={userRegister.name}
                onChange={handleChage}
                minLength="6"
                required
              />
            </label>
            <label htmlFor="email" className="label-signup">
              <div className="icon-signup">
                <i className="fa fa-envelope" aria-hidden="true" />
              </div>
              <input
                type="email"
                placeholder="example@example.com"
                id="email"
                name="email"
                value={userRegister.email}
                onChange={handleChage}
                required
              />
            </label>
            <label htmlFor="phone" className="label-signup">
              <div className="icon-signup">
                <i className="fa fa-phone" aria-hidden="true" />
              </div>
              <input
                type="text"
                placeholder="Your phone"
                id="phone"
                name="phone"
                value={userRegister.phone}
                onChange={handleChage}
                minLength="11"
                required
              />
            </label>
            <div>
              <label htmlFor="password" className="label-signup">
                <div className="icon-signup icon-password">
                  <i className="fa fa-lock" aria-hidden="true" />
                </div>
                <input
                  type={isPasswordHiden ? 'password' : 'text'}
                  placeholder="********"
                  id="password"
                  name="password"
                  value={userRegister.password}
                  onChange={handleChage}
                  minLength="8"
                  required
                />
                {isPasswordHiden ? (
                  <button
                    type="button"
                    className="btn-hide"
                    onClick={passwordShowHide}
                  >
                    <i className="fas fa-eye-slash" id="hide_eye" />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-hide"
                    onClick={passwordShowHide}
                  >
                    <i className="fas fa-eye" id="show_eye" />
                  </button>
                )}
              </label>
            </div>
          </div>
          <div className="calendar-container">
            <div className="icon-signup">
              <i className="fa fa-calendar" aria-hidden="true" />
            </div>
            <button
              type="button"
              className="calendar-signup-btn"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Birthday
            </button>

            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      BirthDay
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    {/* docs https://www.npmjs.com/package/react-calendar
                        https://github.com/wojtekmaj/react-calendar/blob/main/README.md */}
                    <Calendar
                      className="container"
                      name="date"
                      onChange={(value) => {
                        formatBirthDay(value);
                        setBirthDate(value);
                      }}
                      value={birthDate}
                      required
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="btn-submit" onClick={(e) => submitClick(e)}>
            Submit
          </button>
          <span className="sign-in-link-content">
            <p>Already have an account?</p>
            {' '}
            <Link to="/" className="sign-in-link">Sign In</Link>
          </span>
        </fieldset>
      </form>
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

SignUp.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
