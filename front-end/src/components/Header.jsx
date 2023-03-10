import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';

export default function Header() {
  const history = useHistory();
  const { lsUserData } = useContext(Context);
  const location = window.location.pathname.split('/')[1];

  const cleanLocalStorage = async () => {
    localStorage.removeItem('user');
    history.push('/login');
  };

  return (
    <header>
      <nav className="flex h-16">
        <button
          type="button"
          className="bg-secondary p-3 h-full md:pl-20 md:pr-20 font-semibold"
          onClick={ () => history.push('/customer/products') }
          data-testid="customer_products__element-navbar-link-products"
        >
          PRODUTOS
        </button>
        <button
          type="button"
          className="bg-primary text-white p-2 h-full grow
            md:text-left md:pl-20 font-semibold"
          onClick={ () => history.push(`/${location}/orders`) }
          data-testid="customer_products__element-navbar-link-orders"
        >
          MEUS PEDIDOS
        </button>
        <button
          type="button"
          className="bg-tertiary text-white p-2 h-full md:pl-6 md:pr-6 font-semibold"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {lsUserData.name}
        </button>
        <button
          type="button"
          className="bg-quaternary text-white p-2 h-full md:pl-6 md:pr-6 font-semibold"
          onClick={ cleanLocalStorage }
          name="logout"
          data-testid="customer_products__element-navbar-link-logout"
        >
          Sair
        </button>
      </nav>
    </header>
  );
}
