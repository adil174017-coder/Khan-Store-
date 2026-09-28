import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/product/ProductCard';
import { HERO_BANNER_IMAGE } from '../data/initialData';
import {
  Zap,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Gamepad2,
  Cable,
  CheckCircle2,
  Clock,
  Star,
} from 'lucide-react';
import { CategoryId } from '../types';

export const HomeView: React.FC = () => {
  const { products, navigateTo, setSelectedCategory, theme } = useStore();

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<CategoryId>('all');
  const [timeLeft, setTimeLeft] = useState({ hours: 6, minutes: 42, seconds: 18 });

  // Countdown timer simulation for Flash Deals
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashDeals = products.filter((p) => p.isFlashDeal);
  const filteredProducts =
    activeCategoryFilter === 'all'
      ? products.slice(0, 8)
      : products.filter((p) => p.category === activeCategoryFilter);

  const isDark = theme === 'dark';

  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-6 sm:pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden border border-slate-800/80 bg-gradient-to-br from-slate-900 via-[#0c1322] to-[#0a0f1d] p-6 sm:p-12 lg:p-16">
            {/* Ambient background glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Column: Headlines & CTAs */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-800/40 text-cyan-300 text-xs font-semibold mb-6">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Next-Generation Flagship Tech Showcase</span>
                </div>

                <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-5 text-balance">
                  Technology That <br />
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    Moves You Forward
                  </span>
                </h1>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mb-8">
                  Experience authentic titanium smartphones, pro silicon laptops, lossless acoustics, and endurance wearables. Designed for innovators and tech enthusiasts with authorized pan-India delivery.
                </p>

                <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      navigateTo('products');
                    }}
                    className="flex-1 sm:flex-initial px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-xl shadow-cyan-500/25 active:scale-98 flex items-center justify-center gap-2"
                  >
                    <span>Shop Collection</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="#flash-deals"
                    className="flex-1 sm:flex-initial px-6 py-3.5 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-slate-200 font-semibold text-sm transition-all flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>View Deals</span>
                  </a>
                </div>

                {/* Key value proofs */}
                <div className="grid grid-cols-3 gap-4 pt-8 mt-8 border-t border-slate-800/80 w-full text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-medium text-slate-300">100% Genuine</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="font-medium text-slate-300">Express Delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="font-medium text-slate-300">7-Day Returns</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Visual Asset */}
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[16/10] lg:aspect-[4/3] rounded-2xl overflow-hidden border border-slate-700/60 shadow-2xl shadow-cyan-950/40 bg-slate-900 group">
                  <img
                    src={HERO_BANNER_IMAGE}
                    alt="KHAN Store Flagship Electronics Showcase"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Price Callout Card */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">
                        Flagship Ecosystem
                      </span>
                      <span className="font-semibold text-white">Apple · Sony · Samsung Pro</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-cyan-500 text-slate-950 font-bold text-[11px]">
                      From ₹26,990
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Category Browser Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Explore Popular Categories
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Browse top tier hardware with guaranteed manufacturer seal
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('all');
              navigateTo('products');
            }}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {[
            { id: 'smartphones', name: 'Smartphones', count: '24 Items', icon: Smartphone },
            { id: 'laptops', name: 'Pro Laptops', count: '18 Items', icon: Laptop },
            { id: 'audio', name: 'Acoustics', count: '32 Items', icon: Headphones },
            { id: 'smartwatches', name: 'Smartwatches', count: '15 Items', icon: Watch },
            { id: 'gaming', name: 'Gaming Consoles', count: '19 Items', icon: Gamepad2 },
            { id: 'accessories', name: 'Accessories', count: '42 Items', icon: Cable },
          ].map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id as CategoryId);
                  navigateTo('products');
                }}
                className={`group p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col items-center text-center ${
                  isDark
                    ? 'bg-slate-900/50 border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-850 hover:shadow-lg hover:shadow-cyan-950/20'
                    : 'bg-white border-slate-200 hover:border-cyan-500 hover:shadow-md'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all mb-3">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[10px] text-slate-400 mt-0.5">{cat.count}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Flash Deals Section with Countdown Timer */}
      <section id="flash-deals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full scroll-mt-24">
        <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-950 p-6 sm:p-8">
          {/* Header with Countdown */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Zap className="w-6 h-6 fill-amber-400" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  <span>Flash Deals of the Day</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/30">
                    Limited Stock
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Exclusive price drops on flagship hardware with instant delivery reservation
                </p>
              </div>
            </div>

            {/* Live Countdown Box */}
            <div className="flex items-center gap-2 text-center bg-slate-950/80 px-4 py-2 rounded-2xl border border-slate-800 shadow-inner">
              <Clock className="w-4 h-4 text-amber-400 mr-1" />
              <div className="flex items-center gap-1 font-mono font-bold text-sm text-white">
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-700 tabular-nums">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-amber-400">:</span>
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-700 tabular-nums">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-amber-400">:</span>
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-700 tabular-nums text-amber-400">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 ml-1 uppercase font-semibold">Remaining</span>
            </div>
          </div>

          {/* Flash Deals Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flashDeals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Popular & Featured Electronics Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Featured Electronics
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Hand-picked bestsellers tested by our hardware specialists
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
            <button
              onClick={() => setActiveCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategoryFilter === 'all'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Products
            </button>
            <button
              onClick={() => setActiveCategoryFilter('smartphones')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategoryFilter === 'smartphones'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Smartphones
            </button>
            <button
              onClick={() => setActiveCategoryFilter('laptops')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategoryFilter === 'laptops'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Laptops
            </button>
            <button
              onClick={() => setActiveCategoryFilter('audio')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategoryFilter === 'audio'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Audio
            </button>
            <button
              onClick={() => setActiveCategoryFilter('smartwatches')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategoryFilter === 'smartwatches'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Wearables
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-10 text-center">
          <button
            onClick={() => {
              setSelectedCategory('all');
              navigateTo('products');
            }}
            className="px-6 py-3 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-cyan-400 font-bold text-xs tracking-wide transition-all inline-flex items-center gap-2"
          >
            <span>Explore All 150+ Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 5. Customer Reviews & Social Proof Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 sm:p-10">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 text-xs font-semibold mb-3">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>4.9 / 5.0 Average Customer Rating</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
              Trusted by Over 50,000+ Indian Shoppers
            </h2>
            <p className="text-xs text-slate-400">
              Read real verified purchase feedback from customers across Mumbai, Delhi, Bengaluru and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Aakash Verma',
                city: 'Mumbai',
                product: 'iPhone 15 Pro Max',
                date: 'September 2026',
                text: 'The transition to titanium is incredible. Received it in Mumbai under 24 hours with unbroken Apple seal and valid invoice. Top tier service from KHAN Store!',
              },
              {
                name: 'Priya Sharma',
                city: 'Delhi NCR',
                product: 'Sony WH-1000XM5',
                date: 'September 2026',
                text: 'Ordered for daily metro commutes. The noise cancellation is pure magic. Packaging was reinforced with security bubble wrap. Will definitely buy again.',
              },
              {
                name: 'Devendra K.',
                city: 'Bengaluru',
                product: 'MacBook Pro 16" M3 Max',
                date: 'August 2026',
                text: 'High-ticket tech purchase made stress-free. Instant order tracking and clear BlueDart dispatch updates. Highly recommended for creative pros.',
              },
            ].map((review, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed italic mb-4">
                    "{review.text}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                  <div>
                    <span className="font-bold text-white block">{review.name}</span>
                    <span className="text-slate-500">{review.city} · Verified Purchase</span>
                  </div>
                  <span className="text-cyan-400 font-semibold">{review.product}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
