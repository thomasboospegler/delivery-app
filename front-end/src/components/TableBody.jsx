import React from 'react';
import PropTypes from 'prop-types';

export default function TableBody({ data, index, removeItem }) {
  const dataTestId = [
    `customer_checkout__element-order-table-item-number-${index}`,
    `customer_checkout__element-order-table-name-${index}`,
    `customer_checkout__element-order-table-quantity-${index}`,
    `customer_checkout__element-order-table-unit-price-${index}`,
    `customer_checkout__element-order-table-sub-total-${index}`,
  ];
  return (
    <tr>
      { Object.values(data).map((field, i) => (
        <td key={ `${field}-${i}` } data-testid={ dataTestId[i] }>{ field }</td>
      )) }
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
    id: PropTypes.number.isRequired,
    map: PropTypes.func,
    index: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
  removeItem: PropTypes.func.isRequired,
};
