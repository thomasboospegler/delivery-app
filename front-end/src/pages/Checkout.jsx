import React, { useContext } from 'react';
import Header from '../components/Header';
import TableBody from '../components/TableBody';
import Context from '../context/Context';

export default function Checkout() {
  const {
    customerAddress,
    setCustomerAddress,
  } = useContext(Context);

  const sellers = ['Fulana Pereira', 'Fulano Pereira'];
  const productsMock = [
    { item: 1,
      description: 'cerveja 1',
      quantity: 3,
      unitValue: 'R$3,50',
      subtotal: 'R$: 10.50' },
    { item: 2,
      description: 'cerveja 2',
      quantity: 4,
      unitValue: 'R$4,10',
      subtotal: 'R$: 16.40' },
    { item: 3,
      description: 'cerveja 3',
      quantity: 1,
      unitValue: 'R$1,56',
      subtotal: 'R$: 1.56' },
  ];

  const total = 28.46;

  const handleChange = ({ target: { name, value } }) => {
    setCustomerAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="checkout-main-container">
      <Header />
      <table>
        <h1>Finalizar Pedido</h1>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          { productsMock.map((data, i) => (
            <TableBody data={ data } index={ i } key={ `${data.description}-${i}` } />
          ))}
        </tbody>
        <div data-testid="customer_checkout__element-order-total-price">
          {`Total: R$: ${total}`}
        </div>
      </table>
      <fieldset>
        <h2>Detalhes e Endereço para Entrega</h2>
        <label htmlFor="seller-input">
          P. Vendedora Responsável
          <select
            name="seller"
            value={ customerAddress.seller }
            onChange={ (e) => handleChange(e) }
            id="seller-input"
            data-testid="customer_checkout__select-seller"
          >
            { sellers.map((seller, i) => (
              <option value={ seller } key={ `${seller}-${i}` }>{ seller }</option>
            ))}
          </select>
        </label>
        <label htmlFor="address-input">
          Endereço:
          <input
            type="text"
            name="address"
            value={ customerAddress.address }
            onChange={ (e) => handleChange(e) }
            id="address-input"
            data-testid="customer_checkout__input-address"
          />
        </label>
        <label htmlFor="house-number">
          <input
            type="number"
            name="addressNumber"
            value={ customerAddress.addressNumber }
            onChange={ (e) => handleChange(e) }
            id="house-number"
            data-testid="customer_checkout__input-address-number"
          />
        </label>
        <button type="button" data-testid="customer_checkout__button-submit-order">
          FINALIZAR PEDIDO
        </button>
      </fieldset>
    </div>
  );
}
