import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, Shield, Zap, Award, ShoppingBag, Star, Package, Truck } from 'lucide-react';
import { getFeaturedProducts, getCategories, products } from '../data/products';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import { useState, useEffect } from 'react';

const Home = () => {
  const featuredProducts = getFeaturedProducts().slice(0, 8);
  const categories = getCategories();
  const { scrollY } = useScroll();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [stats, setStats] = useState({ orders: 0, customers: 0, products: 0, rating: 0 });
  
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Automatic slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [featuredProducts.length]);

  // Animated stats counter
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setStats({
        orders: Math.floor(15420 * progress),
        customers: Math.floor(8750 * progress),
        products: Math.floor(220 * progress),
        rating: (4.9 * progress).toFixed(1)
      });
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const testimonials = [
    { name: "Sarah Johnson", text: "Best online shopping experience! Fast delivery and quality products.", rating: 5 },
    { name: "Michael Chen", text: "LuxeStore has everything I need. The customer service is exceptional!", rating: 5 },
    { name: "Emma Williams", text: "Love the variety and quality. My go-to store for everything!", rating: 5 }
  ];

  return (
    <div className="min-h-screen mesh-gradient">
      {/* Epic Hero Section with Slideshow */}
      <section className="sophisticated-hero relative pt-20 overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          style={{ y: y1 }}
          className="floating-object top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-br from-primary/30 to-transparent blur-3xl"
        />
        <motion.div
          style={{ y: y2 }}
          className="floating-object top-40 right-20 w-80 h-80 rounded-full bg-gradient-to-br from-secondary/30 to-transparent blur-3xl"
        />
        <motion.div
          className="floating-object bottom-20 left-1/4 w-48 h-48 rounded-full bg-gradient-to-br from-purple-500/30 to-transparent blur-3xl float-slow"
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-5rem)]">
            {/* Left Content - Prominent Branding */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              style={{ opacity }}
              className="space-y-8"
            >
              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-white/20"
              >
                <Sparkles size={20} className="text-secondary animate-pulse" />
                <span className="text-white/90 font-semibold">Premium Collection 2026</span>
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              </motion.div>

              {/* Main Brand Logo & Name */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-primary via-purple-500 to-secondary flex items-center justify-center glow-pulse"
                  >
                    <Sparkles className="text-white" size={32} />
                  </motion.div>
                  <div>
                    <h1 className="luxury-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-2">
                      LuxeStore
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60 tracking-widest uppercase">Where Luxury Meets Lifestyle</p>
                  </div>
                </div>
              </motion.div>

              {/* Tagline */}
              <motion.p
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/80 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Your <span className="gradient-text font-bold">Premium Destination</span> for Electronics, Fashion, Kitchen & Sports
              </motion.p>

              {/* Live Stats */}
              <motion.div
                className="grid grid-cols-2 gap-3 sm:gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {[
                  { label: 'Happy Customers', value: stats.customers.toLocaleString(), icon: '👥' },
                  { label: 'Orders Delivered', value: stats.orders.toLocaleString(), icon: '📦' },
                  { label: 'Products', value: stats.products + '+', icon: '🛍️' },
                  { label: 'Rating', value: stats.rating + '⭐', icon: '⭐' }
                ].map((stat, index) => (
                  <div key={index} className="sophisticated-card p-3 sm:p-4 text-center">
                    <div className="text-2xl sm:text-3xl mb-1">{stat.icon}</div>
                    <div className="text-xl sm:text-2xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-xs text-white/50">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Link to="/products" className="w-full sm:w-auto">
                  <Button size="lg" className="luxury-button group text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
                    <ShoppingBag className="mr-2" size={20} />
                    Shop Now
                    <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={20} />
                  </Button>
                </Link>
                <Link to="/products?category=Fashion" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="glass border-white/30 text-white hover:bg-white/10 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
                    <TrendingUp className="mr-2" size={20} />
                    Trending Now
                  </Button>
                </Link>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                className="flex flex-wrap gap-3 sm:gap-4 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {['🔒 Secure Payment', '🚚 Fast Delivery', '✅ Quality Guaranteed'].map((badge, i) => (
                  <div key={i} className="px-3 sm:px-4 py-2 glass rounded-full text-xs sm:text-sm text-white/80">
                    {badge}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Automatic Product Slideshow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative h-[400px] sm:h-[500px] md:h-[600px]"
            >
              {/* Main Slideshow */}
              <div className="relative h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotateY: 30 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0"
                  >
                    <div className="sophisticated-card p-8 h-full flex flex-col">
                      <div className="flex-1 relative rounded-2xl overflow-hidden mb-4">
                        <img
                          src={featuredProducts[currentSlide]?.image}
                          alt={featuredProducts[currentSlide]?.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4 premium-badge">
                          Featured
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {featuredProducts[currentSlide]?.name}
                          </h3>
                          <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold gradient-text">
                              ${featuredProducts[currentSlide]?.price}
                            </span>
                            <div className="flex items-center gap-1">
                              <Star size={20} className="text-yellow-400 fill-yellow-400" />
                              <span className="text-white font-semibold">
                                {featuredProducts[currentSlide]?.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Slide Indicators */}
                      <div className="flex justify-center gap-2">
                        {featuredProducts.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-2 rounded-full transition-all ${
                              index === currentSlide 
                                ? 'w-8 bg-gradient-to-r from-primary to-secondary' 
                                : 'w-2 bg-white/30'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20 rounded-3xl blur-3xl -z-10"></div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-10 -right-10 w-40 h-40 border-2 border-white/10 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-10 -left-10 w-32 h-32 border-2 border-white/10 rounded-full"
              />
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity }}
          className="scroll-indicator"
        />
      </section>

      {/* Promotional Banner */}
      <section className="py-4 bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 shimmer"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center gap-4 text-white text-center">
            <Zap className="animate-pulse" size={24} />
            <p className="text-lg font-bold">🔥 FLASH SALE: Up to 70% OFF on Selected Items! Limited Time Only!</p>
            <Zap className="animate-pulse" size={24} />
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="luxury-text text-5xl font-bold text-white mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-white/60">
              Explore our premium collections
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <Link
                  to={`/products?category=${category}`}
                  className="block sophisticated-card p-8 text-center group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-secondary/0 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-5xl mb-4">
                      {category === 'Electronics' && '💻'}
                      {category === 'Fashion' && '👔'}
                      {category === 'Kitchen' && '🍳'}
                      {category === 'Sports' && '⚽'}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:gradient-text transition-all">
                      {category}
                    </h3>
                    <p className="text-sm text-white/50 mb-4">55+ Products</p>
                    <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="luxury-text text-5xl font-bold text-white mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-white/60">
              Handpicked premium items just for you
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/products">
              <Button size="lg" className="luxury-button">
                View All 220+ Products
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="luxury-text text-5xl font-bold text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-white/60">
              Join thousands of satisfied shoppers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="sophisticated-card p-6"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-white/80 mb-4 italic">"{testimonial.text}"</p>
                <p className="text-white font-semibold">- {testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-purple-500/30 to-secondary/30"></div>
        <div className="absolute inset-0 shimmer"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="luxury-text text-6xl md:text-7xl font-bold text-white mb-6">
              Start Shopping Today
            </h2>
            <p className="text-2xl text-white/80 mb-8 max-w-2xl mx-auto">
              Experience luxury shopping with fast delivery, secure payments, and premium quality products
            </p>
            <Link to="/products">
              <Button size="lg" className="luxury-button text-xl px-12 py-6">
                <ShoppingBag className="mr-3" size={28} />
                Explore Collection
                <ArrowRight className="ml-3" size={28} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
