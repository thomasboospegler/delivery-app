import axios from 'axios';

const BAD_REQUEST = 400;
const USER_ALREADY_REGISTERED = 409;

export const registerNewUser = async (user) => axios
  .post(
    'http://localhost:3001/register',
    {
      ...user,
    },
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  )
  .then((data) => data.status)
  .catch((error) => {
    switch (error.response.status) {
    case BAD_REQUEST:
      return 'Some fields are invalid';
    case USER_ALREADY_REGISTERED:
      return 'User already registered';
    default:
      return 'internal server error';
    }
  });

export const login = async (user) => axios
  .post(
    'http://localhost:3001/login',
    {
      ...user,
    },
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  )
  .then((data) => data.status)
  .catch((error) => {
    switch (error.response.status) {
    case BAD_REQUEST:
      return 'Some fields are invalid';
    default:
      return 'internal server error';
    }
  });
