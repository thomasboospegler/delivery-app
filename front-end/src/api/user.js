import axios from 'axios';

export const BAD_REQUEST = 400;

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
      return 'Invalid fields';
    default:
      return 'internal server error';
    }
  });
