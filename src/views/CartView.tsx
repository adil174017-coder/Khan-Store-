import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../utils/formatters';
import { AVAILABLE_COUPONS } from '../data/initialData';
import {
  Trash2,
  ArrowRight,
  ShoppingBag,
  Tag,
  Check,
  Truck,
  ShieldCheck,
  ArrowLeft,
} from 'lucide-react';

export const CartView: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    settings,
    navigateTo,
    showToast,
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('KHAN10');

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Calculate discount
  let discountAmount = 0;
  if (appliedCoupon === 'KHAN10' && subtotal >= 5000) {
    discountAmount = Math.min(10000, Math.round(subtotal * 0.1));
  } else if (appliedCoupon === 'WELCOME500' && subtotal >= 2000) {
    discountAmount = 500;
  } else if (appliedCoupon === 'FESTIVE2500' && subtotal >= 50000) {
    discountAmount = 2500;
  }

  const freeShipping = subtotal >= settings.freeShippingThreshold;
  const shippingFee = freeShipping ? 0 : settings.standardShippingFee;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    const matched = AVAILABLE_COUPONS.find((c) => c.code === code);
    if (!matched) {
      showToast('Invalid coupon code. Try KHAN10 or WELCOME500', 'error');
      return;
    }
    if (subtotal < matched.minSpend) {
      showToast(
        `Minimum order amount for ${code} is ${formatINR(matched.minSpend)}`,
        'error'
      );
      return;
    }
    setAppliedCoupon(code);
    setCouponCode('');
    showToast(`Coupon "${code}" applied successfully!`, 'success');
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mb-4 shadow-xl">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Your Shopping Cart is Empty</h1>
        <p className="text-sm text-slate-400 max-w-sm mb-6">
          Looks like you haven't added anything to your cart yet. Browse our flagship smartphones, laptops and accessories!
        </p>
        <button
          onClick={() => navigateTo('products')}
          className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2"
        >
          <span>Explore Products</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Shopping Cart ({cart.length} items)
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Review your items and proceed to secure checkout
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-rose-400 hover:text-rose-300 font-medium"
        >
          Clear entire cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Cart Items List (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Free Shipping Alert banner */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-2 text-slate-300 font-semibold">
                <Truck className="w-4 h-4 text-cyan-400" />
                {freeShipping
                  ? 'Congratulations! You unlocked FREE Express Delivery'
                  : `Add ${formatINR(settings.freeShippingThreshold - subtotal)} more for FREE Delivery`}
              </span>
              <span className="font-bold text-cyan-400">
                {freeShipping ? 'FREE' : formatINR(settings.standardShippingFee)}
              </span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-300"
                style={{
                  width: `${Math.min(100, (subtotal / settings.freeShippingThreshold) * 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Cart Items */}
          <div className="divide-y divide-slate-800 rounded-2xl border border-slate-800 bg-slate-900/40 p-4 sm:p-6">
            {cart.map((item) => (
              <div
                key={item.product.id + (item.selectedColor || '')}
                className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-xl object-cover bg-slate-950 border border-slate-800 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                      {item.product.brand}
                    </span>
                    <h3
                      onClick={() => navigateTo('product-detail', item.product.id)}
                      className="text-sm font-bold text-white hover:text-cyan-400 cursor-pointer transition-colors line-clamp-1"
                    >
                      {item.product.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                      {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                      {item.selectedStorage && <span>· {item.selectedStorage}</span>}
                    </div>
                    <div className="text-xs font-bold text-slate-300 mt-1 tabular-nums sm:hidden">
                      {formatINR(item.product.price)} each
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                  {/* Stepper */}
                  <div className="flex items-center border border-slate-700 rounded-xl overflow-hidden bg-slate-950">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      className="px-3 py-1 text-slate-400 hover:bg-slate-800"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-bold text-white tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      className="px-3 py-1 text-slate-400 hover:bg-slate-800"
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right">
                    <div className="text-sm font-extrabold text-white tabular-nums">
                      {formatINR(item.product.price * item.quantity)}
                    </div>
                    {item.quantity > 1 && (
                      <span className="text-[10px] text-slate-400 hidden sm:block">
                        {formatINR(item.product.price)} each
                      </span>
                    )}
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigateTo('products')}
            className="self-start inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors pt-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping for Tech</span>
          </button>
        </div>

        {/* Right Column: Order Summary & Coupon (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          {/* Coupon Code Input */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-cyan-400" />
              <span>Apply Promo Code</span>
            </h3>

            {appliedCoupon ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/60 text-xs">
                <div>
                  <span className="font-bold text-cyan-300">{appliedCoupon} Applied</span>
                  <p className="text-[10px] text-slate-400">
                    You saved {formatINR(discountAmount)} on this order!
                  </p>
                </div>
                <button
                  onClick={handleRemoveCoupon}
                  className="text-xs text-rose-400 hover:underline font-semibold"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter KHAN10"
                  className="flex-1 px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white placeholder-slate-500 uppercase focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors"
                >
                  Apply
                </button>
              </form>
            )}

            {/* Quick Coupon Suggestions */}
            <div className="mt-3 flex flex-wrap gap-1.5 text-[10px]">
              <span className="text-slate-400 self-center">Try:</span>
              <button
                type="button"
                onClick={() => setCouponCode('KHAN10')}
                className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700 hover:border-cyan-500"
              >
                KHAN10 (10% Off)
              </button>
              <button
                type="button"
                onClick={() => setCouponCode('WELCOME500')}
                className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700 hover:border-cyan-500"
              >
                WELCOME500
              </button>
            </div>
          </div>

          {/* Pricing Breakdown Card */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-4">Order Summary</h3>

            <div className="space-y-3 text-xs border-b border-slate-800 pb-4 mb-4">
              <div className="flex justify-between text-slate-300">
                <span>Subtotal ({cart.length} items)</span>
                <span className="font-semibold text-white tabular-nums">
                  {formatINR(subtotal)}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Coupon Discount ({appliedCoupon})</span>
                  <span className="font-semibold tabular-nums">
                    - {formatINR(discountAmount)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-slate-300">
                <span>Shipping & Handling</span>
                <span className="font-semibold text-emerald-400">
                  {freeShipping ? 'FREE' : formatINR(shippingFee)}
                </span>
              </div>

              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>Taxes & GST (Included in MRP)</span>
                <span>₹0</span>
              </div>
            </div>

            <div className="flex justify-between text-base font-extrabold text-white mb-6">
              <span>Final Total</span>
              <span className="text-cyan-400 text-lg tabular-nums">
                {formatINR(grandTotal)}
              </span>
            </div>

            <button
              onClick={() => navigateTo('checkout')}
              className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/25 active:scale-98 transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Safe & Secure 256-Bit SSL Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
