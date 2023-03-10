import axios from 'axios';

export const CONTEXT_TYPE = 'application/json';
export const NOT_FOUND = 404;

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
  `http://localhost:3001/orders/seller/sales/${id}`,
  {
    headers: {
      'content-type': CONTEXT_TYPE,
      authorization: token,
    },
  },
).then((data) => Object.values(data.data))
  .catch((error) => error);

export const updateStatus = (token, id, status) => axios.put(
  `http://localhost:3001/orders/status/${id}`,
  {
    status,
  },
  {
    headers: {
      'content-type': CONTEXT_TYPE,
      authorization: token,
    },
  },
);

export const getCustomerOrders = async (user, token) => axios
  .get(
    `http://localhost:3001/orders?user=${user}`,
    {},
    {
      headers: {
        'content-type': CONTEXT_TYPE,
        authorization: token,
      },
    },
  )
  .then((data) => data.data)
  .catch((error) => {
    switch (error.response.status) {
    case NOT_FOUND:
      return 'Orders Not Found';
    default:
      return 'internal server error';
    }
  });

export const getCustomerOrderById = (token, id) => axios
  .get(
    `http://localhost:3001/orders/${id}`,
    {},
    {
      headers: {
        'content-type': CONTEXT_TYPE,
        authorization: token,
      },
    },
  ).then((data) => data.data)
  .catch((error) => error);
