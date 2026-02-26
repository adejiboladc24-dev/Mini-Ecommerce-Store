import { motion } from 'framer-motion';
import { X, SlidersHorizontal } from 'lucide-react';
import { getCategories } from '../data/products';

const FilterSidebar = ({ 
  filters, 
  setFilters, 
  isOpen, 
  onClose,
  priceRange,
  setPriceRange 
}) => {
  const categories = getCategories();

  const handleCategoryToggle = (category) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleRatingChange = (rating) => {
    setFilters(prev => ({
      ...prev,
      minRating: prev.minRating === rating ? 0 : rating
    }));
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      minRating: 0,
      inStock: false,
    });
    setPriceRange([0, 500]);
  };

  const sidebarContent = (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-primary" />
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Filters</h2>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-lg transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Filters */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Categories */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm sm:text-base">Categories</h3>
          <div className="space-y-2">
            {categories.map(category => (
              <label
                key={category}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm sm:text-base">Price Range</h3>
          <div className="space-y-4">
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="w-full accent-primary"
            />
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-gray-600 dark:text-gray-400">$0</span>
              <span className="font-semibold text-primary">${priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm sm:text-base">Minimum Rating</h3>
          <div className="space-y-2">
            {[4.5, 4.0, 3.5, 3.0].map(rating => (
              <label
                key={rating}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="rating"
                  checked={filters.minRating === rating}
                  onChange={() => handleRatingChange(rating)}
                  className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                />
                <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">
                  {rating}+ ⭐
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm sm:text-base">Availability</h3>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => setFilters(prev => ({ ...prev, inStock: e.target.checked }))}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">
              In Stock Only
            </span>
          </label>
        </div>
      </div>

      {/* Clear Filters */}
      <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={clearFilters}
          className="w-full px-4 py-3 bg-gray-100 dark:bg-dark-hover text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-dark-card transition-colors font-semibold text-sm sm:text-base"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        className="lg:hidden fixed left-0 top-0 bottom-0 w-72 sm:w-80 bg-white dark:bg-dark-card z-50 shadow-2xl"
      >
        {sidebarContent}
      </motion.aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 xl:w-80 bg-white dark:bg-dark-card rounded-2xl shadow-lg sticky top-24 h-fit flex-shrink-0">
        {sidebarContent}
      </aside>
    </>
  );
};

export default FilterSidebar;
