import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Header() {
  const history = useHistory();
  return (
    <header>
      <button
        type="button"
        onClick={ () => history.push('/customer/products') }
        data-testid="customer_products__element-navbar-link-products"
      >
        PRODUTOS
      </button>
      <button
        type="button"
        onClick={ () => history.push('/customer/orders') }
        data-testid="customer_products__element-navbar-link-orders"
      >
        MEUS PEDIDOS
      </button>
      <button
        type="button"
        data-testid="customer_products__element-navbar-user-full-name"
      >
        NOME
      </button>
      <button
        type="button"
        onClick={ () => history.push('/login') }
        data-testid="customer_products__element-navbar-link-logout"
      >
        Sair
      </button>
    </header>
  );
}
