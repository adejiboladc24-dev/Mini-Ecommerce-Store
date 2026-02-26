import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, Truck, Shield, ArrowLeft } from 'lucide-react';
import { getProductById, products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import ProductGallery from '../components/ProductGallery';
import ProductCard from '../components/ProductCard';
import QuantitySelector from '../components/QuantitySelector';
import Button from '../components/Button';

const ProductDetails = () => {
  const { id } = useParams();
  const product = getProductById(id);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.options.colors[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.options.sizes[0] || '');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Product not found
          </h2>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    const selectedOptions = {
      ...(selectedColor && { color: selectedColor }),
      ...(selectedSize && { size: selectedSize }),
    };
    addToCart(product, quantity, selectedOptions);
    addToast(`${quantity} ${product.name} added to cart!`, 'success');
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      addToast(`${product.name} removed from wishlist`, 'info');
    } else {
      addToWishlist(product);
      addToast(`${product.name} added to wishlist!`, 'success');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Products
          </Link>
        </motion.div>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 mb-12 sm:mb-16 md:mb-20">
          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ProductGallery images={product.images} productName={product.name} />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4 sm:space-y-6"
          >
            <div>
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                {product.category}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 break-words">
                {product.name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }
                    />
                  ))}
                </div>
                <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4 sm:py-6">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                ${product.price}
              </div>
              <p className={`text-sm font-semibold ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
                {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
              </p>
            </div>

            {/* Options */}
            {product.options.colors.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm sm:text-base">
                  Color: <span className="text-primary">{selectedColor}</span>
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {product.options.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 sm:px-4 py-2 rounded-lg border-2 transition-all text-sm sm:text-base ${
                        selectedColor === color
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-gray-300 dark:border-gray-700 hover:border-primary/50'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.options.sizes.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm sm:text-base">
                  Size: <span className="text-primary">{selectedSize}</span>
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {product.options.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 sm:px-4 py-2 rounded-lg border-2 transition-all text-sm sm:text-base ${
                        selectedSize === size
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-gray-300 dark:border-gray-700 hover:border-primary/50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm sm:text-base">Quantity</h3>
              <QuantitySelector
                quantity={quantity}
                onIncrease={() => setQuantity(q => q + 1)}
                onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 w-full"
                size="lg"
              >
                <ShoppingCart size={20} className="mr-2" />
                Add to Cart
              </Button>
              <Button
                onClick={handleWishlistToggle}
                variant={inWishlist ? 'primary' : 'outline'}
                size="lg"
                className="w-full sm:w-auto"
              >
                <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4 sm:pt-6">
              <div className="flex items-center gap-3 p-3 sm:p-4 bg-gray-100 dark:bg-dark-hover rounded-lg">
                <Truck className="text-primary flex-shrink-0" size={24} />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm">
                    Free Delivery
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    On orders over $50
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 sm:p-4 bg-gray-100 dark:bg-dark-hover rounded-lg">
                <Shield className="text-primary flex-shrink-0" size={24} />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm">
                    Secure Payment
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    100% protected
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
