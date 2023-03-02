import axios from 'axios';

export const NOT_FOUND = 404;

export const products = async () => axios
  .get(
    'http://localhost:3001/products',
    {},
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  )
  .then((data) => data.status)
  .catch((error) => {
    switch (error.response.status) {
    case NOT_FOUND:
      return 'Products Not Found';
    default:
      return 'internal server error';
    }
  });
