import axios from 'axios';

const BAD_REQUEST = 400;
const USER_ALREADY_REGISTERED = 409;
const CONTEXT_TYPE = 'application/json';
const SOME_FIELD_ARE_INVALIDS = 'Some fields are invalid';
const INTERNAL_SERVER = 'internal server error';

export const registerNewUser = async (user) => axios
  .post(
    'http://localhost:3001/register',
    {
      ...user,
    },
    {
      headers: {
        'content-type': CONTEXT_TYPE,
      },
    },
  )
  .then((data) => data.status)
  .catch((error) => {
    switch (error.response.status) {
    case BAD_REQUEST:
      return SOME_FIELD_ARE_INVALIDS;
    case USER_ALREADY_REGISTERED:
      return 'User already registered';
    default:
      return INTERNAL_SERVER;
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
        'content-type': CONTEXT_TYPE,
      },
    },
  )
  .then((data) => data)
  .catch((error) => {
    switch (error.response.status) {
    case BAD_REQUEST:
      return SOME_FIELD_ARE_INVALIDS;
    default:
      return INTERNAL_SERVER;
    }
  });

export const getSellers = () => axios.get(
  'http://localhost:3001/seller',
  {
    headers: {
      'content-type': CONTEXT_TYPE,
    },
  },
)
  .then((data) => data)
  .catch((error) => error);

export const getUserById = (id) => axios.get(
  `http://localhost:3001/user/${id}`,
  {
    headers: {
      'content-type': CONTEXT_TYPE,
    },
  },
)
  .then((data) => data.data)
  .catch((error) => error);

export const getAll = (token) => axios.get(
  'http://localhost:3001/admin/',
  {
    headers: {
      'content-type': CONTEXT_TYPE,
      authorization: token,
    },
  },
)
  .then((data) => data.data)
  .catch((error) => error);

export const admRegisterNewUser = async (token, user) => axios
  .post(
    'http://localhost:3001/admin/create',
    {
      ...user,
    },
    {
      headers: {
        'content-type': CONTEXT_TYPE,
        authorization: token,
      },
    },
  )
  .then((data) => data.status)
  .catch((error) => {
    switch (error.response.status) {
    case BAD_REQUEST:
      return SOME_FIELD_ARE_INVALIDS;
    case USER_ALREADY_REGISTERED:
      return 'User already registered';
    default:
      return 'internal server error';
    }
  });
