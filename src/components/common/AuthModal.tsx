import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Lock, Mail, User, Phone, CheckCircle, ShieldCheck } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    authModalMode,
    closeAuthModal,
    loginUser,
    signupUser,
    showToast,
    theme,
  } = useStore();

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(authModalMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  if (!isAuthModalOpen) return null;

  const isDark = theme === 'dark';

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('Please enter your email', 'error');
      return;
    }
    const success = loginUser(email, email.includes('admin') ? 'admin' : 'customer');
    if (success) {
      closeAuthModal();
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      showToast('Please provide your name and email', 'error');
      return;
    }
    signupUser(name, email, phone || '+91 98765 00000');
    closeAuthModal();
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('Please enter your registered email address', 'error');
      return;
    }
    setForgotSubmitted(true);
    showToast(`Password reset link sent to ${email}`, 'success');
  };

  const fillDemoCustomer = () => {
    setEmail('aakash.verma@example.com');
    setPassword('••••••••');
  };

  const fillDemoAdmin = () => {
    setEmail('admin@khanstore.com');
    setPassword('••••••••');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-md rounded-3xl border shadow-2xl p-6 sm:p-8 ${
          isDark
            ? 'bg-[#0f172a] border-slate-700/80 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-extrabold text-xl mx-auto mb-3 shadow-lg shadow-cyan-500/20">
            K
          </div>
          <h2 className="text-xl font-bold tracking-tight">
            {mode === 'login'
              ? 'Welcome to KHAN Store'
              : mode === 'signup'
              ? 'Create Your Account'
              : 'Reset Your Password'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {mode === 'login'
              ? 'Access your orders, track shipments & manage wishlist'
              : mode === 'signup'
              ? 'Join thousands of tech enthusiasts with exclusive warranty benefits'
              : 'Enter your email to receive a recovery code'}
          </p>
        </div>

        {/* Quick Demo Pre-fill Pill Buttons */}
        {mode === 'login' && (
          <div className="mb-5 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 block mb-2 text-center uppercase tracking-wider">
              1-Click Demo Accounts
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={fillDemoCustomer}
                className="px-2.5 py-1.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-[11px] font-medium text-cyan-300 transition-colors text-center"
              >
                Shopper Demo
              </button>
              <button
                type="button"
                onClick={fillDemoAdmin}
                className="px-2.5 py-1.5 rounded-xl border border-indigo-700/60 bg-indigo-950/40 hover:bg-indigo-900/50 text-[11px] font-medium text-indigo-300 transition-colors text-center flex items-center justify-center gap-1"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span>Admin Demo</span>
              </button>
            </div>
          </div>
        )}

        {/* Forms */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-3.5">
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs border border-slate-700 bg-slate-900/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="text-[11px] text-cyan-400 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs border border-slate-700 bg-slate-900/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 mt-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-md shadow-cyan-500/20 active:scale-98"
            >
              Sign In to KHAN Store
            </button>

            <div className="text-center mt-3 text-xs text-slate-400">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="font-semibold text-cyan-400 hover:underline"
              >
                Create one now
              </button>
            </div>
          </form>
        )}

        {mode === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="flex flex-col gap-3.5">
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs border border-slate-700 bg-slate-900/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">Email</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs border border-slate-700 bg-slate-900/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">
                Mobile Number (for order OTPs)
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs border border-slate-700 bg-slate-900/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 mt-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-md shadow-cyan-500/20 active:scale-98"
            >
              Complete Registration
            </button>

            <div className="text-center mt-3 text-xs text-slate-400">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-semibold text-cyan-400 hover:underline"
              >
                Sign In here
              </button>
            </div>
          </form>
        )}

        {mode === 'forgot' && (
          <div>
            {!forgotSubmitted ? (
              <form onSubmit={handleForgotSubmit} className="flex flex-col gap-3.5">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">
                    Registered Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs border border-slate-700 bg-slate-900/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 mt-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-md shadow-cyan-500/20"
                >
                  Send Password Reset Instructions
                </button>
              </form>
            ) : (
              <div className="text-center py-4 flex flex-col items-center">
                <CheckCircle className="w-12 h-12 text-emerald-400 mb-2" />
                <h3 className="text-sm font-bold text-white mb-1">Recovery Link Dispatched</h3>
                <p className="text-xs text-slate-400 max-w-xs mb-4">
                  We've sent a 6-digit verification code and reset link to {email}.
                </p>
                <button
                  onClick={() => {
                    setForgotSubmitted(false);
                    setMode('login');
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-medium hover:bg-slate-700 text-white"
                >
                  Return to Login
                </button>
              </div>
            )}

            {!forgotSubmitted && (
              <div className="text-center mt-4 text-xs text-slate-400">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-semibold text-cyan-400 hover:underline"
                >
                  Back to Sign In
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
