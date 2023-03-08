import React, { useContext, useEffect } from 'react';
import { getSallesBySeller } from '../api/orders';
import Header from '../components/Header';
import SellerOrderCard from '../components/SellerOrderCard';
import Context from '../context/Context';

export default function SellerOrders() {
  const { lsUserData, orders, setOrders } = useContext(Context);

  useEffect(() => {
    const getOrders = async () => {
      const result = await getSallesBySeller(lsUserData.token);

      setOrders(result.data);
    };
    getOrders();
  }, []);

  return (
    <div className="main-seller-order-container">
      <Header />
      {orders && orders.map((data, i) => (
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
      ))}
    </div>
  );
}
