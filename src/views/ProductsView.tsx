import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/product/ProductCard';
import { CategoryId } from '../types';
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { formatINR } from '../utils/formatters';

export const ProductsView: React.FC = () => {
  const {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    theme,
  } = useStore();

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(400000);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<
    'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount'
  >('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Available brands derived from current products
  const allBrands = useMemo(() => {
    const brandsSet = new Set<string>();
    products.forEach((p) => brandsSet.add(p.brand));
    return Array.from(brandsSet);
  }, [products]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
          return false;
        }
        // Search filter
        if (
          searchQuery.trim() &&
          !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.brand.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.category.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }
        // Brand filter
        if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
          return false;
        }
        // Price filter
        if (product.price > priceRange) {
          return false;
        }
        // Rating filter
        if (minRating > 0 && product.rating < minRating) {
          return false;
        }
        // In-stock filter
        if (inStockOnly && product.stock <= 0) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [
    products,
    selectedCategory,
    searchQuery,
    selectedBrands,
    priceRange,
    minRating,
    inStockOnly,
    sortBy,
  ]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrands([]);
    setPriceRange(400000);
    setMinRating(0);
    setInStockOnly(false);
    setSearchQuery('');
    setSortBy('featured');
  };

  const isDark = theme === 'dark';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Breadcrumb / Title Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Home</span>
            <span>/</span>
            <span className="text-white capitalize">
              {selectedCategory === 'all' ? 'All Products' : selectedCategory}
            </span>
            {searchQuery && (
              <>
                <span>/</span>
                <span className="text-cyan-400">Search: "{searchQuery}"</span>
              </>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white capitalize">
            {selectedCategory === 'all'
              ? 'Flagship Electronics & Gadgets'
              : `${selectedCategory} Collection`}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Showing {filteredProducts.length} authentic products with warranty
          </p>
        </div>

        {/* Sort & Mobile Filter Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="md:hidden flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-800 bg-slate-900 text-xs font-semibold text-slate-200"
          >
            <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-200 text-xs font-semibold focus:outline-none focus:border-cyan-500"
            >
              <option value="featured">Featured & Best Matches</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
              <option value="discount">Biggest Discount %</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        {/* Sidebar Filters (Desktop) */}
        <div className="hidden md:flex flex-col gap-6 p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="font-bold uppercase tracking-wider text-slate-200">
              Filter Catalog
            </span>
            <button
              onClick={handleResetFilters}
              className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 text-[11px]"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-white mb-2.5">Category</h4>
            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-2.5 py-1.5 rounded-lg text-left transition-colors flex items-center justify-between ${
                  selectedCategory === 'all'
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span>All Categories</span>
                <span>{products.length}</span>
              </button>
              {categories.map((c) => {
                const count = products.filter((p) => p.category === c.id).length;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`px-2.5 py-1.5 rounded-lg text-left transition-colors flex items-center justify-between ${
                      selectedCategory === c.id
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <span>{c.name}</span>
                    <span>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between font-semibold text-white mb-2">
              <span>Max Price</span>
              <span className="text-cyan-400 tabular-nums">{formatINR(priceRange)}</span>
            </div>
            <input
              type="range"
              min={10000}
              max={350000}
              step={5000}
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-cyan-400 bg-slate-800 rounded-lg cursor-pointer h-2"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>₹10,000</span>
              <span>₹3,50,000+</span>
            </div>
          </div>

          {/* Brands Filter */}
          <div className="pt-4 border-t border-slate-800">
            <h4 className="font-semibold text-white mb-2.5">Brand</h4>
            <div className="flex flex-col gap-2">
              {allBrands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white"
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0 focus:ring-offset-0"
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Customer Rating Filter */}
          <div className="pt-4 border-t border-slate-800">
            <h4 className="font-semibold text-white mb-2">Customer Rating</h4>
            <div className="flex flex-col gap-1.5">
              {[4.8, 4.5, 4.0].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                  className={`px-2.5 py-1.5 rounded-lg text-left transition-colors flex items-center justify-between ${
                    minRating === rating
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span>{rating}★ & above</span>
                </button>
              ))}
            </div>
          </div>

          {/* In-Stock Toggle */}
          <div className="pt-4 border-t border-slate-800">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="font-semibold text-white">In Stock Only</span>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700 focus:ring-0"
              />
            </label>
          </div>
        </div>

        {/* Product Cards Grid (3 Columns on Desktop) */}
        <div className="md:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center rounded-3xl border border-slate-800 bg-slate-900/40 flex flex-col items-center justify-center">
              <Sparkles className="w-12 h-12 text-slate-600 mb-3" />
              <h3 className="text-lg font-bold text-white mb-1">No products match your filters</h3>
              <p className="text-xs text-slate-400 max-w-sm mb-5">
                Try widening your price range or clearing active brand and category filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
