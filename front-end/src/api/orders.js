import axios from 'axios';

export const CONTEXT_TYPE = 'application/json';

export const getSallesBySeller = (token) => axios.get(
  'http://localhost:3001/orders/seller',
  {
    headers: {
      'content-type': CONTEXT_TYPE,
      authorization: token,
    },
  },
)
  .then((data) => data)
  .catch((error) => error);
