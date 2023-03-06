import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import OrderCard from '../components/OrderCard';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const lsOrders = JSON.parse(localStorage.getItem('cartItems'));
    setOrders(Object.values(lsOrders));
  }, []);

  return (
    <section>
      <Header />
      <section>
        {orders && orders.map((order, i) => (
          <OrderCard key={ `order-${i}` } order={ order } i={ i } />
        ))}
      </section>
    </section>
  );
}
