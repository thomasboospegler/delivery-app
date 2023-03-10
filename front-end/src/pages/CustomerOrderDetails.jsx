import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import Context from '../context/Context';
import { getCustomerOrderById } from '../api/orders';
import { getUserById } from '../api/user';
import OrderDetailTable from '../components/OrderDetailTable';

export default function CustomerOrderDetails() {
  const { lsUserData } = useContext(Context);
  const [order, setOrder] = useState({});
  const [seller, setSeller] = useState({});
  const testIdBase = 'customer_order_details__element-order-details';

  useEffect(() => {
    const fetchOrder = async () => {
      const id = window.location.pathname.split('/')[3];
      const response = await getCustomerOrderById(lsUserData.token, id);
      const sellerResponse = await getUserById(response.sellerId);
      setOrder(response);
      setSeller(sellerResponse);
    };
    fetchOrder();
  }, [lsUserData]);

  return (
    <section>
      <Header />
      <section>
        <h2>Detalhes do Pedido</h2>
        <p
          data-testid="customer_order_details__element-order-details-label-order-ide"
        >
          {`Pedido ${order.id}`}
        </p>
        <p
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          {seller.name}
        </p>
        <p
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          {order.saleDate && new Intl.DateTimeFormat('pt-BR')
            .format(new Date(order.saleDate))}
        </p>
        <p
          data-testid={ `${testIdBase}-label-delivery-status${order.id}` }
        >
          {order.status}
        </p>
        <button
          type="button"
          data-testid="customer_order_details__button-delivery-check"
          disabled={ order.status === 'Pendente' }
        >
          MARCAR COMO ENTREGUE
        </button>
        <OrderDetailTable order={ order } />
        <p>
          Total: R$
          <span data-testid="customer_order_details__element-order-total-price">
            {order.totalPrice && order.totalPrice.replace('.', ',')}
          </span>
        </p>
      </section>
    </section>
  );
}
