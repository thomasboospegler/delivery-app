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

export const getOrderById = (token, id) => axios.get(
  `http://localhost:3001/orders/seller/products/${id}`,
  {
    headers: {
      'content-type': CONTEXT_TYPE,
      authorization: token,
    },
  },
).then((data) => Object.values(data.data))
  .catch((error) => error);
