import axios from 'axios';

export const BAD_REQUEST = 400;

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
    default:
      return 'internal server error';
    }
  });
