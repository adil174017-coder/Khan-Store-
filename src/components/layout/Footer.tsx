import React from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, setSelectedCategory, theme } = useStore();
  const isDark = theme === 'dark';

  return (
    <footer
      className={`border-t transition-colors duration-200 ${
        isDark
          ? 'bg-[#080c14] border-slate-800 text-slate-400'
          : 'bg-slate-100 border-slate-200 text-slate-600'
      }`}
    >
      {/* 4 Pillars of KHAN Store Assurance */}
      <div className="border-b border-slate-800/60 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
              <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Free & Fast Delivery</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Complimentary express shipping across India on orders over ₹999 with live tracking.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">100% Genuine Guarantee</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Brand sealed products with official manufacturer warranties and authorized serial numbers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
              <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-800/40 text-amber-400 shrink-0">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">7-Day Easy Returns</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Hassle-free replacement policy with instant pickup for any verified manufacturing issue.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
              <div className="p-3 rounded-xl bg-indigo-950/60 border border-indigo-800/40 text-indigo-400 shrink-0">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Expert Tech Support</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Dedicated specialists ready to help with device compatibility, setup and warranty claims.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2 cursor-pointer mb-4"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-extrabold text-lg">
                K
              </div>
              <span className="font-display font-extrabold text-xl text-white tracking-tight">
                KHAN <span className="text-cyan-400">STORE</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mb-5">
              KHAN Store is a modern electronics destination engineered to deliver authentic flagship smartphones, pro laptops, acoustic hardware, and cutting-edge wearables to tech enthusiasts across India.
            </p>
            <div className="flex flex-col gap-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>+91 1800 258 4267 (Toll-Free, 9 AM - 9 PM IST)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>support@khanstore.com</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>DLF Cyber City, Tower B, Gurugram, Haryana 122002</span>
              </div>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Flagship Categories
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs">
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('smartphones');
                    navigateTo('products');
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Smartphones & Foldables
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('laptops');
                    navigateTo('products');
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Pro Laptops & MacBooks
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('audio');
                    navigateTo('products');
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Noise Cancelling Audio
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('smartwatches');
                    navigateTo('products');
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Titanium Smartwatches
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('gaming');
                    navigateTo('products');
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Consoles & Mechanical Keys
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Customer Services
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('track-order')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Track Order
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('my-orders')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Order History & Invoices
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('help')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Help Center & FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Contact Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('privacy')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('terms')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Business & Admin */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Partners & Store Ops
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('sell-with-us')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Sell on KHAN Store
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  About KHAN Store
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('admin')}
                  className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                >
                  <span>Admin Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
            </ul>

            <div className="mt-6 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400">
              <span className="text-slate-200 font-semibold block mb-0.5">Payment Security</span>
              <span>256-bit SSL encrypted checkout. UPI, Visa, Mastercard & RuPay supported.</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} KHAN Store Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <span>Fast Dispatch</span>
            <span>·</span>
            <span>Zero Broken Seal</span>
            <span>·</span>
            <span>Pan-India Logistics</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
