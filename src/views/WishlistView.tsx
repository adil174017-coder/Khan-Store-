import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/product/ProductCard';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';

export const WishlistView: React.FC = () => {
  const { wishlist, products, addToCart, toggleWishlist, navigateTo } = useStore();

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleMoveAllToCart = () => {
    wishlistProducts.forEach((p) => addToCart(p, 1));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
            <Heart className="w-7 h-7 text-rose-500 fill-rose-500" />
            <span>My Wishlist ({wishlistProducts.length})</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Items saved for later. Prices and stock update in real-time.
          </p>
        </div>

        {wishlistProducts.length > 0 && (
          <button
            onClick={handleMoveAllToCart}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors self-start sm:self-auto"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Move All Items to Cart</span>
          </button>
        )}
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="p-16 text-center rounded-3xl border border-slate-800 bg-slate-900/40 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center text-slate-600 mb-4 border border-slate-800">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">Your wishlist is empty</h3>
          <p className="text-xs text-slate-400 max-w-sm mb-6">
            Tap the heart icon on any smartphone, laptop, or acoustic gadget to save it here for later.
          </p>
          <button
            onClick={() => navigateTo('products')}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
          >
            Browse Tech Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};
