import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

jest.mock('axios');

const SUCESS_STATUS = 200;

describe('Test the Login page', () => {
  let history;
  beforeEach(() => {
    history = renderWithRouter(<App />).history;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('The login form', () => {
    it('should exists with all elements', () => {
      const email = screen.getByRole('textbox', { name: /login/i });
      const password = screen.getByLabelText(/senha/i);
      const login = screen.getByRole('button', { name: /login/i });
      const register = screen.getByRole('button', { name: /ainda não tenho conta/i });

      expect(email).toBeInTheDocument();
      expect(password).toBeInTheDocument();
      expect(login).toBeInTheDocument();
      expect(register).toBeInTheDocument();
    });

    it('should have a register button to redirect to "/register"', () => {
      const register = screen.getByRole('button', { name: /ainda não tenho conta/i });
      userEvent.click(register);

      const { location: { pathname } } = history;
      expect(pathname).toBe('/register');
    });
  });

  describe('The login button', () => {
    it('should start desactivated', () => {
      const login = screen.getByRole('button', { name: /login/i });
      expect(login).toBeDisabled();
    });

    it('should be desactivated with invalid email & valid password', () => {
      const email = screen.getByRole('textbox', { name: /login/i });
      const password = screen.getByLabelText(/senha/i);
      const login = screen.getByRole('button', { name: /login/i });

      userEvent.type(email, 'test@gmail');
      userEvent.type(password, '123456');

      expect(login).toBeDisabled();
    });

    it('should be desactivated with valid email & invalid password', () => {
      const email = screen.getByRole('textbox', { name: /login/i });
      const password = screen.getByLabelText(/senha/i);
      const login = screen.getByRole('button', { name: /login/i });

      userEvent.type(email, 'test@email.com');
      userEvent.type(password, '12345');

      expect(login).toBeDisabled();
    });

    it('should be activated with valid email & valid password', () => {
      const email = screen.getByRole('textbox', { name: /login/i });
      const password = screen.getByLabelText(/senha/i);
      const login = screen.getByRole('button', { name: /login/i });

      userEvent.type(email, 'test@email.com');
      userEvent.type(password, '123456');

      expect(login).not.toBeDisabled();
    });
  });

  describe('Test login in', () => {
    it('with invalid credentials', async () => {
      axios.post.mockResolvedValueOnce({ status: 400 });
      const email = screen.getByRole('textbox', { name: /login/i });
      const password = screen.getByLabelText(/senha/i);
      const login = screen.getByRole('button', { name: /login/i });
      userEvent.type(email, 'tests@email.com');
      userEvent.type(password, '1234567');
      userEvent.click(login);
      await waitFor(() => {
        const alert = screen.getByText('Usuário ou senha inválidos');
        expect(alert).toBeInTheDocument();
      });
    });

    it('with valid credentials', async () => {
      axios.post.mockResolvedValueOnce({ status: SUCESS_STATUS });
      const email = screen.getByRole('textbox', { name: /login/i });
      const password = screen.getByLabelText(/senha/i);
      const login = screen.getByRole('button', { name: /login/i });
      userEvent.type(email, 'tests@email.com');
      userEvent.type(password, '123456789');
      userEvent.click(login);
      await waitFor(() => {
        const { location: { pathname } } = history;
        expect(pathname).toBe('/customer/products');
      });
    });
  });
});
