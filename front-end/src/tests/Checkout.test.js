import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import jwtToken from './mocks/JWT';
import allProductsMock from './mocks/allProductsMock';
import sellerMock from './mocks/mockSeller';

jest.mock('axios');

const SUCESS_STATUS = 200;
const CUSTOMER_EMAIL = 'zebirita@email.com';
const CUSTOMER_PASSWORD = '$#zebirita#$';
const PATH_CUSTOMER_PRODUCTS = '/customer/products';
const PRODUCT_TESTID_BUTTON_ADD = 'customer_products__button-card-add-item-';

describe('Test the checkout page', () => {
  let history;
  beforeEach(() => {
    history = renderWithRouter(<App />).history;
    axios.post.mockResolvedValueOnce({
      status: SUCESS_STATUS,
      data: {
        token: jwtToken,
      },
    });
    const email = screen.getByRole('textbox', { name: /login/i });
    const password = screen.getByLabelText(/senha/i);
    const login = screen.getByRole('button', { name: /login/i });
    userEvent.type(email, CUSTOMER_EMAIL);
    userEvent.type(password, CUSTOMER_PASSWORD);
    userEvent.click(login);
    jest.clearAllMocks();
    axios.get.mockResolvedValueOnce({
      status: SUCESS_STATUS,
      data: allProductsMock,
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('The details and address form', () => {
    it('should exists with all elements', async () => {
      // daqui
      await waitFor(() => {
        const { location: { pathname } } = history;
        expect(pathname).toBe(PATH_CUSTOMER_PRODUCTS);
      });
      const buttonAddItems = screen
        .getByTestId(`${PRODUCT_TESTID_BUTTON_ADD}${allProductsMock[0].id}`);
      userEvent.dblClick(buttonAddItems);

      const buttonCheckout = screen
        .getByTestId('customer_products__button-cart');
      userEvent.click(buttonCheckout);
      jest.clearAllMocks();
      axios.get.mockResolvedValueOnce({
        status: SUCESS_STATUS,
        data: sellerMock,
      });
      await waitFor(() => {
        const { location: { pathname } } = history;
        expect(pathname).toBe('/customer/checkout');
      });
      // até aqui
      const seller = screen.getByTestId('customer_checkout__select-seller');
      const address = screen.getByTestId('customer_checkout__input-address');
      const number = screen.getByTestId('customer_checkout__input-address-number');
      const finishOrder = screen.getByRole('button', { name: /finalizar/i });

      expect(seller).toBeInTheDocument();
      expect(address).toBeInTheDocument();
      expect(number).toBeInTheDocument();
      expect(finishOrder).toBeInTheDocument();
    });
  });

  // describe('Test the conclusion of a sale', () => {
  //   it('when you click in "FINALIZAR PEDIDO"', async () => {
  //     axios.post.mockResolvedValueOnce({ status: SUCESS_STATUS });
  //     const finishOrder = screen.getByRole('button', { name: /finalizar/i });
  //     userEvent.click(finishOrder);
  //     jest.clearAllMocks();
  //     axios.get.mockResolvedValueOnce({
  //       status: SUCESS_STATUS,
  //       data: [],
  //     });
  //     await waitFor(() => {
  //       const { location: { pathname } } = history;
  //       expect(pathname).toBe('/customer/orders/0'); // precisa mockar
  //     });
  //   });
  // });
});
