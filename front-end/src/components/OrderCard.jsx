import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

export default function OrderCard({ order, i }) {
  const history = useHistory();
  const { subTotal } = order;
  return (
    <button
      key={ `order-${i}` }
      type="button"
      onClick={ () => history.push(`/customer/orders/${i}`) }
    >
      <p data-testid={ `customer_orders__element-order-id-${i}` }>{`Pedido ${i + 1}`}</p>
      <p data-testid={ `customer_orders__element-delivery-status${i}` }>Pendente</p>
      <p data-testid={ `customer_orders__element-order-date${i}` }>00/00/0000</p>
      <p data-testid={ `customer_orders__element-card-price${i}` }>{subTotal}</p>
    </button>
  );
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    subTotal: PropTypes.string,
  }).isRequired,
  i: PropTypes.number.isRequired,
};
