import React from 'react';
import { useStore } from '../../context/StoreContext';
import { formatINR } from '../../utils/formatters';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    setCartDrawerOpen,
    updateCartQuantity,
    removeFromCart,
    settings,
    navigateTo,
    theme,
  } = useStore();

  if (!isCartDrawerOpen) return null;

  const isDark = theme === 'dark';
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingMet = subtotal >= settings.freeShippingThreshold;
  const remainingForFreeShipping = Math.max(0, settings.freeShippingThreshold - subtotal);

  const handleCheckout = () => {
    setCartDrawerOpen(false);
    navigateTo('checkout');
  };

  const handleViewCart = () => {
    setCartDrawerOpen(false);
    navigateTo('cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setCartDrawerOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className={`w-screen max-w-md border-l shadow-2xl flex flex-col justify-between ${
            isDark
              ? 'bg-[#0f172a] border-slate-800 text-slate-100'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base font-bold">Shopping Cart ({cart.length})</h2>
            </div>
            <button
              onClick={() => setCartDrawerOpen(false)}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Alert Bar */}
          <div className="px-5 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Truck className="w-3.5 h-3.5 text-cyan-400" />
                {freeShippingMet
                  ? 'You qualified for FREE express delivery!'
                  : `Add ${formatINR(remainingForFreeShipping)} more for FREE shipping`}
              </span>
              <span className="font-semibold text-cyan-400">
                {freeShippingMet ? '100%' : `${Math.min(100, Math.round((subtotal / settings.freeShippingThreshold) * 100))}%`}
              </span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-300"
                style={{
                  width: `${Math.min(100, (subtotal / settings.freeShippingThreshold) * 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-slate-800/60">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center text-slate-500 mb-3 border border-slate-800">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-white mb-1">Your cart is empty</h3>
                <p className="text-xs text-slate-400 mb-5 max-w-xs">
                  Discover our flagship smartphones, laptops and pro audio gear to fill your bag.
                </p>
                <button
                  onClick={() => {
                    setCartDrawerOpen(false);
                    navigateTo('products');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                >
                  Browse Tech Catalog
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.product.id + (item.selectedColor || '')} className="py-4 flex gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-18 rounded-xl object-cover bg-slate-900 border border-slate-800 shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          onClick={() => {
                            setCartDrawerOpen(false);
                            navigateTo('product-detail', item.product.id);
                          }}
                          className="text-xs font-semibold hover:text-cyan-400 cursor-pointer line-clamp-1 text-white"
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-slate-500 hover:text-rose-400 p-0.5 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Variant tags */}
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                        {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                        {item.selectedStorage && <span>· {item.selectedStorage}</span>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden bg-slate-900">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="px-2.5 py-0.5 text-xs text-slate-400 hover:bg-slate-800"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-bold tabular-nums text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="px-2.5 py-0.5 text-xs text-slate-400 hover:bg-slate-800"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-bold tabular-nums text-white">
                        {formatINR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-800/80 bg-slate-950/60">
              <div className="space-y-2 mb-4 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white tabular-nums">
                    {formatINR(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-emerald-400">
                    {freeShippingMet ? 'FREE' : formatINR(settings.standardShippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                  <span>Total (Inc. GST)</span>
                  <span className="text-cyan-400 tabular-nums">
                    {formatINR(subtotal + (freeShippingMet ? 0 : settings.standardShippingFee))}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-98 transition-all"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleViewCart}
                  className="w-full py-2.5 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-300 font-semibold text-xs transition-colors"
                >
                  View Full Cart & Coupons
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 mt-3 text-[10px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Bank-grade 256-bit encrypted checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
