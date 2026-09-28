import React, { useState } from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { formatINR } from '../../utils/formatters';
import { Star, Heart, Eye, ShoppingBag, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    openQuickView,
    navigateTo,
    theme,
  } = useStore();

  const [isAddedRecently, setIsAddedRecently] = useState(false);
  const [imgError, setImgError] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1500);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    openQuickView(product);
  };

  const isDark = theme === 'dark';

  return (
    <div
      onClick={() => navigateTo('product-detail', product.id)}
      className={`group relative flex flex-col rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
        isDark
          ? 'bg-[#111726] border-slate-800/80 hover:border-slate-600/80 hover:shadow-2xl hover:shadow-cyan-950/20'
          : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-xl'
      }`}
    >
      {/* Product Image Area */}
      <div
        className={`relative w-full aspect-[4/3] flex items-center justify-center overflow-hidden ${
          isDark ? 'bg-[#0b101c]' : 'bg-slate-100'
        }`}
      >
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-800 to-slate-900 text-slate-300">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
              {product.brand}
            </span>
            <span className="text-sm text-center font-medium line-clamp-2">
              {product.name}
            </span>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {product.discountPercent > 0 && (
            <span className="px-2.5 py-1 text-[11px] font-bold tracking-tight rounded-md bg-amber-500 text-slate-950 shadow-md">
              {product.discountPercent}% OFF
            </span>
          )}
          {product.badge && (
            <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase rounded-md bg-slate-900/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
              {product.badge}
            </span>
          )}
        </div>

        {/* Action Buttons Overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          <button
            onClick={handleToggleWishlist}
            title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            className={`p-2 rounded-full backdrop-blur-md transition-all duration-200 shadow-md ${
              inWishlist
                ? 'bg-rose-500 text-white'
                : isDark
                ? 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800'
                : 'bg-white/90 text-slate-600 hover:text-rose-500 hover:bg-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={handleQuickView}
            title="Quick View"
            className={`p-2 rounded-full backdrop-blur-md transition-all duration-200 opacity-90 sm:opacity-0 group-hover:opacity-100 shadow-md ${
              isDark
                ? 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800'
                : 'bg-white/90 text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Stock warning if low */}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute bottom-2 left-3 z-10">
            <span className="text-[10px] font-semibold text-rose-400 bg-slate-950/80 px-2 py-0.5 rounded backdrop-blur-sm border border-rose-500/20">
              Only {product.stock} left in stock
            </span>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-medium">
            <span className="uppercase tracking-wider text-[11px] text-cyan-400/90 font-semibold">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-semibold text-xs tabular-nums text-slate-200">
                {product.rating}
              </span>
              <span className="text-[11px] text-slate-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            className={`text-sm font-semibold line-clamp-2 leading-snug mb-2 group-hover:text-cyan-400 transition-colors ${
              isDark ? 'text-slate-100' : 'text-slate-900'
            }`}
          >
            {product.name}
          </h3>
        </div>

        {/* Price & Add to Cart button */}
        <div className="pt-2 border-t border-slate-800/40 flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold tabular-nums tracking-tight text-white">
                {formatINR(product.price)}
              </span>
            </div>
            {product.oldPrice > product.price && (
              <span className="text-xs text-slate-400 line-through tabular-nums">
                {formatINR(product.oldPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold tracking-tight transition-all duration-200 shadow-sm ${
              isAddedRecently
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : product.stock === 0
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : isDark
                ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 active:scale-95'
                : 'bg-slate-900 hover:bg-slate-800 text-white active:scale-95'
            }`}
          >
            {isAddedRecently ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : product.stock === 0 ? (
              <span>Out of Stock</span>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
