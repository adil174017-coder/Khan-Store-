import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../utils/formatters';
import { ProductCard } from '../components/product/ProductCard';
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Zap,
  Check,
  CheckCircle2,
  MapPin,
  ArrowLeft,
  Share2,
} from 'lucide-react';

export const ProductDetailView: React.FC = () => {
  const {
    products,
    selectedProductId,
    addToCart,
    toggleWishlist,
    isInWishlist,
    deliveryLocation,
    navigateTo,
    showToast,
    theme,
  } = useStore();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [activeImage, setActiveImage] = useState(product?.image);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [selectedStorage, setSelectedStorage] = useState(product?.storageOptions?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews' | 'warranty'>('overview');
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  // New review form state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);
  const isDark = theme === 'dark';

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedStorage);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedStorage);
    navigateTo('checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewComment) {
      showToast('Please fill out your name and review', 'error');
      return;
    }
    const newRev = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor,
      rating: newReviewRating,
      date: new Date().toISOString().slice(0, 10),
      title: newReviewTitle || 'Verified Customer Review',
      comment: newReviewComment,
      verified: true,
    };
    if (!product.reviews) product.reviews = [];
    product.reviews.unshift(newRev);
    setNewReviewAuthor('');
    setNewReviewTitle('');
    setNewReviewComment('');
    showToast('Thank you! Your verified review has been published.', 'success');
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Back button & Breadcrumbs */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          onClick={() => navigateTo('products')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900 text-xs font-medium text-slate-300 hover:text-white transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share</span>
        </button>
      </div>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
        {/* Left Column: Image Gallery (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-950/70 border border-slate-800 flex items-center justify-center p-4">
            <img
              src={activeImage || product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {product.discountPercent > 0 && (
              <span className="absolute top-4 left-4 px-3 py-1.5 text-xs font-bold rounded-xl bg-amber-500 text-slate-950 shadow-lg">
                {product.discountPercent}% OFF
              </span>
            )}
            {product.badge && (
              <span className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-xl bg-slate-900/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnail Selector */}
          {product.galleryImages && product.galleryImages.length > 1 && (
            <div className="flex items-center gap-3">
              {product.galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    (activeImage || product.image) === img
                      ? 'border-cyan-500 scale-105 shadow-md shadow-cyan-500/20'
                      : 'border-slate-800 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Key Value Props Bar */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-900/40 border border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">Free Shipping</span>
                <span className="text-[11px] text-slate-400">On all prepaid orders</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">Official Warranty</span>
                <span className="text-[11px] text-slate-400">1-Year brand coverage</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">7-Day Returns</span>
                <span className="text-[11px] text-slate-400">Direct replacement</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module (5 cols) */}
        <div className="lg:col-span-5 flex flex-col p-6 rounded-3xl bg-slate-900/60 border border-slate-800 sticky top-24">
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs font-semibold mb-2">
              <span className="uppercase tracking-wider text-cyan-400">
                {product.brand} · {product.category}
              </span>
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="font-bold text-slate-100">{product.rating}</span>
                <span className="text-slate-400">({product.reviewCount} ratings)</span>
              </div>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-white mb-3">
              {product.name}
            </h1>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 mb-5">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-3xl font-extrabold text-white tabular-nums">
                  {formatINR(product.price)}
                </span>
                {product.oldPrice > product.price && (
                  <span className="text-base text-slate-400 line-through tabular-nums">
                    {formatINR(product.oldPrice)}
                  </span>
                )}
                {product.discountPercent > 0 && (
                  <span className="text-xs font-bold text-emerald-400">
                    Save {formatINR(product.oldPrice - product.price)} ({product.discountPercent}%)
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                MRP inclusive of all Indian taxes and GST input credit available.
              </p>
            </div>
          </div>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-4">
              <label className="text-xs font-semibold text-slate-300 block mb-2">
                Color Finish: <span className="text-cyan-400 font-bold">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                      selectedColor === c
                        ? 'border-cyan-500 bg-cyan-950/60 text-cyan-300'
                        : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Storage / Configuration Selector */}
          {product.storageOptions && product.storageOptions.length > 0 && (
            <div className="mb-5">
              <label className="text-xs font-semibold text-slate-300 block mb-2">
                Internal Storage: <span className="text-cyan-400 font-bold">{selectedStorage}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.storageOptions.map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedStorage(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                      selectedStorage === st
                        ? 'border-cyan-500 bg-cyan-950/60 text-cyan-300'
                        : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Stock */}
          <div className="flex items-center justify-between gap-4 mb-6 pt-2 border-t border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-300">Quantity:</span>
              <div className="flex items-center border border-slate-700 rounded-xl overflow-hidden bg-slate-800">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-700"
                >
                  -
                </button>
                <span className="px-3 py-1.5 text-xs font-bold tabular-nums text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-700"
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-right">
              {product.stock > 0 ? (
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>In Stock ({product.stock} units)</span>
                </span>
              ) : (
                <span className="text-xs font-semibold text-rose-400">Currently Sold Out</span>
              )}
            </div>
          </div>

          {/* CTAs: Add to Cart & Buy Now */}
          <div className="flex flex-col gap-3 mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/25 active:scale-98 transition-all"
              >
                {isAddedRecently ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 rounded-xl border transition-colors ${
                  inWishlist
                    ? 'border-rose-500 bg-rose-500/20 text-rose-400'
                    : 'border-slate-700 bg-slate-800 text-slate-300 hover:text-white'
                }`}
                title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-98 transition-all"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Instant Buy Now</span>
            </button>
          </div>

          {/* Delivery Pin Check */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <span className="text-[11px] text-slate-400 block">Deliver to {deliveryLocation.city} ({deliveryLocation.pincode})</span>
                <span className="font-semibold text-emerald-400">Order today, arrives within 48 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Specifications, Reviews, Warranty */}
      <div className="border-t border-slate-800 pt-10 mb-16">
        <div className="flex items-center gap-4 border-b border-slate-800 mb-8 overflow-x-auto">
          {[
            { id: 'overview', label: 'Product Highlights' },
            { id: 'specs', label: 'Technical Specifications' },
            { id: 'reviews', label: `Customer Reviews (${product.reviews?.length || 0})` },
            { id: 'warranty', label: 'Warranty & Returns' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="max-w-3xl">
            <h3 className="text-lg font-bold text-white mb-3">Product Overview</h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">{product.description}</p>

            <h4 className="text-sm font-bold text-white mb-3">Key Features & Engineering</h4>
            <ul className="space-y-2.5">
              {product.features?.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="max-w-3xl">
            <h3 className="text-lg font-bold text-white mb-4">Detailed Specifications</h3>
            <div className="rounded-2xl border border-slate-800 overflow-hidden divide-y divide-slate-800">
              {Object.entries(product.specs || {}).map(([key, val]) => (
                <div key={key} className="grid grid-cols-3 p-3.5 text-xs">
                  <span className="font-semibold text-slate-400">{key}</span>
                  <span className="col-span-2 text-white font-medium">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Reviews List (7 cols) */}
            <div className="md:col-span-7 flex flex-col gap-4">
              <h3 className="text-lg font-bold text-white mb-2">Verified Customer Feedback</h3>
              {(!product.reviews || product.reviews.length === 0) ? (
                <p className="text-xs text-slate-400">Be the first to review this product!</p>
              ) : (
                product.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white">{rev.author}</span>
                      <span className="text-[10px] text-slate-400">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400 mb-2">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <h5 className="text-xs font-semibold text-slate-200 mb-1">{rev.title}</h5>
                    <p className="text-xs text-slate-300 leading-relaxed">{rev.comment}</p>
                  </div>
                ))
              )}
            </div>

            {/* Write a review form (5 cols) */}
            <div className="md:col-span-5 p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h4 className="text-sm font-bold text-white mb-3">Write a Customer Review</h4>
              <form onSubmit={handleAddReview} className="flex flex-col gap-3 text-xs">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    placeholder="e.g. Rohini Sharma"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Star Rating</label>
                  <select
                    value={newReviewRating}
                    onChange={(e) => setNewReviewRating(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 / 5) - Outstanding</option>
                    <option value={4}>⭐⭐⭐⭐ (4 / 5) - Very Good</option>
                    <option value={3}>⭐⭐⭐ (3 / 5) - Average</option>
                    <option value={2}>⭐⭐ (2 / 5) - Below Expectation</option>
                    <option value={1}>⭐ (1 / 5) - Poor</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Review Headline</label>
                  <input
                    type="text"
                    value={newReviewTitle}
                    onChange={(e) => setNewReviewTitle(e.target.value)}
                    placeholder="e.g. Phenomenal build quality!"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Detailed Review</label>
                  <textarea
                    rows={3}
                    required
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    placeholder="Share your personal experience with hardware performance, display, battery..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <button
                  type="submit"
                  className="py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors"
                >
                  Publish Verified Review
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'warranty' && (
          <div className="max-w-2xl space-y-4 text-xs text-slate-300 leading-relaxed">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h4 className="font-bold text-white text-sm mb-1">Brand Manufacturer Warranty</h4>
              <p>
                This product comes with a 1-Year Pan-India Authorized Manufacturer Warranty. All service requests can be serviced directly at authorized service centres across India or through KHAN Store Concierge support.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h4 className="font-bold text-white text-sm mb-1">7-Day Replacement Policy</h4>
              <p>
                In the rare event of transit damage, dead-on-arrival (DOA) units, or manufacturing defects, KHAN Store guarantees a complimentary doorstep replacement within 7 days of delivery.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-slate-800 pt-12">
          <h2 className="text-xl font-bold tracking-tight text-white mb-6">
            Frequently Bought Together
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
