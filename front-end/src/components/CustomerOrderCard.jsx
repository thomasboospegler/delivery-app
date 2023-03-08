import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

export default function CustomerOrderCard({ order, i }) {
  const history = useHistory();
  const { subTotal, id, saleDate, status } = order;
  const date = saleDate.split('T')[0];
  return (
    <button
      key={ `order-${i}` }
      type="button"
      data-testid={ `customer_orders__element-order-id-${id}` }
      onClick={ () => history.push(`/customer/orders/${id}`) }
    >
      <p data-testid={ `customer_orders__element-order-id-${i}` }>{`Pedido ${i + 1}`}</p>
      <p data-testid={ `customer_orders__element-delivery-status-${i}` }>{status}</p>
      <p data-testid={ `customer_orders__element-order-date-${i}` }>{date}</p>
      <p data-testid={ `customer_orders__element-card-price-${i}` }>{subTotal}</p>
    </button>
  );
}

CustomerOrderCard.propTypes = {
  order: PropTypes.shape({
    subTotal: PropTypes.string,
    id: PropTypes.number,
    saleDate: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  i: PropTypes.number.isRequired,
};
