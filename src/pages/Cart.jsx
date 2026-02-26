import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import QuantitySelector from '../components/QuantitySelector';
import Button from '../components/Button';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { addToast } = useToast();

  const handleRemove = (item) => {
    removeFromCart(item.id, item.selectedOptions);
    addToast(`${item.name} removed from cart`, 'info');
  };

  const handleCheckout = () => {
      // Navigate to checkout page
      navigate('/checkout');
    };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-32 h-32 bg-gray-100 dark:bg-dark-hover rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={64} className="text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Looks like you haven't added anything to your cart yet
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
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-4 sm:py-8">
      <div className="container mx-auto px-2 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Shopping Cart
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {cart.map((item, index) => (
              <motion.div
                key={`${item.id}-${JSON.stringify(item.selectedOptions)}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-dark-card rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg"
              >
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6">
                  {/* Image */}
                  <Link to={`/product/${item.id}`} className="flex-shrink-0 mx-auto sm:mx-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-lg"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-2 gap-2">
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${item.id}`}
                          className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white hover:text-primary transition-colors line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          {item.category}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemove(item)}
                        className="p-1.5 sm:p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors group flex-shrink-0"
                      >
                        <Trash2
                          size={18}
                          className="text-gray-400 group-hover:text-red-500 transition-colors sm:w-5 sm:h-5"
                        />
                      </button>
                    </div>

                    {/* Selected Options */}
                    {Object.keys(item.selectedOptions).length > 0 && (
                      <div className="flex flex-wrap gap-2 sm:gap-4 mb-3 sm:mb-4">
                        {Object.entries(item.selectedOptions).map(([key, value]) => (
                          <span
                            key={key}
                            className="text-xs sm:text-sm text-gray-600 dark:text-gray-400"
                          >
                            <span className="font-semibold capitalize">{key}:</span> {value}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                      <QuantitySelector
                        quantity={item.quantity}
                        onIncrease={() =>
                          updateQuantity(item.id, item.quantity + 1, item.selectedOptions)
                        }
                        onDecrease={() =>
                          updateQuantity(item.id, item.quantity - 1, item.selectedOptions)
                        }
                      />
                      <div className="text-left sm:text-right w-full sm:w-auto">
                        <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          ${item.price} each
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                variant="ghost"
                onClick={() => {
                  clearCart();
                  addToast('Cart cleared', 'info');
                }}
                className="w-full"
              >
                Clear Cart
              </Button>
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <div className="bg-white dark:bg-dark-card rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div className="flex justify-between text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span className="font-semibold">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-500">Free</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  <span>Tax</span>
                  <span className="font-semibold">
                    ${(getCartTotal() * 0.1).toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3 sm:pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      ${(getCartTotal() * 1.1).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Button onClick={handleCheckout} size="lg" className="w-full mb-3 sm:mb-4 text-sm sm:text-base">
                Proceed to Checkout
                <ArrowRight className="ml-2" size={18} />
              </Button>

              <Link to="/products">
                <Button variant="outline" size="lg" className="w-full text-sm sm:text-base">
                  Continue Shopping
                </Button>
              </Link>

              {/* Trust Badges */}
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700 space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                    ✓
                  </div>
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                    ✓
                  </div>
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                    ✓
                  </div>
                  <span>30-day return policy</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
