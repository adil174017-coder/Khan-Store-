import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../utils/formatters';
import {
  User,
  Package,
  Heart,
  MapPin,
  Lock,
  LogOut,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const AccountView: React.FC = () => {
  const { currentUser, orders, wishlist, logoutUser, navigateTo, showToast } = useStore();

  const [name, setName] = useState(currentUser?.name || 'Aakash Verma');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98765 43210');
  const [addressLine, setAddressLine] = useState(
    currentUser?.defaultAddress?.addressLine || 'Flat 402, Signature Towers, BKC'
  );
  const [city, setCity] = useState(currentUser?.defaultAddress?.city || 'Mumbai');
  const [pincode, setPincode] = useState(currentUser?.defaultAddress?.pincode || '400051');

  if (!currentUser) {
    navigateTo('home');
    return null;
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Profile information updated successfully!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Account Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-xl shadow-cyan-500/20">
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white">{currentUser.name}</h1>
              <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/40 text-[10px] font-semibold uppercase">
                {currentUser.role === 'admin' ? 'Store Administrator' : 'Verified Buyer'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{currentUser.email} · {currentUser.phone}</p>
          </div>
        </div>

        <button
          onClick={logoutUser}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 font-semibold text-xs transition-colors self-start sm:self-auto"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Account KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div
          onClick={() => navigateTo('my-orders')}
          className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors flex items-center justify-between"
        >
          <div>
            <span className="text-xs text-slate-400 block mb-1">Total Orders</span>
            <span className="text-2xl font-extrabold text-white tabular-nums">
              {currentUser.ordersCount || orders.length}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div
          onClick={() => navigateTo('wishlist')}
          className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors flex items-center justify-between"
        >
          <div>
            <span className="text-xs text-slate-400 block mb-1">Saved in Wishlist</span>
            <span className="text-2xl font-extrabold text-white tabular-nums">
              {wishlist.length} Items
            </span>
          </div>
          <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <Heart className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block mb-1">Total Lifetime Spend</span>
            <span className="text-2xl font-extrabold text-emerald-400 tabular-nums">
              {formatINR(currentUser.totalSpent || 218400)}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Profile Details Form (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900/50 border border-slate-800">
          <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-cyan-400" />
            <span>Personal Information & Primary Address</span>
          </h2>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Email Address</label>
              <input
                type="email"
                disabled
                value={currentUser.email}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/50 border border-slate-800 text-slate-400 cursor-not-allowed"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Contact support to modify registered email.
              </span>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Default Address Line</label>
              <input
                type="text"
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="text-slate-300 font-semibold block mb-1">PIN Code</label>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs transition-colors mt-2"
            >
              Update Profile Details
            </button>
          </form>
        </div>

        {/* Security & Quick Actions (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 text-xs">
            <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Security & Password</span>
            </h3>
            <p className="text-slate-400 mb-4 leading-relaxed">
              Your account is protected by 2-Factor Courier OTP validation and encrypted sessions.
            </p>
            <button
              onClick={() => showToast('Password reset link sent to your email', 'info')}
              className="w-full py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-white font-semibold text-xs transition-colors"
            >
              Change Account Password
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-indigo-950/30 border border-indigo-800/40 text-xs">
            <div className="flex items-center gap-2 text-indigo-300 font-bold mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Store Operations</span>
            </div>
            <p className="text-slate-300 mb-4 leading-relaxed">
              Manage inventory, process customer orders, inspect live sales metrics, and update promotional banners.
            </p>
            <button
              onClick={() => navigateTo('admin')}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors"
            >
              Open Admin Control Panel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
