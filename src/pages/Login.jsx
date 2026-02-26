import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, Sparkles, ShoppingBag, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Button from '../components/Button';
import Input from '../components/Input';

const Login = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, signup } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      if (isSignup) {
        if (!formData.name || !formData.email || !formData.password) {
          addToast('Please fill in all required fields', 'error');
          return;
        }
        if (formData.password.length < 6) {
          addToast('Password must be at least 6 characters', 'error');
          return;
        }
        signup(formData);
        addToast('Account created successfully!', 'success');
        navigate('/');
      } else {
        if (!formData.email || !formData.password) {
          addToast('Please enter email and password', 'error');
          return;
        }
        login(formData.email, formData.password);
        addToast('Welcome back!', 'success');
        navigate('/');
      }
    } catch (error) {
      addToast(error.message, 'error');
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setFormData({ name: '', email: '', password: '', phone: '' });
  };

  return (
    <div className="min-h-screen mesh-gradient flex items-center justify-center py-12 px-4">
      <motion.div
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="floating-object top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-br from-primary/30 to-transparent blur-3xl"
      />
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="floating-object top-40 right-20 w-80 h-80 rounded-full bg-gradient-to-br from-secondary/30 to-transparent blur-3xl"
      />

      <div className="w-full max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary via-purple-500 to-secondary flex items-center justify-center glow-pulse"
          >
            <Sparkles className="text-white" size={40} />
          </motion.div>
          <h1 className="luxury-heading text-5xl mb-2">LuxeStore</h1>
          <p className="text-white/60 text-lg">Where Luxury Meets Lifestyle</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="sophisticated-card p-8"
        >
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-white mb-2">
              {isSignup ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-white/60">
              {isSignup ? 'Join our luxury shopping experience' : 'Sign in to continue shopping'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">
                  Full Name *
                </label>
                <Input
                  icon={User}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  required={isSignup}
                  className="sophisticated-input"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-white/80 mb-2">
                Email Address *
              </label>
              <Input
                icon={Mail}
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john.doe@example.com"
                required
                className="sophisticated-input"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white/80 mb-2">
                Password *
              </label>
              <div className="relative">
                <Input
                  icon={Lock}
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder={isSignup ? 'At least 6 characters' : 'Enter your password'}
                  required
                  className="sophisticated-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {isSignup && (
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">
                  Phone Number (Optional)
                </label>
                <Input
                  icon={Phone}
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+234 XXX XXX XXXX"
                  className="sophisticated-input"
                />
              </div>
            )}

            <Button type="submit" size="lg" className="w-full luxury-button mt-6">
              <ShoppingBag className="mr-2" size={20} />
              {isSignup ? 'Create Account' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/60">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}
              <button
                type="button"
                onClick={toggleMode}
                className="ml-2 text-primary hover:text-secondary transition-colors font-semibold"
              >
                {isSignup ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
            <div className="flex items-center gap-3 text-sm text-white/60">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                ✓
              </div>
              <span>220+ Premium Products</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-white/60">
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                ✓
              </div>
              <span>Fast & Secure Checkout</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-white/60">
              <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                ✓
              </div>
              <span>24/7 Customer Support</span>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-white/40 text-sm mt-6"
        >
          By continuing, you agree to our Terms & Privacy Policy
        </motion.p>
      </div>
    </div>
  );
};

export default Login;
