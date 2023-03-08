import React, { useContext, useEffect, useState } from 'react';
import { getSallesBySeller } from '../api/orders';
import Header from '../components/Header';
import SellerOrderCard from '../components/SellerOrderCard';
import Context from '../context/Context';

export default function SellerOrders() {
  const { lsUserData } = useContext(Context);
  const [orders, setOrders] = useState();

  useEffect(() => {
    const getOrders = async () => {
      const result = await getSallesBySeller(lsUserData.token);
      console.log(result);
      setOrders(result.data);
    };
    getOrders();
  }, []);

  return (
    <div className="main-seller-order-container">
      <Header />
      {orders && orders.map((data, i) => {
        console.log(data);
        return (
          <SellerOrderCard
            order={ {
              subTotal: data.totalPrice,
              id: data.id,
              date: data.saleDate,
              status: data.status,
              address: `${data.deliveryAddress}, ${data.deliveryNumber}` } }
            index={ i }
            key={ `${data.id}-${i}` }
          />
        );
      })}
    </div>
  );
}
