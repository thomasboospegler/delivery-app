import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import SellerTableBody from '../components/SellerTableBody';
import Context from '../context/Context';
import { getOrderById } from '../api/orders';

export default function SellerOrdersDetails() {
  const { lsUserData } = useContext(Context);
  const [orderDetails, setOrderDetails] = useState();
  const [status, setStatus] = useState('');
  const [isDisabledPreparing, setIsDisabledPreaparing] = useState(false);
  const [isDisabledDispatch, setIsDisabledDispatch] = useState(true);
  const location = useLocation();
  const DELIVERYSID = 'seller_order_details__element-order-details-label-delivery-status';

  useEffect(() => {
    const getOrders = async () => {
      const result = await getOrderById(
        lsUserData.token,
        location.pathname.substring(location.pathname.length - 1),
      );
      setOrderDetails(...result);
    };
    getOrders();
  }, []);
  console.log(orderDetails);

  return (
    <div>
      <Header />
      <h1>Finalizar Pedido</h1>
      { orderDetails && (
        <div>
          <div>
            <button
              type="button"
              data-testid="seller_order_details__element-order-details-label-order-id"
            >
              PEDIDO
              {' '}
              { '  ' }
              {location.pathname.substring(location.pathname.length - 1)}
            </button>
          </div>
          <div>
            <div
              data-testid="seller_order_details__element-order-details-label-order-date"
            >
              { new Intl
                .DateTimeFormat('pt-BR').format(new Date(orderDetails.saleDate)) }
            </div>
          </div>
          <div>
            <div
              data-testid={ DELIVERYSID }
            >
              { orderDetails.status }
            </div>
          </div>
          <div>
            <button
              type="button"
              data-testid="seller_order_details__button-preparing-check"
              value={ status }
              disabled={ isDisabledPreparing }
            >
              { status }
            </button>
          </div>
          <div>
            <button
              type="button"
              data-testid="seller_order_details__button-dispatch-check"
              disabled={ isDisabledDispatch }
            >
              Saiu Para Entrega;
            </button>
          </div>
        </div>)}
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          { orderDetails && orderDetails.products?.map((data, i) => {
            console.log(data);
            return (
              <SellerTableBody
                data={ data }
                index={ i }
                key={ `${data.name}-${i}` }
              />
            );
          })}
        </tbody>
        {orderDetails && (
          <div data-testid="seller_order_details__element-order-total-price">
            { Number(orderDetails.totalPrice).toFixed(2).replace('.', ',') }
          </div>
        )}
      </table>
    </div>
  );
}
