import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

export default function CustomerOrderCard({ order, i }) {
  const history = useHistory();
  const { totalPrice, id, saleDate, status } = order;
  const date = new Intl.DateTimeFormat('pt-BR').format(new Date(saleDate));
  return (
    <button
      key={ `order-${i}` }
      type="button"
      data-testid={ `customer_orders__element-order-id-${id}` }
      onClick={ () => history.push(`/customer/orders/${id}`) }
    >
      <p data-testid={ `customer_orders__element-order-id-${id}` }>{`Pedido ${id}`}</p>
      <p data-testid={ `customer_orders__element-delivery-status-${id}` }>{status}</p>
      <p data-testid={ `customer_orders__element-order-date-${id}` }>{date}</p>
      <p data-testid={ `customer_orders__element-card-price-${id}` }>{totalPrice}</p>
    </button>
  );
}

CustomerOrderCard.propTypes = {
  order: PropTypes.shape({
    totalPrice: PropTypes.string,
    id: PropTypes.number,
    saleDate: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  i: PropTypes.number.isRequired,
};
