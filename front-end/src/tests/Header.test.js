// tests te Header component
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Header from '../components/Header';

describe('Test the Header component', () => {
  it('should render the products button', () => {
    renderWithRouter(<Header />);
    const product = screen.getByRole('button', { name: /produtos/i });

    expect(product).toBeInTheDocument();
    userEvent.click(product);
  });

  it('should render the order button', () => {
    renderWithRouter(<Header />);
    const orders = screen.getByRole('button', { name: /meus pedidos/i });

    expect(orders).toBeInTheDocument();
    userEvent.click(orders);
  });

  it('should render the name button', () => {
    renderWithRouter(<Header />);
    const name = screen.getByRole('button', { name: /nome/i });

    expect(name).toBeInTheDocument();
    userEvent.click(name);
  });

  it('should render the products button', () => {
    renderWithRouter(<Header />);
    const logout = screen.getByRole('button', { name: /sair/i });

    expect(logout).toBeInTheDocument();
    userEvent.click(logout);
  });
});
