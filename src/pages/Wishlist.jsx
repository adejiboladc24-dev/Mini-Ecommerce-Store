import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import Button from '../components/Button';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    addToast(`${product.name} added to cart!`, 'success');
  };

  const handleRemove = (product) => {
    removeFromWishlist(product.id);
    addToast(`${product.name} removed from wishlist`, 'info');
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-32 h-32 bg-gray-100 dark:bg-dark-hover rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart size={64} className="text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Your wishlist is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Save your favorite items for later
          </p>
          <Link to="/products">
            <Button size="lg">
              Browse Products
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
          className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              My Wishlist
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          {wishlist.length > 0 && (
            <Button
              variant="outline"
              onClick={() => {
                clearWishlist();
                addToast('Wishlist cleared', 'info');
              }}
              className="w-full sm:w-auto text-sm sm:text-base"
            >
              Clear Wishlist
            </Button>
          )}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {wishlist.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-dark-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all"
            >
              <Link to={`/product/${product.id}`} className="block">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemove(product);
                    }}
                    className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-dark-card/90 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <Heart size={20} fill="currentColor" />
                  </button>
                </div>
              </Link>

              <div className="p-5">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    ${product.price}
                  </span>
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>

                <Button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                  className="w-full"
                >
                  <ShoppingCart size={18} className="mr-2" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
