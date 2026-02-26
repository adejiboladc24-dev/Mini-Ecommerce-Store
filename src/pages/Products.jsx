import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Grid, List, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { products, searchProducts, paginateProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import Button from '../components/Button';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState({ products: [], totalPages: 1 });
  const [filters, setFilters] = useState({
    categories: [],
    minRating: 0,
    inStock: false,
  });

  const PRODUCTS_PER_PAGE = 12;

  useEffect(() => {
    let result = [...products];

    // Apply search query
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      result = searchProducts(searchQuery);
    }

    // Apply category filter from URL
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      result = result.filter(p => p.category === categoryParam);
    }

    // Apply filters
    if (filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category));
    }

    if (filters.minRating > 0) {
      result = result.filter(p => p.rating >= filters.minRating);
    }

    if (filters.inStock) {
      result = result.filter(p => p.inStock);
    }

    // Apply price range
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    setFilteredProducts(result);
    
    // Apply pagination
    const paginated = paginateProducts(result, currentPage, PRODUCTS_PER_PAGE);
    setPaginatedData(paginated);
  }, [searchParams, filters, sortBy, priceRange, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = () => {
    const { totalPages } = paginatedData;
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex items-center justify-center gap-2 mt-12">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={20} />
        </button>

        {startPage > 1 && (
          <>
            <button onClick={() => handlePageChange(1)} className="pagination-button">
              1
            </button>
            {startPage > 2 && <span className="text-white/40">...</span>}
          </>
        )}

        {pages.map(page => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`pagination-button ${currentPage === page ? 'active' : ''}`}
          >
            {page}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="text-white/40">...</span>}
            <button onClick={() => handlePageChange(totalPages)} className="pagination-button">
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen mesh-gradient py-8 pt-28">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="luxury-text text-5xl font-bold text-white mb-2">
            {searchParams.get('search') 
              ? `Search: "${searchParams.get('search')}"`
              : searchParams.get('category')
              ? `${searchParams.get('category')}`
              : 'All Products'}
          </h1>
          <p className="text-white/60 text-lg">
            Showing {paginatedData.products.length} of {filteredProducts.length} products
          </p>
        </motion.div>

        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="sophisticated-card p-4 mb-6 flex flex-wrap items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden glass"
                >
                  <SlidersHorizontal size={20} className="mr-2" />
                  Filters
                </Button>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sophisticated-input py-2 text-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'grid'
                      ? 'bg-gradient-to-r from-primary to-secondary text-white'
                      : 'glass text-white/60 hover:text-white'
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'list'
                      ? 'bg-gradient-to-r from-primary to-secondary text-white'
                      : 'glass text-white/60 hover:text-white'
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </motion.div>

            {/* Products Grid/List */}
            {paginatedData.products.length > 0 ? (
              <>
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                      : 'space-y-6'
                  }
                >
                  {paginatedData.products.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {renderPagination()}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  No products found
                </h3>
                <p className="text-white/60 mb-6">
                  Try adjusting your filters or search query
                </p>
                <Button
                  onClick={() => {
                    setFilters({ categories: [], minRating: 0, inStock: false });
                    setPriceRange([0, 1000]);
                    setCurrentPage(1);
                  }}
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
