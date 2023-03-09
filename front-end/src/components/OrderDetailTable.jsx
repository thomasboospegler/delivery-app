import React from 'react';
import PropTypes from 'prop-types';

export default function OrderDetailTable({ order }) {
  const testIdBase = 'customer_order_details__element-order';
  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Produto</th>
          <th>Quantidade</th>
          <th>Preço Unitário</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {order.products && order.products.map((product, index) => (
          <tr key={ index }>
            <td
              data-testid={ `${testIdBase}-table-item-number-${index}` }
            >
              {index + 1}
            </td>
            <td
              data-testid={ `${testIdBase}-table-name-${index}` }
            >
              {product.name}
            </td>
            <td
              data-testid={ `${testIdBase}-table-quantity-${index}` }
            >
              {product.SalesProducts.quantity}
            </td>
            <td
              data-testid={ `${testIdBase}-table-unit-price-${index}` }
            >
              {product.price}
            </td>
            <td
              data-testid={ `${testIdBase}-table-sub-total-${index}` }
            >
              {(product.price * product.SalesProducts.quantity).toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

OrderDetailTable.propTypes = {
  order: PropTypes.shape({
    products: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.string,
      SalesProducts: PropTypes.shape({
        quantity: PropTypes.number,
      }),
    })),
  }).isRequired,
};
