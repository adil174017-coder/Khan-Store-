import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, MapPin, Check } from 'lucide-react';

const POPULAR_LOCATIONS = [
  { city: 'Mumbai', pincode: '400001', state: 'Maharashtra' },
  { city: 'Bengaluru', pincode: '560001', state: 'Karnataka' },
  { city: 'Delhi NCR', pincode: '110001', state: 'Delhi' },
  { city: 'Hyderabad', pincode: '500081', state: 'Telangana' },
  { city: 'Chennai', pincode: '600001', state: 'Tamil Nadu' },
  { city: 'Pune', pincode: '411001', state: 'Maharashtra' },
  { city: 'Kolkata', pincode: '700001', state: 'West Bengal' },
  { city: 'Ahmedabad', pincode: '380001', state: 'Gujarat' },
];

export const LocationModal: React.FC = () => {
  const { isLocationModalOpen, setLocationModalOpen, setDeliveryLocation, deliveryLocation, theme } =
    useStore();

  const [pincode, setPincode] = useState(deliveryLocation.pincode);
  const [city, setCity] = useState(deliveryLocation.city);

  if (!isLocationModalOpen) return null;

  const isDark = theme === 'dark';

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim() && city.trim()) {
      setDeliveryLocation({ city: city.trim(), pincode: pincode.trim() });
      setLocationModalOpen(false);
    }
  };

  const handleSelectQuick = (loc: { city: string; pincode: string }) => {
    setDeliveryLocation(loc);
    setLocationModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-md rounded-3xl border shadow-2xl p-6 ${
          isDark
            ? 'bg-[#0f172a] border-slate-700/80 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <button
          onClick={() => setLocationModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-bold">Select Delivery Location</h3>
        </div>
        <p className="text-xs text-slate-400 mb-5">
          Delivery options and express same-day availability may vary based on your PIN code.
        </p>

        {/* Custom Input */}
        <form onSubmit={handleApply} className="flex gap-2 mb-6">
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Enter 6-digit PIN code"
            maxLength={6}
            className="flex-1 px-3 py-2 rounded-xl text-xs border border-slate-700 bg-slate-900/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            className="w-28 px-3 py-2 rounded-xl text-xs border border-slate-700 bg-slate-900/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl"
          >
            Apply
          </button>
        </form>

        {/* Popular Cities */}
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
            Popular Hubs (Express Same-Day Available)
          </span>
          <div className="grid grid-cols-2 gap-2">
            {POPULAR_LOCATIONS.map((loc) => {
              const isCurrent = deliveryLocation.pincode === loc.pincode;
              return (
                <button
                  key={loc.pincode}
                  onClick={() => handleSelectQuick(loc)}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-colors flex items-center justify-between ${
                    isCurrent
                      ? 'border-cyan-500 bg-cyan-950/40 text-cyan-300'
                      : 'border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <div>
                    <div className="font-semibold">{loc.city}</div>
                    <div className="text-[10px] text-slate-400">{loc.pincode}</div>
                  </div>
                  {isCurrent && <Check className="w-4 h-4 text-cyan-400" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
