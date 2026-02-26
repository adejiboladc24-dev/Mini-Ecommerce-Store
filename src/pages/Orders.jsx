import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock, XCircle, Eye, Download, ArrowRight } from 'lucide-react';
import Button from '../components/Button';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders.reverse());
  }, []);

  const statusConfig = {
    'Processing': { icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/20' },
    'Shipped': { icon: Truck, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/20' },
    'Delivered': { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/20' },
    'Cancelled': { icon: XCircle, color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/20' },
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status.toLowerCase() === filter);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Package size={64} className="text-gray-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            No orders yet
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Start shopping to see your orders here
          </p>
          <Link to="/products">
            <Button size="lg">
              Start Shopping
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-4 sm:py-6 md:py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            My Orders
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Track and manage your orders
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 sm:mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {['all', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold whitespace-nowrap transition-all text-sm sm:text-base ${
                filter === status
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                  : 'bg-white dark:bg-dark-card text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-hover'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.map((order, index) => {
            const StatusIcon = statusConfig[order.status]?.icon || Package;
            const statusColor = statusConfig[order.status]?.color || 'text-gray-500';
            const statusBg = statusConfig[order.status]?.bg || 'bg-gray-100';

            return (
              <motion.div
                key={order.orderNumber}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-dark-card rounded-2xl shadow-lg overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-dark-hover dark:to-dark-bg p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="w-full sm:w-auto">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-2">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                          Order #{order.orderNumber}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 w-fit ${statusBg} ${statusColor}`}>
                          <StatusIcon size={16} />
                          {order.status}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        Placed on {formatDate(order.date)}
                      </p>
                    </div>
                    <div className="text-left sm:text-right w-full sm:w-auto">
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Total Amount</p>
                      <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    {order.items.slice(0, 3).map((item) => (
                      <div key={`${item.id}-${JSON.stringify(item.selectedOptions)}`} className="flex gap-3 p-3 bg-gray-50 dark:bg-dark-hover rounded-xl">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                            {item.name}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Qty: {item.quantity}</p>
                          <p className="text-sm font-bold text-primary">${item.price}</p>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="flex items-center justify-center p-3 bg-gray-50 dark:bg-dark-hover rounded-xl">
                        <p className="text-gray-600 dark:text-gray-400 font-semibold">
                          +{order.items.length - 3} more items
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Order Details */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <Truck size={20} className="text-primary" />
                        Shipping Address
                      </h4>
                      <div className="bg-gray-50 dark:bg-dark-hover rounded-xl p-4">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {order.shippingInfo.firstName} {order.shippingInfo.lastName}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{order.shippingInfo.address}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zipCode}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <Package size={20} className="text-primary" />
                        Order Summary
                      </h4>
                      <div className="bg-gray-50 dark:bg-dark-hover rounded-xl p-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                          <span className="font-semibold text-gray-900 dark:text-white">${order.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {order.shippingCost === 0 ? 'FREE' : `$${order.shippingCost.toFixed(2)}`}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Tax</span>
                          <span className="font-semibold text-gray-900 dark:text-white">${order.tax.toFixed(2)}</span>
                        </div>
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between">
                          <span className="font-bold text-gray-900 dark:text-white">Total</span>
                          <span className="font-bold text-primary">${order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Actions */}
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <Eye size={18} className="mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download size={18} className="mr-2" />
                      Download Invoice
                    </Button>
                    {order.status === 'Delivered' && (
                      <Button variant="outline" size="sm">
                        <Package size={18} className="mr-2" />
                        Return Items
                      </Button>
                    )}
                    {order.status === 'Processing' && (
                      <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                        <XCircle size={18} className="mr-2" />
                        Cancel Order
                      </Button>
                    )}
                  </div>
                </div>

                {/* Tracking Progress */}
                {(order.status === 'Processing' || order.status === 'Shipped') && (
                  <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Order Tracking</h4>
                    <div className="flex items-center justify-between">
                      {['Order Placed', 'Processing', 'Shipped', 'Delivered'].map((step, idx) => (
                        <div key={step} className="flex items-center flex-1">
                          <div className="flex flex-col items-center flex-1">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              idx <= (['Processing', 'Shipped', 'Delivered'].indexOf(order.status) + 1)
                                ? 'bg-gradient-to-r from-primary to-secondary text-white'
                                : 'bg-gray-200 dark:bg-dark-hover text-gray-400'
                            }`}>
                              {idx <= (['Processing', 'Shipped', 'Delivered'].indexOf(order.status) + 1) ? (
                                <CheckCircle size={20} />
                              ) : (
                                <span className="text-sm font-bold">{idx + 1}</span>
                              )}
                            </div>
                            <p className="text-xs mt-2 text-center text-gray-600 dark:text-gray-400">{step}</p>
                          </div>
                          {idx < 3 && (
                            <div className={`h-1 flex-1 ${
                              idx < (['Processing', 'Shipped', 'Delivered'].indexOf(order.status) + 1)
                                ? 'bg-gradient-to-r from-primary to-secondary'
                                : 'bg-gray-200 dark:bg-dark-hover'
                            }`} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {filteredOrders.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Package size={64} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No orders found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              No orders match the selected filter
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Orders;
