import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

jest.mock('axios');

const SUCESS_STATUS = 201;

describe('Test the Login page', () => {
  let history;
  beforeEach(() => {
    history = renderWithRouter(<App />, { route: '/register' }).history;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('The Register form', () => {
    it('should exists with all elements', () => {
      const name = screen.getByRole('textbox', { name: /nome/i });
      const email = screen.getByRole('textbox', { name: /email/i });
      const password = screen.getByLabelText(/senha/i);
      const register = screen.getByRole('button', { name: /cadastrar/i });

      expect(name).toBeInTheDocument();
      expect(email).toBeInTheDocument();
      expect(password).toBeInTheDocument();
      expect(register).toBeInTheDocument();
    });
  });

  describe('The register button', () => {
    it('should start desactivated', () => {
      const register = screen.getByRole('button', { name: /cadastrar/i });
      expect(register).toBeDisabled();
    });

    it('should be desactivated with invalid email & valid password', () => {
      const name = screen.getByRole('textbox', { name: /nome/i });
      const email = screen.getByRole('textbox', { name: /email/i });
      const password = screen.getByLabelText(/senha/i);
      const register = screen.getByRole('button', { name: /cadastrar/i });

      userEvent.type(name, 'Teste Teste Ttt');
      userEvent.type(email, 'test@gmail');
      userEvent.type(password, '123456');

      expect(register).toBeDisabled();
    });

    it('should be desactivated with valid email & invalid password', () => {
      const name = screen.getByRole('textbox', { name: /nome/i });
      const email = screen.getByRole('textbox', { name: /email/i });
      const password = screen.getByLabelText(/senha/i);
      const register = screen.getByRole('button', { name: /cadastrar/i });

      userEvent.type(name, 'Teste Teste');
      userEvent.type(email, 'test@email.com');
      userEvent.type(password, '12345');

      expect(register).toBeDisabled();
    });

    it('should be activated with valid email & valid password', () => {
      const name = screen.getByRole('textbox', { name: /nome/i });
      const email = screen.getByRole('textbox', { name: /email/i });
      const password = screen.getByLabelText(/senha/i);
      const register = screen.getByRole('button', { name: /cadastrar/i });

      userEvent.type(name, 'Teste Teste Teste');
      userEvent.type(email, 'test@email.com');
      userEvent.type(password, '12345678');

      expect(register).not.toBeDisabled();
    });
  });

  describe('Test registering', () => {
    it('with already existed user', async () => {
      axios.post.mockResolvedValueOnce({ status: 'User already registered' });
      const name = screen.getByRole('textbox', { name: /nome/i });
      const email = screen.getByRole('textbox', { name: /email/i });
      const password = screen.getByLabelText(/senha/i);
      const register = screen.getByRole('button', { name: /cadastrar/i });
      userEvent.type(name, 'Teste Teste Teste');
      userEvent.type(email, 'test@email.com');
      userEvent.type(password, '12345678');
      userEvent.click(register);
      await waitFor(() => {
        const alert = screen.getByText('User already registered');
        expect(alert).toBeInTheDocument();
      });
    });

    it('with valid credentials', async () => {
      axios.post.mockResolvedValueOnce({ status: SUCESS_STATUS });
      const name = screen.getByRole('textbox', { name: /nome/i });
      const email = screen.getByRole('textbox', { name: /email/i });
      const password = screen.getByLabelText(/senha/i);
      const register = screen.getByRole('button', { name: /cadastrar/i });
      userEvent.type(name, 'Teste Teste Teste');
      userEvent.type(email, 'test@email.com');
      userEvent.type(password, '12345678');
      userEvent.click(register);
      await waitFor(() => {
        const { location: { pathname } } = history;
        expect(pathname).toBe('/customer/products');
      });
    });
  });
});
