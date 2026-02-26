import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

const ProductCard = ({ product, index = 0 }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();
  const inWishlist = isInWishlist(product.id);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
    addToast(`${product.name} added to cart!`, 'success');
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
      addToast(`${product.name} removed from wishlist`, 'info');
    } else {
      addToWishlist(product);
      addToast(`${product.name} added to wishlist!`, 'success');
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const getPlaceholderImage = () => {
    const colors = ['6C63FF', '00F5FF', 'FF6B9D', 'FFC837', '00D9FF'];
    const color = colors[product.id % colors.length];
    return `https://via.placeholder.com/800x800/${color}/FFFFFF?text=${encodeURIComponent(product.name.substring(0, 20))}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group"
    >
      <Link to={`/product/${product.id}`}>
        <div className="luxury-product-card">
          {/* Image Container */}
          <div className="relative overflow-hidden aspect-square bg-gray-100 dark:bg-gray-800">
            <img
              src={imageError ? getPlaceholderImage() : product.image}
              alt={product.name}
              onError={handleImageError}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Overlay Actions */}
            <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleWishlistToggle}
                className={`p-3 rounded-full backdrop-blur-md transition-all ${
                  inWishlist 
                    ? 'bg-red-500/90 text-white' 
                    : 'bg-white/90 text-gray-900 hover:bg-red-500 hover:text-white'
                }`}
              >
                <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleAddToCart}
                className="p-3 bg-white/90 hover:bg-primary hover:text-white rounded-full backdrop-blur-md transition-all"
              >
                <ShoppingCart size={20} />
              </motion.button>
              
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-white/90 hover:bg-secondary hover:text-white rounded-full backdrop-blur-md transition-all"
              >
                <Eye size={20} />
              </motion.div>
            </div>

            {/* Badges */}
            {product.featured && (
              <div className="absolute top-4 left-4 premium-badge">
                Featured
              </div>
            )}
            
            {!product.inStock && (
              <div className="absolute top-4 right-4 px-3 py-1 bg-red-500/90 backdrop-blur-md text-white text-xs font-semibold rounded-full">
                Out of Stock
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-primary/80 uppercase tracking-wider">
                {product.category}
              </span>
              <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-semibold text-white/90">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-xs text-white/50">({product.reviews})</span>
              </div>
            </div>

            <h3 className="font-bold text-lg text-white mb-2 line-clamp-2 group-hover:gradient-text transition-all">
              {product.name}
            </h3>

            <p className="text-white/60 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-bold gradient-text">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="px-5 py-2.5 luxury-button text-white rounded-xl font-semibold text-sm"
              >
                Add to Cart
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
