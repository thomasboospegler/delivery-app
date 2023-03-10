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
      <nav>
        <button
          type="button"
          onClick={ () => history.push('/customer/products') }
          data-testid="customer_products__element-navbar-link-products"
        >
          PRODUTOS
        </button>
        <button
          type="button"
          onClick={ () => history.push(`/${location}/orders`) }
          data-testid="customer_products__element-navbar-link-orders"
        >
          MEUS PEDIDOS
        </button>
        <button
          type="button"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {lsUserData.name}
        </button>
        <section>
          <button
            type="button"
            onClick={ cleanLocalStorage }
            name="logout"
            data-testid="customer_products__element-navbar-link-logout"
          >
            Sair
          </button>
        </section>
      </nav>
    </header>
  );
}
