import React from 'react';
import PropTypes from 'prop-types';

export default function TableBody({ data, index }) {
  console.log(data);
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
      >
        Remover
      </button>
    </tr>
  );
}

TableBody.propTypes = {
  data: PropTypes.shape({
    map: PropTypes.func,
    index: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
