import React from 'react';
import { useStore } from '../context/StoreContext';
import { formatINR, formatDate } from '../utils/formatters';
import { Package, ArrowRight, Truck, CheckCircle2, Clock } from 'lucide-react';

export const OrdersView: React.FC = () => {
  const { orders, navigateTo } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            My Orders
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            View history, track current shipments and reorder electronics
          </p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="p-16 text-center rounded-3xl border border-slate-800 bg-slate-900/40 flex flex-col items-center justify-center">
          <Package className="w-14 h-14 text-slate-600 mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">No orders placed yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mb-6">
            When you purchase flagship phones, laptops, or accessories, your tracking records and receipts will show up here.
          </p>
          <button
            onClick={() => navigateTo('products')}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
          >
            Explore Tech Products
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const isDelivered = order.status === 'Delivered';
            const isShipped = order.status === 'Shipped' || order.status === 'Out for Delivery';

            return (
              <div
                key={order.id}
                className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 sm:p-7 flex flex-col gap-6"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 text-xs">
                  <div className="flex flex-wrap items-center gap-4">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Order Reference</span>
                      <span className="font-bold text-white tracking-wider">{order.id}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Order Placed</span>
                      <span className="font-medium text-slate-200">{formatDate(order.date)}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Total Amount</span>
                      <span className="font-bold text-cyan-400 tabular-nums">
                        {formatINR(order.total)}
                      </span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        isDelivered
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : isShipped
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      }`}
                    >
                      {isDelivered ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : isShipped ? (
                        <Truck className="w-3.5 h-3.5" />
                      ) : (
                        <Clock className="w-3.5 h-3.5" />
                      )}
                      <span>{order.status}</span>
                    </span>

                    <button
                      onClick={() => navigateTo('track-order', order.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1"
                    >
                      <span>Track Order</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Items in this order */}
                <div className="space-y-4">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-4 text-xs"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 rounded-xl object-cover bg-slate-950 border border-slate-800 shrink-0"
                        />
                        <div>
                          <h4
                            onClick={() => navigateTo('product-detail', item.product.id)}
                            className="text-sm font-bold text-white hover:text-cyan-400 cursor-pointer transition-colors line-clamp-1"
                          >
                            {item.product.name}
                          </h4>
                          <div className="flex items-center gap-2 text-slate-400 mt-1">
                            <span>Quantity: {item.quantity}</span>
                            {item.selectedColor && <span>· Color: {item.selectedColor}</span>}
                            {item.selectedStorage && <span>· {item.selectedStorage}</span>}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-bold text-white text-sm tabular-nums">
                          {formatINR(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery footer */}
                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-400">
                  <div className="flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-cyan-400" />
                    <span>
                      Dispatched with {order.courierName} · Tracking: {order.trackingNumber}
                    </span>
                  </div>
                  <span className="text-slate-300">
                    Delivering to {order.shippingAddress.city}, {order.shippingAddress.pincode}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
