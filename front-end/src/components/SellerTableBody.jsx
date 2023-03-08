import React from 'react';
import PropTypes from 'prop-types';

export default function SellerTableBody({ data, index }) {
  console.log(data);
  return (
    <tr>
      <td
        data-testid={ `seller_order_details__element-order-table-item-number-${index}` }
      >
        { index + 1 }
      </td>
      <td
        data-testid={ `seller_order_details__element-order-table-name-${index}` }
      >
        { data.name }
      </td>
      <td
        data-testid={ `seller_order_details__element-order-table-quantity-${index}` }
      >
        { data.SalesProducts.quantity }
      </td>
      <td
        data-testid={ `seller_order_details__element-order-table-unit-price-${index}` }
      >
        { data.price.replace('.', ',') }
      </td>
      <td
        data-testid={ `seller_order_details__element-order-table-sub-total-${index}` }
      >
        { (Number(data.price) * data.SalesProducts.quantity)
          .toFixed(2).replace('.', ',') }
      </td>
    </tr>
  );
}

SellerTableBody.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.string,
    subTotal: PropTypes.string,
    map: PropTypes.func,
    index: PropTypes.number,
    SalesProducts: PropTypes.shape({
      quantity: PropTypes.number,
    }),
  }).isRequired,
  index: PropTypes.number.isRequired,
};
