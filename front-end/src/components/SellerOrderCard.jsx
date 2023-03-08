import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

export default function SellerOrderCard({ order, index }) {
  const history = useHistory();
  const { subTotal, id, date, status, address } = order;
  console.log(order);
  return (
    <button
      key={ `order-${index}` }
      type="button"
      data-testid={ `seller_orders__element-order-id-${id}` }
      onClick={ () => history.push(`/seller/orders/${id}`) }
    >
      <p data-testid={ `seller_orders__element-order-id-${id}` }>
        {`Pedido ${id + 1}`}
      </p>
      <p data-testid={ `seller_orders__element-delivery-status-${id}` }>{ status }</p>
      <p data-testid={ `seller_orders__element-order-date-${id}` }>{ date }</p>
      <p data-testid={ `seller_orders__element-card-price-${id}` }>
        { subTotal.replace('.', ',') }
      </p>
      <p data-testid={ `seller_orders__element-card-address-${id}` }>{ address }</p>
    </button>
  );
}

SellerOrderCard.propTypes = {
  order: PropTypes.shape({
    subTotal: PropTypes.string,
    id: PropTypes.number,
    status: PropTypes.string,
    date: PropTypes.string,
    address: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
