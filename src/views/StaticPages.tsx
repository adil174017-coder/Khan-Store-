import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  ChevronUp,
  Send,
  Building,
  CheckCircle2,
} from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full text-slate-300">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 block mb-2">
          Our Brand Heritage
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          Redefining Flagship Tech Retail in India
        </h1>
        <p className="text-sm leading-relaxed text-slate-400">
          KHAN Store was founded on a simple conviction: technology enthusiasts deserve 100% genuine hardware, transparent pricing, and uncompromising post-purchase support.
        </p>
      </div>

      <div className="space-y-8 text-sm leading-relaxed">
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
          <h2 className="text-lg font-bold text-white mb-2">Zero Compromise on Authenticity</h2>
          <p>
            Every smartphone, pro laptop, acoustic system, and wearable in our catalog is procured directly from brand-authorized distribution channels. We maintain rigorous serialized intake scans, guaranteeing you receive a factory-sealed unit with valid Indian GST invoices and original manufacturer warranty.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800">
            <Truck className="w-6 h-6 text-cyan-400 mb-2" />
            <h3 className="font-bold text-white text-sm mb-1">Air Express Transit</h3>
            <p className="text-xs text-slate-400">
              Fast, tamper-proof dispatched shipments delivered across 19,000+ Indian PIN codes.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800">
            <ShieldCheck className="w-6 h-6 text-emerald-400 mb-2" />
            <h3 className="font-bold text-white text-sm mb-1">Brand Official Support</h3>
            <p className="text-xs text-slate-400">
              Direct service eligibility at Apple, Sony, Samsung, and Dell authorized service centres.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800">
            <RotateCcw className="w-6 h-6 text-amber-400 mb-2" />
            <h3 className="font-bold text-white text-sm mb-1">Doorstep Returns</h3>
            <p className="text-xs text-slate-400">
              7-day direct replacement guarantee for any transit damages or dead-on-arrival items.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ContactView: React.FC = () => {
  const { showToast } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Your message has been received! Our support team will reply within 4 hours.', 'success');
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="text-center max-w-xl mx-auto mb-10">
        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
          Contact Customer Support
        </h1>
        <p className="text-xs text-slate-400">
          Our hardware specialists and order logistics managers are ready to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Contact Info (5 cols) */}
        <div className="md:col-span-5 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 text-xs space-y-5">
          <h3 className="text-sm font-bold text-white">Store Headquarters</h3>
          <div className="flex items-start gap-3 text-slate-300">
            <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block">KHAN Store Technologies</span>
              <span>Level 8, Tower B, DLF Cyber City, Gurugram, Haryana 122002</span>
            </div>
          </div>

          <div className="flex items-start gap-3 text-slate-300">
            <Phone className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block">Helpline Numbers</span>
              <span>+91 1800 258 4267 (Toll-Free)</span>
              <span className="block text-slate-400 text-[11px]">9:00 AM - 9:00 PM IST (Mon-Sun)</span>
            </div>
          </div>

          <div className="flex items-start gap-3 text-slate-300">
            <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block">Support Inquiries</span>
              <span>support@khanstore.com</span>
              <span className="block text-slate-400 text-[11px]">Average response: &lt; 2 hours</span>
            </div>
          </div>
        </div>

        {/* Message Form (7 cols) */}
        <div className="md:col-span-7 p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rahul Mehta"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rahul@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Subject / Order ID</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Inquiry regarding Order #KHAN-98421"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Message *</label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can our technical support team assist you today?"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export const HelpCenterView: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does KHAN Store guarantee 100% genuine electronics?',
      a: 'All items are supplied exclusively through brand-authorized distribution networks. We do not support open-box or grey-market inventory. Every purchase carries a verified serial number registered with the brand manufacturer.',
    },
    {
      q: 'How fast is delivery and which courier partners are used?',
      a: 'Orders placed before 2:00 PM IST qualify for same-day dispatch. We partner with Blue Dart Express Air, Delhivery Surface Pro, and Smartr Logistics to ensure deliveries reach metro hubs within 24-48 hours.',
    },
    {
      q: 'What is the return and replacement procedure?',
      a: 'In the event of an unboxing defect or hardware malfunction within 7 days, simply raise a replacement request via My Orders or call our toll-free concierge. Our team will schedule an immediate doorstep inspection and pickup.',
    },
    {
      q: 'Can I claim GST input tax credit for business purchases?',
      a: 'Yes! All KHAN Store order invoices display your GSTIN and full billing breakdown, enabling compliant input tax credit claims for business organizations.',
    },
    {
      q: 'Are my online payment details secure?',
      a: 'We implement 256-bit SSL encryption. We do not store card numbers or banking passwords on our servers; payments are tokenized via RBI-compliant payment aggregator standards.',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
          Help Center & Frequently Asked Questions
        </h1>
        <p className="text-xs text-slate-400">
          Find answers to common questions about shipping, warranty, returns, and orders.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-white hover:text-cyan-400 transition-colors"
              >
                <span>{faq.q}</span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0 ml-2" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                )}
              </button>
              {isOpen && (
                <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const SellWithUsView: React.FC = () => {
  const { showToast } = useStore();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Merchant onboarding application submitted!', 'success');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="text-center mb-10">
        <span className="text-xs uppercase font-bold text-cyan-400 tracking-wider block mb-1">
          Merchant & Brand Network
        </span>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
          Sell on KHAN Store
        </h1>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Partner with India's premium tech marketplace to reach over 500,000 discerning electronics shoppers.
        </p>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Business / Brand Name *</label>
              <input
                type="text"
                required
                placeholder="Acme Electronics Ltd."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="text-slate-300 font-semibold block mb-1">GSTIN Number *</label>
              <input
                type="text"
                required
                placeholder="27AAAAA0000A1Z5"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Contact Person *</label>
              <input
                type="text"
                required
                placeholder="Full Name"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Business Email *</label>
              <input
                type="email"
                required
                placeholder="partnerships@brand.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Product Categories Offered</label>
            <input
              type="text"
              placeholder="e.g. GaN Chargers, Mechanical Keyboards, Studio Mics"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider"
          >
            Submit Merchant Application
          </button>
        </form>
      ) : (
        <div className="p-10 rounded-3xl bg-slate-900/60 border border-emerald-500/30 text-center flex flex-col items-center">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">Application Received</h3>
          <p className="text-xs text-slate-300 max-w-sm mb-4">
            Our brand partnerships team will review your catalog specifications and reach out within 2 business days.
          </p>
        </div>
      )}
    </div>
  );
};

export const LegalView: React.FC<{ type: 'privacy' | 'terms' }> = ({ type }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full text-slate-300 text-xs leading-relaxed space-y-4">
      <h1 className="text-2xl font-bold text-white mb-4">
        {type === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions of Sale'}
      </h1>
      <p>
        Last updated: September 2026. KHAN Store complies fully with the Information Technology Act and Indian Digital Personal Data Protection guidelines.
      </p>
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
        <h3 className="font-bold text-white text-sm">Data Collection & Transparency</h3>
        <p>
          We only process personal information necessary for order fulfillment, dispatch verification via BlueDart / Delhivery logistics, and fraud prevention. We never sell customer records to third-party telemarketing networks.
        </p>
      </div>
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
        <h3 className="font-bold text-white text-sm">Official Warranty & Merchantability</h3>
        <p>
          All electronic equipment sold through KHAN Store is subject to original manufacturer warranty terms. Replacements are governed by our standard 7-day doorstep inspection policy.
        </p>
      </div>
    </div>
  );
};
