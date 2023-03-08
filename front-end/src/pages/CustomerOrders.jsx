import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import CustomerOrderCard from '../components/CustomerOrderCard';
import Context from '../context/Context';
import { getCustomerOrders } from '../api/orders';

export default function CustomerOrders() {
  const { lsUserData } = useContext(Context);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getCustomerOrders(lsUserData.email, lsUserData.token);
      setOrders(data);
      console.log(data);
    };
    fetchOrders();
  }, [lsUserData]);

  return (
    <section>
      <Header />
      <section>
        {orders && orders.map((order, i) => (
          <CustomerOrderCard key={ `order-${i}` } order={ order } i={ i } />
        ))}
      </section>
    </section>
  );
}
