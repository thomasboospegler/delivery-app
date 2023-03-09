import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import jwtToken from './mocks/JWT';
import allProductsMock from './mocks/allProductsMock';
import sellerMock from './mocks/mockSeller';
// import mockSale from './mocks/mockSale';

jest.mock('axios');

const SUCESS_STATUS = 200;
const CUSTOMER_EMAIL = 'zebirita@email.com';
const CUSTOMER_PASSWORD = '$#zebirita#$';
const PATH_CUSTOMER_PRODUCTS = '/customer/products';
const PATH_CHECKOUT = '/customer/checkout';
const PATH_ORDER = '/customer/orders/';
const PRODUCT_TESTID_BUTTON_ADD = 'customer_products__button-card-add-item-';
const STREET = 'Rua da Trybe';
const HOUSE_NUMBER = 12;
const BUTTON_CHECKOUT = 'customer_products__button-cart';
const ADDRESS_NUMBER_ID = 'customer_checkout__input-address-number';
const ADDRESS_ID = 'customer_checkout__input-address';
const SELLER_ID = 'customer_checkout__select-seller';
// const SELLER_NAME = 'Fulana Pereira';

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
        .getByTestId(BUTTON_CHECKOUT);
      userEvent.click(buttonCheckout);
      jest.clearAllMocks();
      axios.get.mockResolvedValueOnce({
        status: SUCESS_STATUS,
        data: sellerMock,
      });
      await waitFor(() => {
        const { location: { pathname } } = history;
        expect(pathname).toBe(PATH_CHECKOUT);
      });
      // até aqui
      const seller = screen.getByTestId(SELLER_ID);
      const address = screen.getByTestId(ADDRESS_ID);
      const number = screen.getByTestId(ADDRESS_NUMBER_ID);
      const finishOrder = screen.getByRole('button', { name: /finalizar/i });

      expect(seller).toBeInTheDocument();
      expect(address).toBeInTheDocument();
      expect(number).toBeInTheDocument();
      expect(finishOrder).toBeInTheDocument();
    });
  });
  // describe('Test', () => {
  //   it('test LINHA 33', async () => {
  //     // daqui
  //     await waitFor(() => {
  //       const { location: { pathname } } = history;
  //       expect(pathname).toBe(PATH_CUSTOMER_PRODUCTS);
  //     });
  //     const buttonAddItems = screen
  //       .getByTestId(`${PRODUCT_TESTID_BUTTON_ADD}${allProductsMock[0].id}`);
  //     userEvent.dblClick(buttonAddItems);

  //     const buttonCheckout = screen
  //       .getByTestId('customer_products__button-cart');
  //     userEvent.click(buttonCheckout);
  //     jest.clearAllMocks();
  //     axios.get.mockResolvedValueOnce({
  //       status: SUCESS_STATUS,
  //       data: sellerMock,
  //     });
  //     await waitFor(() => {
  //       const { location: { pathname } } = history;
  //       expect(pathname).toBe('/customer/checkout');
  //     });
  // // até aqui
  //     const subTotal = screen
  //       .getByTestId('customer_checkout__element-order-total-price');
  //     expect(subTotal).toBeInTheDocument();
  //     const buttomRemove = screen
  //       .getByTestId('customer_checkout__element-order-table-remove-0');
  //     userEvent.click(buttomRemove);
  //     // subtotal.value esta retornando undefined mas ele tem que retornar 0
  //     expect(subTotal.value).toBe(undefined);
  //   });
  // });

  // describe('The address input', () => {
  //   it('should change as the user types an address', async () => {
  //     // daqui
  //     await waitFor(() => {
  //       const { location: { pathname } } = history;
  //       expect(pathname).toBe(PATH_CUSTOMER_PRODUCTS);
  //     });
  //     const buttonAddItems = screen
  //       .getByTestId(`${PRODUCT_TESTID_BUTTON_ADD}${allProductsMock[0].id}`);
  //     userEvent.dblClick(buttonAddItems);

  //     const buttonCheckout = screen
  //       .getByTestId(BUTTON_CHECKOUT);
  //     userEvent.click(buttonCheckout);
  //     jest.clearAllMocks();
  //     axios.get.mockResolvedValueOnce({
  //       status: SUCESS_STATUS,
  //       data: sellerMock,
  //     });
  //     await waitFor(() => {
  //       const { location: { pathname } } = history;
  //       expect(pathname).toBe(PATH_CHECKOUT);
  //     });
  //     // até aqui

  //     const address = screen.getByTestId(ADDRESS_ID);
  //     userEvent.type(address, STREET);
  //     expect(address.value).toBe(STREET);
  //   });
  // });

  // Linha 61
  describe.only('The conclusion of a sale', () => {
    it('should create a sale and redirect to "/customer/orders/1"', async () => {
      // daqui
      await waitFor(() => {
        const { location: { pathname } } = history;
        expect(pathname).toBe(PATH_CUSTOMER_PRODUCTS);
      });
      const buttonAddItems = screen
        .getByTestId(`${PRODUCT_TESTID_BUTTON_ADD}${allProductsMock[0].id}`);
      userEvent.dblClick(buttonAddItems);

      const buttonCheckout = screen
        .getByTestId(BUTTON_CHECKOUT);
      userEvent.click(buttonCheckout);
      jest.clearAllMocks();
      axios.get.mockResolvedValueOnce({
        status: SUCESS_STATUS,
        data: sellerMock,
      });
      await waitFor(() => {
        const { location: { pathname } } = history;
        expect(pathname).toBe(PATH_CHECKOUT);
      });
      // até aqui
      const address = screen.getByTestId(ADDRESS_ID);
      const number = screen.getByTestId(ADDRESS_NUMBER_ID);
      const finishOrder = screen.getByRole('button', { name: /finalizar/i });
      userEvent.type(address, STREET);
      userEvent.type(number, HOUSE_NUMBER);
      userEvent.click(finishOrder);
      console.log('CLICANDO NO BOTÃO');
      jest.clearAllMocks();
      axios.post.mockResolvedValueOnce({
        status: 201,
        data: { insertId: 0 },
      });
      await waitFor(() => {
        const { location: { pathname } } = history;
        expect(pathname).toBe(`${PATH_ORDER}${0}`);
      });
    });
  });

  // describe('The address input', () => {
  //   it('should change the address input when you type"', async () => {
  //     // daqui
  //     await waitFor(() => {
  //       const { location: { pathname } } = history;
  //       expect(pathname).toBe(PATH_CUSTOMER_PRODUCTS);
  //     });
  //     const buttonAddItems = screen
  //       .getByTestId(`${PRODUCT_TESTID_BUTTON_ADD}${allProductsMock[0].id}`);
  //     userEvent.dblClick(buttonAddItems);

  //     const buttonCheckout = screen
  //       .getByTestId(BUTTON_CHECKOUT);
  //     userEvent.click(buttonCheckout);
  //     jest.clearAllMocks();
  //     axios.get.mockResolvedValueOnce({
  //       status: SUCESS_STATUS,
  //       data: sellerMock,
  //     });
  //     await waitFor(() => {
  //       const { location: { pathname } } = history;
  //       expect(pathname).toBe(PATH_CHECKOUT);
  //     });
  //     // até aqui
  //     const address = screen.getByTestId(ADDRESS_ID);
  //     userEvent.type(address, STREET);
  //     expect(address).toBe(STREET);
  //   });
  // });
});
