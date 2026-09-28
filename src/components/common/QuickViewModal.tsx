import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { formatINR } from '../../utils/formatters';
import { X, Star, ShoppingBag, Heart, Check, ShieldCheck, Truck } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    closeQuickView,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateTo,
    theme,
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    quickViewProduct?.colors?.[0]
  );
  const [selectedStorage, setSelectedStorage] = useState<string | undefined>(
    quickViewProduct?.storageOptions?.[0]
  );
  const [activeImage, setActiveImage] = useState<string | undefined>(
    quickViewProduct?.image
  );
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!quickViewProduct) return null;

  const inWishlist = isInWishlist(quickViewProduct.id);
  const isDark = theme === 'dark';

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, selectedColor, selectedStorage);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleViewFullDetails = () => {
    closeQuickView();
    navigateTo('product-detail', quickViewProduct.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl p-6 sm:p-8 ${
          isDark
            ? 'bg-[#0f172a] border-slate-700/80 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Product Media Column */}
          <div className="flex flex-col gap-3">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950/60 border border-slate-800 flex items-center justify-center">
              <img
                src={activeImage || quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
              {quickViewProduct.discountPercent > 0 && (
                <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-500 text-slate-950">
                  {quickViewProduct.discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {quickViewProduct.galleryImages && quickViewProduct.galleryImages.length > 1 && (
              <div className="flex items-center gap-2">
                {quickViewProduct.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      (activeImage || quickViewProduct.image) === img
                        ? 'border-cyan-500 scale-105'
                        : 'border-slate-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details Column */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  {quickViewProduct.brand} · {quickViewProduct.category}
                </span>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{quickViewProduct.rating}</span>
                  <span className="text-slate-400">({quickViewProduct.reviewCount} reviews)</span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-3">
                {quickViewProduct.name}
              </h2>

              {/* Price Block */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl sm:text-3xl font-extrabold tabular-nums text-white">
                  {formatINR(quickViewProduct.price)}
                </span>
                {quickViewProduct.oldPrice > quickViewProduct.price && (
                  <span className="text-sm sm:text-base text-slate-400 line-through tabular-nums">
                    {formatINR(quickViewProduct.oldPrice)}
                  </span>
                )}
                <span className="text-xs text-emerald-400 font-medium">Inclusive of all taxes</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                {quickViewProduct.description}
              </p>

              {/* Color Options */}
              {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
                <div className="mb-4">
                  <span className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Finish / Color: <span className="text-cyan-400">{selectedColor}</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                          selectedColor === color
                            ? 'border-cyan-500 bg-cyan-950/60 text-cyan-300'
                            : 'border-slate-700 bg-slate-800/40 text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Storage Options */}
              {quickViewProduct.storageOptions && quickViewProduct.storageOptions.length > 0 && (
                <div className="mb-5">
                  <span className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Capacity: <span className="text-cyan-400">{selectedStorage}</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.storageOptions.map((storage) => (
                      <button
                        key={storage}
                        onClick={() => setSelectedStorage(storage)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                          selectedStorage === storage
                            ? 'border-cyan-500 bg-cyan-950/60 text-cyan-300'
                            : 'border-slate-700 bg-slate-800/40 text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        {storage}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-semibold text-slate-300">Quantity:</span>
                <div className="flex items-center border border-slate-700 rounded-xl overflow-hidden bg-slate-800/40">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 text-sm hover:bg-slate-700 text-slate-300"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-bold tabular-nums text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(quickViewProduct.stock, q + 1))}
                    className="px-3 py-1.5 text-sm hover:bg-slate-700 text-slate-300"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-slate-400">
                  {quickViewProduct.stock > 0
                    ? `${quickViewProduct.stock} units in warehouse`
                    : 'Out of stock'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={quickViewProduct.stock === 0}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/20 active:scale-98"
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`p-3 rounded-xl border transition-colors ${
                    inWishlist
                      ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                      : 'border-slate-700 bg-slate-800/60 text-slate-300 hover:text-white'
                  }`}
                  title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleViewFullDetails}
                className="w-full text-center text-xs font-medium text-cyan-400 hover:text-cyan-300 py-1 transition-colors"
              >
                View full specifications and customer reviews →
              </button>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-2 border-t border-slate-800/60">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Free Pan-India Delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>1-Year Official Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
