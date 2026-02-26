import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, ArrowLeft, Package, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import Button from '../components/Button';
import Input from '../components/Input';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
  });

  const subtotal = getCartTotal();
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.phone || !formData.email || !formData.address || !formData.city || !formData.state) {
      addToast('Please fill in all required fields', 'error');
      return;
    }

    // Prepare WhatsApp message with form data and cart items
    const itemsList = cart.map(item => 
      `• ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`
    ).join('%0A');
    
    const whatsappMessage = `🛍️ *New Order from LuxeStore*%0A%0A` +
      `*Customer Information:*%0A` +
      `Name: ${formData.name}%0A` +
      `Phone: ${formData.phone}%0A` +
      `Email: ${formData.email}%0A%0A` +
      `*Delivery Address:*%0A` +
      `${formData.address}%0A` +
      `${formData.city}, ${formData.state}%0A%0A` +
      `*Order Items:*%0A${itemsList}%0A%0A` +
      `*Order Summary:*%0A` +
      `Subtotal: $${subtotal.toFixed(2)}%0A` +
      `Tax (10%): $${tax.toFixed(2)}%0A` +
      `*Total: $${total.toFixed(2)}*%0A%0A` +
      `Please confirm this order and provide payment details. Thank you!`;
    
    // Open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/2347070279453?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');
    
    // Save order to localStorage
    const orderNum = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push({
      orderNumber: orderNum,
      date: new Date().toISOString(),
      items: cart,
      customerInfo: formData,
      subtotal,
      tax,
      total,
      status: 'Processing',
    });
    localStorage.setItem('orders', JSON.stringify(orders));
    
    clearCart();
    addToast('Redirecting to WhatsApp...', 'success');
    
    // Redirect to home after a short delay
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen mesh-gradient flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Package size={64} className="text-white/40 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Your cart is empty
          </h2>
          <p className="text-white/60 mb-8">
            Add some items to your cart before checking out
          </p>
          <Button onClick={() => navigate('/products')}>
            <ShoppingBag className="mr-2" size={20} />
            Continue Shopping
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mesh-gradient py-8 pt-28">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            Back to Cart
          </button>
          <h1 className="luxury-text text-5xl font-bold text-white mb-2">Checkout</h1>
          <p className="text-white/60 text-lg">Complete your order details</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sophisticated-card p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <User className="text-primary" size={32} />
                <h2 className="text-3xl font-bold text-white">
                  Customer Information
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                      <User size={20} className="text-primary" />
                    </div>
                    <label className="text-base font-semibold text-white">
                      Full Name *
                    </label>
                  </div>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your full name"
                    required
                    className="sophisticated-input"
                  />
                </div>

                {/* Phone */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Phone size={20} className="text-primary" />
                    </div>
                    <label className="text-base font-semibold text-white">
                      Phone Number *
                    </label>
                  </div>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+234 XXX XXX XXXX"
                    required
                    className="sophisticated-input"
                  />
                </div>

                {/* Email */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Mail size={20} className="text-primary" />
                    </div>
                    <label className="text-base font-semibold text-white">
                      Email Address *
                    </label>
                  </div>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="your.email@example.com"
                    required
                    className="sophisticated-input"
                  />
                </div>

                {/* Address */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                      <MapPin size={20} className="text-primary" />
                    </div>
                    <label className="text-base font-semibold text-white">
                      Delivery Address *
                    </label>
                  </div>
                  <Input
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="123 Main Street, Apartment 4B"
                    required
                    className="sophisticated-input"
                  />
                </div>

                {/* City and State */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-3">
                      City *
                    </label>
                    <Input
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      placeholder="Lagos"
                      required
                      className="sophisticated-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-3">
                      State *
                    </label>
                    <Input
                      value={formData.state}
                      onChange={(e) => setFormData({...formData, state: e.target.value})}
                      placeholder="Lagos State"
                      required
                      className="sophisticated-input"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button type="submit" size="lg" className="w-full luxury-button text-lg py-4">
                  <Package className="mr-2" size={24} />
                  Submit Order & Contact via WhatsApp
                </Button>

                {/* Info Text */}
                <div className="glass rounded-xl p-4 mt-4">
                  <p className="text-sm text-white/70 text-center">
                    🔒 After submitting, you'll be redirected to WhatsApp to complete your order with our team
                  </p>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sophisticated-card p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div 
                    key={`${item.id}-${JSON.stringify(item.selectedOptions)}`} 
                    className="flex gap-3 p-3 glass rounded-lg"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded-lg" 
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white text-sm truncate">{item.name}</h3>
                      <p className="text-xs text-white/50">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold gradient-text whitespace-nowrap">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 border-t border-white/10 pt-4">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal ({cart.length} items)</span>
                  <span className="font-semibold text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-400">FREE</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Tax (10%)</span>
                  <span className="font-semibold text-white">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-white/10 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-white">
                      Total
                    </span>
                    <span className="text-3xl font-bold gradient-text">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex items-center gap-3 text-sm text-white/60">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                    ✓
                  </div>
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/60">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                    ✓
                  </div>
                  <span>Free shipping</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/60">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                    ✓
                  </div>
                  <span>30-day return policy</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
