import React from 'react';
import { useStore } from '../context/StoreContext';
import { formatINR, formatDate } from '../utils/formatters';
import {
  CheckCircle2,
  Package,
  MapPin,
  Calendar,
  Printer,
  ArrowRight,
  ShieldCheck,
  Truck,
} from 'lucide-react';

export const OrderSuccessView: React.FC = () => {
  const { orders, selectedOrderId, navigateTo } = useStore();

  // Find the placed order or use the latest order
  const order = orders.find((o) => o.id === selectedOrderId) || orders[0];

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-white mb-2">No active order found</h2>
        <button
          onClick={() => navigateTo('products')}
          className="mt-4 px-5 py-2.5 bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs"
        >
          Browse Electronics
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      {/* Confirmation Header Banner */}
      <div className="text-center mb-8 p-8 rounded-3xl bg-slate-900/60 border border-emerald-500/30 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4 shadow-xl shadow-emerald-950/40">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs uppercase font-bold tracking-widest text-emerald-400 mb-1">
          Payment Confirmed
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
          Thank You! Your Order is Placed.
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-md mb-4">
          Order receipt and tracking updates have been dispatched to{' '}
          <span className="text-cyan-400 font-semibold">{order.shippingAddress.email}</span>.
        </p>

        {/* Order ID Pill */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
          <span className="text-slate-400">Order Reference:</span>
          <span className="font-bold text-white tracking-wider">{order.id}</span>
        </div>
      </div>

      {/* Main Order Details Card */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 mb-8 divide-y divide-slate-800">
        {/* Logistics & Tracking Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 text-xs">
          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-400 block mb-0.5">Courier & AWB</span>
              <span className="font-bold text-white block">{order.courierName}</span>
              <span className="font-mono text-[11px] text-cyan-400">{order.trackingNumber}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-400 block mb-0.5">Estimated Arrival</span>
              <span className="font-bold text-white block">{order.estimatedDelivery}</span>
              <span className="text-[11px] text-slate-400">Order Date: {formatDate(order.date)}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-400 block mb-0.5">Delivering to</span>
              <span className="font-bold text-white block">{order.shippingAddress.fullName}</span>
              <span className="text-[11px] text-slate-300 line-clamp-1">
                {order.shippingAddress.addressLine}, {order.shippingAddress.city} {order.shippingAddress.pincode}
              </span>
            </div>
          </div>
        </div>

        {/* Itemized Order List */}
        <div className="py-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Items Included ({order.items.length})
          </h3>
          <div className="space-y-4">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-14 h-14 rounded-xl object-cover bg-slate-950 border border-slate-800 shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-white text-sm line-clamp-1">{item.product.name}</h4>
                    <div className="flex items-center gap-2 text-slate-400 text-[11px] mt-0.5">
                      <span>Brand: {item.product.brand}</span>
                      <span>·</span>
                      <span>Qty: {item.quantity}</span>
                      {item.selectedColor && (
                        <>
                          <span>·</span>
                          <span>Color: {item.selectedColor}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-white tabular-nums text-sm">
                    {formatINR(item.product.price * item.quantity)}
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {formatINR(item.product.price)} each
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="pt-6">
          <div className="max-w-xs ml-auto space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal</span>
              <span className="font-semibold text-white tabular-nums">{formatINR(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Discount</span>
                <span className="font-semibold tabular-nums">- {formatINR(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-400">
              <span>Shipping Fee</span>
              <span className="font-semibold text-emerald-400">
                {order.deliveryFee === 0 ? 'FREE' : formatINR(order.deliveryFee)}
              </span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-slate-800">
              <span>Total Paid ({order.paymentMethod.toUpperCase()})</span>
              <span className="text-cyan-400 text-base tabular-nums">{formatINR(order.total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 text-xs font-semibold transition-colors"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save Tax Invoice</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('track-order', order.id)}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-cyan-500/20"
          >
            <span>Live Track Order</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigateTo('products')}
            className="px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};
