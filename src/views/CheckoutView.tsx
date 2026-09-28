import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../utils/formatters';
import { Address } from '../types';
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Building2,
  Banknote,
  CheckCircle2,
  Lock,
  ArrowRight,
  Truck,
  ArrowLeft,
} from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    currentUser,
    deliveryLocation,
    settings,
    placeOrder,
    navigateTo,
    showToast,
  } = useStore();

  const [fullName, setFullName] = useState(
    currentUser?.name || currentUser?.defaultAddress?.fullName || 'Aakash Verma'
  );
  const [email, setEmail] = useState(
    currentUser?.email || currentUser?.defaultAddress?.email || 'aakash.verma@example.com'
  );
  const [phone, setPhone] = useState(
    currentUser?.phone || currentUser?.defaultAddress?.phone || '+91 98765 43210'
  );
  const [addressLine, setAddressLine] = useState(
    currentUser?.defaultAddress?.addressLine || 'Flat 402, Signature Towers, Bandra Kurla Complex'
  );
  const [city, setCity] = useState(
    currentUser?.defaultAddress?.city || deliveryLocation.city || 'Mumbai'
  );
  const [state, setState] = useState(
    currentUser?.defaultAddress?.state || 'Maharashtra'
  );
  const [pincode, setPincode] = useState(
    currentUser?.defaultAddress?.pincode || deliveryLocation.pincode || '400051'
  );
  const [addressType, setAddressType] = useState<'home' | 'office'>('home');

  const [deliverySpeed, setDeliverySpeed] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('aakash@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('892');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = subtotal >= 5000 ? Math.min(10000, Math.round(subtotal * 0.1)) : 0;
  const shippingFee = deliverySpeed === 'express' ? 199 : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  if (cart.length === 0) {
    navigateTo('cart');
    return null;
  }

  const handlePlaceOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !addressLine || !pincode) {
      showToast('Please complete all required delivery details', 'error');
      return;
    }

    setIsProcessing(true);

    const address: Address = {
      fullName,
      email,
      phone,
      addressLine,
      city,
      state,
      pincode,
      addressType,
    };

    setTimeout(() => {
      const placedOrder = placeOrder(address, paymentMethod, discountAmount, shippingFee);
      setIsProcessing(false);
      showToast('Order placed successfully!', 'success');
      navigateTo('order-success', placedOrder.id);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigateTo('cart')}
          className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cart</span>
        </button>
        <span className="text-slate-600">|</span>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <Lock className="w-5 h-5 text-cyan-400" />
          <span>Secure Checkout</span>
        </h1>
      </div>

      <form onSubmit={handlePlaceOrderSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Delivery & Payment Details (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Step 1: Customer Contact & Delivery Address */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 font-bold text-xs flex items-center justify-center">
                  1
                </span>
                <h2 className="text-sm font-bold text-white">Shipping & Delivery Address</h2>
              </div>
              <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Pan-India Courier Network</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Recipient Name"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Phone Number (for Courier OTP) *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-slate-300 font-semibold block mb-1">Email Address (for Invoice & Updates) *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-slate-300 font-semibold block mb-1">Flat / House No. / Street Address *</label>
                <input
                  type="text"
                  required
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  placeholder="e.g. Flat 402, Signature Towers, BKC"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">City *</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="State"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">PIN Code *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="400001"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Address Type */}
              <div className="sm:col-span-2 pt-2">
                <span className="text-slate-300 font-semibold block mb-1.5">Delivery Address Type</span>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="addressType"
                      checked={addressType === 'home'}
                      onChange={() => setAddressType('home')}
                      className="text-cyan-500 bg-slate-900 border-slate-700"
                    />
                    <span>Home (All Day Delivery)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="addressType"
                      checked={addressType === 'office'}
                      onChange={() => setAddressType('office')}
                      className="text-cyan-500 bg-slate-900 border-slate-700"
                    />
                    <span>Office (10 AM - 6 PM Delivery)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Delivery Speed Options */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
              <span className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h2 className="text-sm font-bold text-white">Shipping Speed & Transit</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label
                onClick={() => setDeliverySpeed('standard')}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                  deliverySpeed === 'standard'
                    ? 'border-cyan-500 bg-cyan-950/40 text-cyan-200'
                    : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                }`}
              >
                <Truck className="w-5 h-5 text-cyan-400 mt-0.5" />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">Standard Express</span>
                    <span className="font-bold text-emerald-400">FREE</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Estimated 2-3 business days via Blue Dart Air
                  </p>
                </div>
              </label>

              <label
                onClick={() => setDeliverySpeed('express')}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                  deliverySpeed === 'express'
                    ? 'border-cyan-500 bg-cyan-950/40 text-cyan-200'
                    : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                }`}
              >
                <Truck className="w-5 h-5 text-amber-400 mt-0.5" />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">Priority 24h Transit</span>
                    <span className="font-bold text-amber-400">+₹199</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Guaranteed next-day doorstep delivery
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Step 3: Payment Method */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 font-bold text-xs flex items-center justify-center">
                  3
                </span>
                <h2 className="text-sm font-bold text-white">Payment Method</h2>
              </div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                Simulated Sandbox Gateway
              </span>
            </div>

            {/* Payment selection pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
              {[
                { id: 'upi', label: 'UPI / QR', icon: QrCode },
                { id: 'card', label: 'Cards', icon: CreditCard },
                { id: 'netbanking', label: 'Net Banking', icon: Building2 },
                { id: 'cod', label: 'Pay on Delivery', icon: Banknote },
              ].map((p) => {
                const Icon = p.icon;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPaymentMethod(p.id as any)}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-colors text-xs font-semibold ${
                      paymentMethod === p.id
                        ? 'border-cyan-500 bg-cyan-950/60 text-cyan-300 shadow-md shadow-cyan-500/20'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{p.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Payment specific forms */}
            {paymentMethod === 'upi' && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-white">Instant UPI Auto-Pay</span>
                  <span className="text-[11px] text-cyan-400">GPay · PhonePe · Paytm · BHIM</span>
                </div>
                <label className="text-slate-400 block mb-1">Enter your Virtual Payment Address (VPA)</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="username@upi"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 mb-2"
                />
                <p className="text-[11px] text-slate-400">
                  A payment request notification will be simulated upon clicking Place Order.
                </p>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-3">
                <div>
                  <label className="text-slate-400 block mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4242 4242 4242 4242"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 block mb-1">Valid Thru</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">CVV</label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="123"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <span className="font-semibold text-white block mb-2">Select Your Bank</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map((b) => (
                    <div key={b} className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-center font-medium cursor-pointer hover:border-cyan-500">
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                <span className="font-bold text-white block mb-1">Cash on Delivery</span>
                <p className="leading-relaxed">
                  Pay cash or scan courier QR on doorstep delivery. Please ensure exact cash or UPI readiness for seamless handoff.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4 sticky top-24">
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-4">
              Items in Order ({cart.length})
            </h3>

            {/* Item list mini */}
            <div className="divide-y divide-slate-800 max-h-56 overflow-y-auto pr-1 mb-4">
              {cart.map((item) => (
                <div key={item.product.id} className="py-2.5 flex items-center gap-3 text-xs">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 rounded-lg object-cover bg-slate-950 border border-slate-800 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-white truncate">{item.product.name}</h5>
                    <span className="text-[11px] text-slate-400">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-bold text-white tabular-nums">
                    {formatINR(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2.5 text-xs border-t border-slate-800 pt-4 mb-4">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="font-semibold text-white tabular-nums">{formatINR(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount Applied</span>
                  <span className="font-semibold tabular-nums">- {formatINR(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400">
                <span>Shipping</span>
                <span className="font-semibold text-emerald-400">
                  {shippingFee === 0 ? 'FREE' : formatINR(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>GST Tax</span>
                <span>Included</span>
              </div>
            </div>

            <div className="flex justify-between text-base font-extrabold text-white pt-3 border-t border-slate-800 mb-6">
              <span>Total Payable</span>
              <span className="text-cyan-400 text-lg tabular-nums">
                {formatINR(grandTotal)}
              </span>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/25 active:scale-98 transition-all disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Authorizing Order with KHAN Hub...</span>
              ) : (
                <>
                  <span>Confirm & Place Order</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Buyer Protection & Refund Guarantee</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
