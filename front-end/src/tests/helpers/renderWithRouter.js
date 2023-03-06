// renderWithRouter with context api function
import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import Context from '../../context/Provider';

export default function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Context><Router history={ history }>{ui}</Router></Context>),
    history,
  };
}
