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
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <motion.div
                key={`${item.id}-${JSON.stringify(item.selectedOptions)}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-lg"
              >
                <div className="flex gap-6">
                  {/* Image */}
                  <Link to={`/product/${item.id}`} className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <div>
                        <Link
                          to={`/product/${item.id}`}
                          className="text-xl font-bold text-gray-900 dark:text-white hover:text-primary transition-colors"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.category}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemove(item)}
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors group"
                      >
                        <Trash2
                          size={20}
                          className="text-gray-400 group-hover:text-red-500 transition-colors"
                        />
                      </button>
                    </div>

                    {/* Selected Options */}
                    {Object.keys(item.selectedOptions).length > 0 && (
                      <div className="flex gap-4 mb-4">
                        {Object.entries(item.selectedOptions).map(([key, value]) => (
                          <span
                            key={key}
                            className="text-sm text-gray-600 dark:text-gray-400"
                          >
                            <span className="font-semibold capitalize">{key}:</span> {value}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <QuantitySelector
                        quantity={item.quantity}
                        onIncrease={() =>
                          updateQuantity(item.id, item.quantity + 1, item.selectedOptions)
                        }
                        onDecrease={() =>
                          updateQuantity(item.id, item.quantity - 1, item.selectedOptions)
                        }
                      />
                      <div className="text-right">
                        <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
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
            <div className="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span className="font-semibold">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-500">Free</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax</span>
                  <span className="font-semibold">
                    ${(getCartTotal() * 0.1).toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      ${(getCartTotal() * 1.1).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Button onClick={handleCheckout} size="lg" className="w-full mb-4">
                Proceed to Checkout
                <ArrowRight className="ml-2" size={20} />
              </Button>

              <Link to="/products">
                <Button variant="outline" size="lg" className="w-full">
                  Continue Shopping
                </Button>
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                    ✓
                  </div>
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                    ✓
                  </div>
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
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
