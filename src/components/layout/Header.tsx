import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { CategoryId, NavigationPage } from '../../types';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  MapPin,
  ChevronDown,
  Sun,
  Moon,
  Menu,
  X,
  Zap,
  ShieldCheck,
  Package,
  Layers,
} from 'lucide-react';
import { formatINR } from '../../utils/formatters';

export const Header: React.FC = () => {
  const {
    products,
    categories,
    cart,
    wishlist,
    currentUser,
    settings,
    theme,
    deliveryLocation,
    activePage,
    searchQuery,
    selectedCategory,
    navigateTo,
    setSearchQuery,
    setSelectedCategory,
    toggleTheme,
    openAuthModal,
    logoutUser,
    setCartDrawerOpen,
    setLocationModalOpen,
  } = useStore();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(true);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const searchRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  // Close search suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setIsAccountMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  // Live search recommendations
  const searchResults = localSearch.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(localSearch.toLowerCase()) ||
            p.brand.toLowerCase().includes(localSearch.toLowerCase()) ||
            p.category.toLowerCase().includes(localSearch.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch.trim());
      setIsSearchOpen(false);
      navigateTo('products');
    }
  };

  const handleSelectProduct = (productId: string) => {
    setIsSearchOpen(false);
    navigateTo('product-detail', productId);
  };

  const isDark = theme === 'dark';

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md transition-colors duration-200">
      {/* 1. Promotional Announcement Bar */}
      {isAnnouncementVisible && (
        <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 text-cyan-200 text-xs py-1.5 px-4 border-b border-cyan-800/30">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
              <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
              <span className="font-medium text-slate-200">
                {settings.announcementText}
              </span>
            </div>
            <div className="flex items-center gap-4 shrink-0 pl-2">
              <button
                onClick={() => navigateTo('track-order')}
                className="hidden md:flex items-center gap-1 hover:text-white transition-colors text-[11px]"
              >
                <Package className="w-3 h-3 text-cyan-400" />
                <span>Track Order</span>
              </button>
              <button
                onClick={() => setIsAnnouncementVisible(false)}
                className="text-slate-400 hover:text-white transition-colors p-0.5"
                title="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Main Navigation Bar */}
      <div
        className={`border-b ${
          isDark
            ? 'bg-[#0c1220]/95 border-slate-800/80 text-slate-100'
            : 'bg-white/95 border-slate-200 text-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-3 md:gap-6">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo */}
          <div
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2.5 cursor-pointer select-none shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white font-extrabold text-xl tracking-tight">
              K
            </div>
            <div className="flex flex-col leading-none">
              <div className="flex items-center gap-1">
                <span className="font-display font-extrabold text-xl tracking-tight text-white drop-shadow-sm">
                  KHAN
                </span>
                <span className="font-display font-semibold text-xl tracking-tight text-cyan-400">
                  STORE
                </span>
              </div>
              <span className="text-[10px] tracking-widest text-slate-400 font-medium uppercase mt-0.5">
                Flagship Tech
              </span>
            </div>
          </div>

          {/* Delivery Location Selector */}
          <div
            onClick={() => setLocationModalOpen(true)}
            className={`hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs cursor-pointer transition-all duration-200 ${
              isDark
                ? 'border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-300'
                : 'border-slate-200 bg-slate-50 hover:border-slate-300 text-slate-700'
            }`}
          >
            <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-slate-400 leading-tight">Deliver to</span>
              <span className="font-semibold text-slate-200 leading-tight truncate max-w-[110px]">
                {deliveryLocation.city} {deliveryLocation.pincode}
              </span>
            </div>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>

          {/* Search Bar with Autocomplete */}
          <div ref={searchRef} className="relative flex-1 max-w-xl hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                value={localSearch}
                onChange={(e) => {
                  setLocalSearch(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                placeholder="Search iPhone 15 Pro, M3 MacBook, Sony XM5..."
                className={`w-full pl-10 pr-24 py-2.5 rounded-xl text-sm border focus:outline-none transition-all ${
                  isDark
                    ? 'bg-slate-900/90 border-slate-700/80 text-white placeholder-slate-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30'
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600/30'
                }`}
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <button
                type="submit"
                className="absolute right-1.5 px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors"
              >
                Search
              </button>
            </form>

            {/* Live Search Recommendations Dropdown */}
            {isSearchOpen && searchResults.length > 0 && (
              <div
                className={`absolute top-full left-0 right-0 mt-2 rounded-2xl border shadow-2xl p-2 z-50 overflow-hidden backdrop-blur-xl ${
                  isDark
                    ? 'bg-slate-900/95 border-slate-700 text-slate-200'
                    : 'bg-white/95 border-slate-200 text-slate-800'
                }`}
              >
                <div className="text-[11px] font-semibold text-slate-400 px-3 py-1.5 uppercase tracking-wider">
                  Suggested Products
                </div>
                {searchResults.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectProduct(item.id)}
                    className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-colors ${
                      isDark ? 'hover:bg-slate-800/80' : 'hover:bg-slate-100'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover bg-slate-800 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold truncate text-white">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-cyan-400 font-medium">
                        {formatINR(item.price)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Zone: Theme, Wishlist, Cart, Account, Admin */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl border transition-colors ${
                isDark
                  ? 'border-slate-800 text-slate-300 hover:text-amber-400 hover:border-slate-700'
                  : 'border-slate-200 text-slate-700 hover:text-amber-600 hover:border-slate-300'
              }`}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => navigateTo('wishlist')}
              className={`relative p-2 rounded-xl border transition-colors ${
                activePage === 'wishlist'
                  ? 'border-cyan-500 text-cyan-400 bg-cyan-950/30'
                  : isDark
                  ? 'border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                  : 'border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300'
              }`}
              title="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 bg-rose-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center shadow-md">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setCartDrawerOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-all shadow-md shadow-cyan-500/20 active:scale-95"
              title="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-slate-950 text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-bold tabular-nums">
                {cartSubtotal > 0 ? formatINR(cartSubtotal) : 'Cart'}
              </span>
            </button>

            {/* Account / User Menu */}
            <div ref={accountRef} className="relative">
              <button
                onClick={() => {
                  if (!currentUser) {
                    openAuthModal('login');
                  } else {
                    setIsAccountMenuOpen(!isAccountMenuOpen);
                  }
                }}
                className={`flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-xl border transition-colors ${
                  isDark
                    ? 'border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-200'
                    : 'border-slate-200 bg-slate-50 hover:border-slate-300 text-slate-800'
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400 font-semibold text-xs border border-cyan-500/30">
                  {currentUser ? currentUser.name.charAt(0).toUpperCase() : <User className="w-3.5 h-3.5" />}
                </div>
                <div className="hidden lg:flex flex-col text-left leading-none">
                  <span className="text-[10px] text-slate-400">
                    {currentUser ? 'Hello,' : 'Sign In'}
                  </span>
                  <span className="text-xs font-semibold text-white truncate max-w-[90px]">
                    {currentUser ? currentUser.name.split(' ')[0] : 'Account'}
                  </span>
                </div>
                <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:block" />
              </button>

              {/* Account Dropdown */}
              {isAccountMenuOpen && currentUser && (
                <div
                  className={`absolute right-0 mt-2 w-56 rounded-2xl border shadow-2xl p-2 z-50 backdrop-blur-xl ${
                    isDark
                      ? 'bg-slate-900/95 border-slate-700 text-slate-200'
                      : 'bg-white/95 border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="p-2 border-b border-slate-800/80 mb-1">
                    <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                    <span className="inline-block mt-1 text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/40">
                      {currentUser.role === 'admin' ? 'Store Administrator' : 'Verified Shopper'}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setIsAccountMenuOpen(false);
                      navigateTo('account');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl hover:bg-slate-800 text-left transition-colors"
                  >
                    <User className="w-4 h-4 text-cyan-400" />
                    <span>My Profile & Settings</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsAccountMenuOpen(false);
                      navigateTo('my-orders');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl hover:bg-slate-800 text-left transition-colors"
                  >
                    <Package className="w-4 h-4 text-emerald-400" />
                    <span>My Orders</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsAccountMenuOpen(false);
                      navigateTo('wishlist');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl hover:bg-slate-800 text-left transition-colors"
                  >
                    <Heart className="w-4 h-4 text-rose-400" />
                    <span>My Wishlist ({wishlist.length})</span>
                  </button>

                  {/* Admin Portal Quick Switch */}
                  <div className="pt-1 mt-1 border-t border-slate-800">
                    <button
                      onClick={() => {
                        setIsAccountMenuOpen(false);
                        navigateTo('admin');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl hover:bg-indigo-950/60 text-indigo-300 text-left transition-colors"
                    >
                      <Layers className="w-4 h-4 text-indigo-400" />
                      <span>Admin Control Panel</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsAccountMenuOpen(false);
                        logoutUser();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl hover:bg-rose-950/50 text-rose-300 text-left transition-colors mt-1"
                    >
                      <X className="w-4 h-4 text-rose-400" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search input bar */}
        <div className="md:hidden px-4 pb-3">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search products, brands..."
              className={`w-full pl-9 pr-18 py-2 rounded-xl text-xs border focus:outline-none ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500'
                  : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
              }`}
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3" />
            <button
              type="submit"
              className="absolute right-1 px-2.5 py-1 bg-cyan-500 text-slate-950 font-bold text-[11px] rounded-lg"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* 3. Category Secondary Navigation Bar (Desktop) */}
      <div
        className={`hidden md:block border-b text-xs font-medium ${
          isDark
            ? 'bg-[#090d16] border-slate-800/60 text-slate-300'
            : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none">
            {/* All Products */}
            <button
              onClick={() => {
                setSelectedCategory('all');
                navigateTo('products');
              }}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-semibold ${
                activePage === 'products' && selectedCategory === 'all'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'hover:text-white hover:bg-slate-850'
              }`}
            >
              All Electronics
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  navigateTo('products');
                }}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  activePage === 'products' && selectedCategory === cat.id
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cat.name}
              </button>
            ))}

            {/* Flash Deals Tab */}
            <button
              onClick={() => navigateTo('home')}
              className="px-3 py-1.5 rounded-lg whitespace-nowrap text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              <Zap className="w-3.5 h-3.5 fill-amber-400" />
              <span>Flash Deals</span>
            </button>
          </div>

          {/* Quick links right side */}
          <div className="flex items-center gap-5 shrink-0 pl-4 text-slate-400">
            <button
              onClick={() => navigateTo('help')}
              className="hover:text-white transition-colors"
            >
              Help Center
            </button>
            <button
              onClick={() => navigateTo('sell-with-us')}
              className="hover:text-cyan-400 transition-colors"
            >
              Sell With Us
            </button>
            <button
              onClick={() => navigateTo('admin')}
              className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden fixed inset-x-0 top-[73px] bottom-0 z-50 p-5 overflow-y-auto backdrop-blur-2xl transition-all ${
            isDark ? 'bg-slate-950/98 text-slate-200' : 'bg-white/98 text-slate-800'
          }`}
        >
          <div className="flex flex-col gap-4">
            <div className="text-xs uppercase font-bold tracking-wider text-slate-400">
              Browse Categories
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  navigateTo('products');
                  setIsMobileMenuOpen(false);
                }}
                className="p-3 text-left rounded-xl border border-slate-800 bg-slate-900/60 text-xs font-semibold hover:border-cyan-500"
              >
                All Products
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedCategory(c.id);
                    navigateTo('products');
                    setIsMobileMenuOpen(false);
                  }}
                  className="p-3 text-left rounded-xl border border-slate-800 bg-slate-900/60 text-xs font-semibold hover:border-cyan-500"
                >
                  {c.name}
                </button>
              ))}
            </div>

            <div className="border-t border-slate-800 pt-4 flex flex-col gap-2.5 text-sm font-medium">
              <button
                onClick={() => {
                  navigateTo('my-orders');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-900"
              >
                <Package className="w-4 h-4 text-cyan-400" />
                <span>My Orders</span>
              </button>
              <button
                onClick={() => {
                  navigateTo('track-order');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-900"
              >
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Track Any Order</span>
              </button>
              <button
                onClick={() => {
                  navigateTo('wishlist');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-900"
              >
                <Heart className="w-4 h-4 text-rose-400" />
                <span>Wishlist ({wishlist.length})</span>
              </button>
              <button
                onClick={() => {
                  navigateTo('admin');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-900 text-indigo-400"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Dashboard</span>
              </button>
              <button
                onClick={() => {
                  navigateTo('help');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-900 text-slate-400"
              >
                <span>Help Center & FAQ</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
