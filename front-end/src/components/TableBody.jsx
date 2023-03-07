import React from 'react';
import PropTypes from 'prop-types';

export default function TableBody({ data, index, removeItem }) {
  return (
    <tr>
      <td
        data-testid={ `customer_checkout__element-order-table-item-number-${index}` }
      >
        { index + 1 }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-name-${index}` }
      >
        { data.name }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
      >
        { data.quantity }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }
      >
        { data.unitPrice.replace('.', ',') }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
      >
        { data.subTotal.replace('.', ',') }
      </td>
      <button
        type="button"
        data-testid={ `customer_checkout__element-order-table-remove-${index}` }
        onClick={ () => removeItem(data.id) }
      >
        Remover
      </button>
    </tr>
  );
}

TableBody.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    quantity: PropTypes.number,
    unitPrice: PropTypes.string,
    subTotal: PropTypes.string,
    map: PropTypes.func,
    index: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
  removeItem: PropTypes.func.isRequired,
};
