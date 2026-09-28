import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../utils/formatters';
import {
  Search,
  Truck,
  CheckCircle2,
  Clock,
  Package,
  MapPin,
  Calendar,
  AlertCircle,
} from 'lucide-react';

export const TrackOrderView: React.FC = () => {
  const { orders, selectedOrderId } = useStore();

  const [inputOrderId, setInputOrderId] = useState(
    selectedOrderId || orders[0]?.id || 'KHAN-98421'
  );
  const [searchedId, setSearchedId] = useState(
    selectedOrderId || orders[0]?.id || 'KHAN-98421'
  );

  const matchedOrder = orders.find(
    (o) => o.id.toLowerCase() === searchedId.trim().toLowerCase()
  );

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputOrderId.trim()) {
      setSearchedId(inputOrderId.trim());
    }
  };

  const steps = [
    { key: 'Order Placed', label: 'Order Placed', desc: 'Order received & payment confirmed' },
    { key: 'Confirmed', label: 'Confirmed', desc: 'Inventory reserved & warehouse notified' },
    { key: 'Processing', label: 'Processing', desc: 'Secure anti-static packaging & QA check' },
    { key: 'Shipped', label: 'Shipped', desc: 'Dispatched via express air freight' },
    { key: 'Out for Delivery', label: 'Out for Delivery', desc: 'With local courier agent for delivery' },
    { key: 'Delivered', label: 'Delivered', desc: 'Handed over with OTP verification' },
  ];

  // Helper to determine step completion index
  const getActiveStepIndex = (status: string) => {
    const map: Record<string, number> = {
      'Order Placed': 0,
      'Confirmed': 1,
      'Processing': 2,
      'Shipped': 3,
      'Out for Delivery': 4,
      'Delivered': 5,
    };
    return map[status] ?? 0;
  };

  const currentStepIndex = matchedOrder ? getActiveStepIndex(matchedOrder.status) : -1;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      {/* Header & Search Bar */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
          Track Your Shipment
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mb-6">
          Enter your KHAN Store Order ID or AWB Tracking code to monitor live transit milestones.
        </p>

        <form onSubmit={handleTrackSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputOrderId}
              onChange={(e) => setInputOrderId(e.target.value)}
              placeholder="e.g. KHAN-98421"
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 font-mono text-sm focus:outline-none focus:border-cyan-500"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-2xl transition-colors shadow-lg shadow-cyan-500/20"
          >
            Track
          </button>
        </form>

        {/* Quick Suggestion Pills */}
        {orders.length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-slate-400">
            <span>Recent Orders:</span>
            {orders.slice(0, 3).map((o) => (
              <button
                key={o.id}
                onClick={() => {
                  setInputOrderId(o.id);
                  setSearchedId(o.id);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-800 text-cyan-300 font-mono text-[11px] hover:bg-slate-700 transition-colors"
              >
                {o.id}
              </button>
            ))}
          </div>
        )}
      </div>

      {!matchedOrder ? (
        <div className="p-12 text-center rounded-3xl border border-slate-800 bg-slate-900/40">
          <AlertCircle className="w-12 h-12 text-rose-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white mb-1">
            No matching order found for "{searchedId}"
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Please verify your Order ID from your receipt or check your registered email inbox.
          </p>
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 space-y-8">
          {/* Order Snapshot Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 text-xs">
            <div>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                Tracking Order
              </span>
              <h2 className="text-xl font-extrabold text-white font-mono">{matchedOrder.id}</h2>
              <span className="text-slate-400 text-[11px]">
                Courier: {matchedOrder.courierName} ({matchedOrder.trackingNumber})
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block">Current Status</span>
                <span className="text-sm font-bold text-cyan-400">{matchedOrder.status}</span>
              </div>
              <div className="p-3 rounded-2xl bg-cyan-950/60 border border-cyan-800/40 text-cyan-400">
                <Truck className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Progress Timeline Stepper */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
              Milestone Progress
            </h3>

            <div className="relative pl-6 sm:pl-0">
              <div className="grid grid-cols-1 sm:grid-cols-6 gap-6 sm:gap-2 relative">
                {steps.map((step, idx) => {
                  const isDone = idx <= currentStepIndex;
                  const isCurrent = idx === currentStepIndex;

                  return (
                    <div
                      key={step.key}
                      className="flex sm:flex-col items-start sm:items-center text-left sm:text-center relative"
                    >
                      {/* Indicator Node */}
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mb-2 z-10 transition-colors shadow-md ${
                          isDone
                            ? 'bg-cyan-500 text-slate-950 shadow-cyan-500/20'
                            : 'bg-slate-800 text-slate-500 border border-slate-700'
                        } ${isCurrent ? 'ring-4 ring-cyan-500/30 animate-pulse' : ''}`}
                      >
                        {isDone ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                      </div>

                      <div className="ml-3 sm:ml-0">
                        <span
                          className={`font-bold text-xs block ${
                            isDone ? 'text-white' : 'text-slate-500'
                          }`}
                        >
                          {step.label}
                        </span>
                        <p className="text-[10px] text-slate-400 mt-0.5 max-w-[130px] hidden sm:block">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Granular Tracking Events List */}
          <div className="pt-6 border-t border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Realtime Transit Logs
            </h3>
            <div className="space-y-4">
              {matchedOrder.timeline.map((event, idx) => (
                <div key={idx} className="flex items-start gap-4 text-xs">
                  <div
                    className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${
                      event.completed ? 'bg-cyan-400' : 'bg-slate-700'
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-semibold ${
                          event.completed ? 'text-white' : 'text-slate-500'
                        }`}
                      >
                        {event.status}
                      </span>
                      <span className="text-[11px] text-slate-400">{event.date}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address & Package Info */}
          <div className="pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
              <div className="flex items-center gap-2 text-cyan-400 font-bold mb-2">
                <MapPin className="w-4 h-4" />
                <span>Delivery Address</span>
              </div>
              <p className="font-semibold text-white">{matchedOrder.shippingAddress.fullName}</p>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                {matchedOrder.shippingAddress.addressLine}, {matchedOrder.shippingAddress.city},{' '}
                {matchedOrder.shippingAddress.state} - {matchedOrder.shippingAddress.pincode}
              </p>
              <p className="text-slate-400 text-[11px] mt-1">
                Phone: {matchedOrder.shippingAddress.phone}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
              <div className="flex items-center gap-2 text-amber-400 font-bold mb-2">
                <Package className="w-4 h-4" />
                <span>Package Summary ({matchedOrder.items.length} Items)</span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                {matchedOrder.items.map((it, i) => (
                  <div key={i} className="flex justify-between text-slate-300">
                    <span className="truncate max-w-[200px]">{it.product.name} (x{it.quantity})</span>
                    <span className="font-semibold text-white tabular-nums">
                      {formatINR(it.product.price * it.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
