import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const OrderList = () => {
  const navigate=useNavigate
  const { user, refreshUser, isLoading, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [cancellingOrderId, setCancellingOrderId] = useState(null);

  
  useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        await refreshUser();
      })();
    }
  }, [isAuthenticated, refreshUser]);

  
  useEffect(() => {
    if (user?.orders) {
      setOrders(user.orders);
    }
  }, [user]);

  
  const cancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;

    try {
      setCancellingOrderId(orderId);

      
      const updatedOrders = user.orders.filter(order => order.id !== orderId);

      
      const res = await fetch(`http://localhost:3001/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orders: updatedOrders }),
      });

      if (!res.ok) {
        throw new Error('Failed to cancel order');
      }

      
      await refreshUser();

      alert('Order cancelled successfully.');
    } catch (error) {
      console.error('Cancel order error:', error);
      alert('Could not cancel the order. Please try again.');
    } finally {
      setCancellingOrderId(null);
    }
  };

  if (isLoading) {
    return <p>Loading your orders...</p>;
  }

  if (!isAuthenticated) {
    return <p>Please log in to see your orders.</p>;
  }

  if (!orders.length) {
    return<> 
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
    <p className=" text-gray-600 mt-10 text-lg font-medium">
  You have no orders yet.
</p>
<button
  onClick={() => navigate('/products')}
  className="mt-6 px-8 py-3 bg-black text-white font-medium tracking-wider 
             border border-black hover:bg-white hover:text-black 
             transition-all duration-300 ease-in-out uppercase
             text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
>
  Continue Shopping
</button>
</div>
</>
;
  }
  

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Your Orders</h2>

      {orders
        .slice()
        .reverse() 
        .map((order) => (
          <div
            key={order.id}
            className="mb-8 border rounded shadow p-4 bg-white"
          >
            <div className="flex justify-between items-center mb-2">
              <p>
                <strong>Order ID:</strong> {order.id}
              </p>
              <p>
                <strong>Status:</strong>{' '}
                <span
                  className={
                    order.status === 'pending'
                      ? 'text-yellow-600'
                      : order.status === 'paid'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </p>
            </div>
            <p className="mb-2">
              <strong>Placed at:</strong>{' '}
              {new Date(order.placed_at).toLocaleString()}
            </p>
            <p className="mb-4">
              <strong>Total Amount:</strong> ₹{order.totalAmount.toLocaleString()}
            </p>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Shipping Address</h4>
              <address className="not-italic text-sm">
                {order.shipping.firstName} {order.shipping.lastName}
                <br />
                {order.shipping.address}
                <br />
                {order.shipping.city}, {order.shipping.state} - {order.shipping.pincode}
                <br />
                {order.shipping.country}
                <br />
                Phone: {order.shipping.phone}
              </address>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Billing Address</h4>
              {order.billing.sameAsShipping ? (
                <p>Same as shipping address</p>
              ) : (
                <address className="not-italic text-sm">
                  {order.billing.firstName} {order.billing.lastName}
                  <br />
                  {order.billing.address}
                  <br />
                  {order.billing.city}, {order.billing.state} - {order.billing.pincode}
                  <br />
                  {order.billing.country}
                  <br />
                  Phone: {order.billing.phone}
                </address>
              )}
            </div>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Contact Email</h4>
              <p>{order.contact.email}</p>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Payment Method</h4>
              <p>{order.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Credit/Debit Card'}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Ordered Items</h4>
              <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {order.cart.map((item) => (
                  <li key={item.id} className="flex items-center py-2 space-x-4">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-16 h-16 rounded object-cover flex-shrink-0"
                    />
                    <div className="flex-grow">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                      <p className="text-sm">Category: {item.category}</p>
                      <p className="text-sm">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{item.price.toLocaleString()}</p>
                      <p className="text-sm text-gray-700">
                        Subtotal: ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => cancelOrder(order.id)}
                disabled={cancellingOrderId === order.id}
                className={`px-4 py-2 rounded text-white transition ${
                  cancellingOrderId === order.id
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {cancellingOrderId === order.id ? 'Cancelling...' : 'Cancel Order'}
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default OrderList;
