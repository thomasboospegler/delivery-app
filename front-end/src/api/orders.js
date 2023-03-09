import axios from 'axios';

export const NOT_FOUND = 404;

export const getCustomerOrders = async (user, token) => axios
  .get(
    `http://localhost:3001/orders?user=${user}`,
    {},
    {
      headers: {
        'content-type': 'application/json',
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
        'content-type': 'application/json',
        authorization: token,
      },
    },
  ).then((data) => data.data)
  .catch((error) => error);
