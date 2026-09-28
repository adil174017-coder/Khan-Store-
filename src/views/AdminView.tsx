import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, OrderStatus, CategoryId, StoreSettings } from '../types';
import { formatINR, formatDate } from '../utils/formatters';
import {
  Layers,
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  Plus,
  Trash2,
  Edit2,
  Check,
  AlertTriangle,
  Settings,
  ArrowUpRight,
  ShieldCheck,
  BarChart3,
  X,
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const {
    products,
    orders,
    customers,
    settings,
    adminAddProduct,
    adminUpdateProduct,
    adminDeleteProduct,
    adminUpdateOrderStatus,
    adminUpdateSettings,
    navigateTo,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'products' | 'orders' | 'customers' | 'analytics' | 'settings'
  >('overview');

  // Product Add / Edit Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Product form fields
  const [formName, setFormName] = useState('');
  const [formBrand, setFormBrand] = useState('');
  const [formCategory, setFormCategory] = useState<CategoryId>('smartphones');
  const [formPrice, setFormPrice] = useState(99999);
  const [formOldPrice, setFormOldPrice] = useState(119999);
  const [formStock, setFormStock] = useState(15);
  const [formImage, setFormImage] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formBadge, setFormBadge] = useState('New Release');

  // Settings form fields
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(settings);

  // Top metrics calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalCustomers = customers.length;
  const lowStockItems = products.filter((p) => p.stock <= 5);

  const openAddModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormBrand('Apple');
    setFormCategory('smartphones');
    setFormPrice(99999);
    setFormOldPrice(119999);
    setFormStock(20);
    setFormImage(products[0]?.image || '');
    setFormDescription('Flagship tech engineering with pro components.');
    setFormBadge('New Arrival');
    setIsProductModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormBrand(p.brand);
    setFormCategory(p.category);
    setFormPrice(p.price);
    setFormOldPrice(p.oldPrice);
    setFormStock(p.stock);
    setFormImage(p.image);
    setFormDescription(p.description);
    setFormBadge(p.badge || '');
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || formPrice <= 0) {
      showToast('Please provide a valid product name and price', 'error');
      return;
    }

    const discount =
      formOldPrice > formPrice
        ? Math.round(((formOldPrice - formPrice) / formOldPrice) * 100)
        : 0;

    if (editingProduct) {
      const updated: Product = {
        ...editingProduct,
        name: formName,
        brand: formBrand,
        category: formCategory,
        price: formPrice,
        oldPrice: formOldPrice,
        discountPercent: discount,
        stock: formStock,
        image: formImage || editingProduct.image,
        description: formDescription,
        badge: formBadge,
      };
      adminUpdateProduct(updated);
    } else {
      const newProd: Product = {
        id: `prod-${Date.now()}`,
        name: formName,
        brand: formBrand,
        category: formCategory,
        price: formPrice,
        oldPrice: formOldPrice,
        discountPercent: discount,
        rating: 4.9,
        reviewCount: 1,
        stock: formStock,
        image: formImage || products[0]?.image,
        galleryImages: [formImage || products[0]?.image],
        description: formDescription,
        features: ['Precision engineered', 'Official warranty included'],
        specs: { Category: formCategory, Brand: formBrand },
        badge: formBadge,
      };
      adminAddProduct(newProd);
    }
    setIsProductModalOpen(false);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    adminUpdateSettings(storeSettings);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Admin Title & Quick Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>KHAN Store Management Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Store Administration & Inventory
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage live products, fulfill customer shipments, and monitor pan-India sales
          </p>
        </div>

        <button
          onClick={() => navigateTo('home')}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold self-start sm:self-auto"
        >
          ← Return to Storefront
        </button>
      </div>

      {/* Top 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block mb-1">Total Sales Revenue</span>
            <span className="text-2xl font-extrabold text-emerald-400 tabular-nums">
              {formatINR(totalRevenue)}
            </span>
            <span className="text-[10px] text-emerald-400 flex items-center gap-0.5 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>+18.4% this month</span>
            </span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShoppingCart className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block mb-1">Total Orders Placed</span>
            <span className="text-2xl font-extrabold text-white tabular-nums">
              {totalOrders}
            </span>
            <span className="text-[10px] text-slate-400 mt-1 block">100% fulfilled</span>
          </div>
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block mb-1">Active Catalog SKUs</span>
            <span className="text-2xl font-extrabold text-white tabular-nums">
              {totalProducts}
            </span>
            <span className="text-[10px] text-amber-400 mt-1 block">
              {lowStockItems.length} low stock alert(s)
            </span>
          </div>
          <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block mb-1">Registered Customers</span>
            <span className="text-2xl font-extrabold text-white tabular-nums">
              {totalCustomers}
            </span>
            <span className="text-[10px] text-slate-400 mt-1 block">Verified shoppers</span>
          </div>
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Admin Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 mb-6 overflow-x-auto pb-1 text-xs font-semibold">
        {[
          { id: 'overview', label: 'Store Overview', icon: BarChart3 },
          { id: 'products', label: `Products (${products.length})`, icon: Layers },
          { id: 'orders', label: `Orders (${orders.length})`, icon: Package },
          { id: 'customers', label: `Customers (${customers.length})`, icon: Users },
          { id: 'analytics', label: 'Sales Analytics', icon: TrendingUp },
          { id: 'settings', label: 'Store Settings', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Low Stock Warning Banner if any */}
          {lowStockItems.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <span className="font-bold text-amber-200 block">Inventory Replenishment Alert</span>
                  <span className="text-slate-300">
                    {lowStockItems.length} products have $\le 5$ units remaining in central warehouse.
                  </span>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('products')}
                className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold hover:bg-amber-400"
              >
                Inspect Stock
              </button>
            </div>
          )}

          {/* Recent Orders Overview */}
          <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white">Recent Customer Orders</h3>
              <button
                onClick={() => setActiveTab('orders')}
                className="text-xs text-cyan-400 hover:underline"
              >
                View All Orders →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                    <th className="pb-3 font-semibold">Order ID</th>
                    <th className="pb-3 font-semibold">Customer</th>
                    <th className="pb-3 font-semibold">Date</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {orders.slice(0, 5).map((o) => (
                    <tr key={o.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 font-mono font-bold text-cyan-400">{o.id}</td>
                      <td className="py-3 text-white font-medium">{o.shippingAddress.fullName}</td>
                      <td className="py-3 text-slate-400">{formatDate(o.date)}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-800 text-cyan-300 border border-cyan-800/40">
                          {o.status}
                        </span>
                      </td>
                      <td className="py-3 font-bold text-white text-right tabular-nums">
                        {formatINR(o.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCTS MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Live Product Catalog ({products.length})</h3>
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md shadow-cyan-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 uppercase tracking-wider text-[10px]">
                    <th className="p-3.5 font-semibold">Product</th>
                    <th className="p-3.5 font-semibold">Category</th>
                    <th className="p-3.5 font-semibold">Price</th>
                    <th className="p-3.5 font-semibold">Discount</th>
                    <th className="p-3.5 font-semibold">Stock</th>
                    <th className="p-3.5 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-3.5 flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-950 border border-slate-800 shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="font-bold text-white block truncate max-w-xs">{p.name}</span>
                          <span className="text-[10px] text-slate-400">{p.brand}</span>
                        </div>
                      </td>
                      <td className="p-3.5 capitalize text-slate-300">{p.category}</td>
                      <td className="p-3.5 font-bold text-white tabular-nums">{formatINR(p.price)}</td>
                      <td className="p-3.5 text-emerald-400 font-semibold">{p.discountPercent}%</td>
                      <td className="p-3.5">
                        <span
                          className={`font-semibold tabular-nums px-2 py-0.5 rounded text-[11px] ${
                            p.stock <= 5
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : 'text-slate-200'
                          }`}
                        >
                          {p.stock} units
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(p)}
                            className="p-1.5 text-slate-400 hover:text-cyan-400 rounded-lg hover:bg-slate-800"
                            title="Edit Product"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete "${p.name}"?`)) {
                                adminDeleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white">All Orders & Shipment Dispatch</h3>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 uppercase tracking-wider text-[10px]">
                    <th className="p-3.5 font-semibold">Order ID</th>
                    <th className="p-3.5 font-semibold">Customer & Destination</th>
                    <th className="p-3.5 font-semibold">Items</th>
                    <th className="p-3.5 font-semibold">Total</th>
                    <th className="p-3.5 font-semibold">Payment</th>
                    <th className="p-3.5 font-semibold">Manage Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-cyan-400">{o.id}</td>
                      <td className="p-3.5">
                        <span className="font-semibold text-white block">{o.shippingAddress.fullName}</span>
                        <span className="text-[11px] text-slate-400">
                          {o.shippingAddress.city}, {o.shippingAddress.pincode} ({o.shippingAddress.phone})
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-300">
                        {o.items.map((it) => it.product.name.slice(0, 20)).join(', ')}...
                      </td>
                      <td className="p-3.5 font-bold text-white tabular-nums">{formatINR(o.total)}</td>
                      <td className="p-3.5 uppercase text-[11px] text-slate-300">
                        {o.paymentMethod} ({o.paymentStatus})
                      </td>
                      <td className="p-3.5">
                        <select
                          value={o.status}
                          onChange={(e) =>
                            adminUpdateOrderStatus(o.id, e.target.value as OrderStatus)
                          }
                          className="px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-950 text-cyan-300 font-semibold text-xs focus:outline-none focus:border-cyan-500"
                        >
                          <option value="Order Placed">Order Placed</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CUSTOMERS */}
      {activeTab === 'customers' && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white">Registered Customer Database ({customers.length})</h3>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 uppercase tracking-wider text-[10px]">
                    <th className="p-3.5 font-semibold">User</th>
                    <th className="p-3.5 font-semibold">Role</th>
                    <th className="p-3.5 font-semibold">Joined Date</th>
                    <th className="p-3.5 font-semibold">Orders</th>
                    <th className="p-3.5 font-semibold text-right">Lifetime Spend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {customers.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-3.5">
                        <span className="font-semibold text-white block">{c.name}</span>
                        <span className="text-[11px] text-slate-400">{c.email}</span>
                      </td>
                      <td className="p-3.5 uppercase text-[10px] font-bold text-cyan-300">
                        {c.role}
                      </td>
                      <td className="p-3.5 text-slate-400">{c.joinedDate}</td>
                      <td className="p-3.5 font-semibold text-white tabular-nums">
                        {c.ordersCount} orders
                      </td>
                      <td className="p-3.5 font-bold text-emerald-400 text-right tabular-nums">
                        {formatINR(c.totalSpent)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800">
              <h3 className="text-sm font-bold text-white mb-4">Category Sales Distribution</h3>
              <div className="space-y-3 text-xs">
                {[
                  { cat: 'Smartphones (Titanium 5G)', pct: 45, val: 264998 },
                  { cat: 'Pro Laptops (M3 Silicon)', pct: 35, val: 319900 },
                  { cat: 'Audio Acoustics (Sony XM5)', pct: 12, val: 53980 },
                  { cat: 'Wearables & Health (Ultra)', pct: 8, val: 84900 },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>{item.cat}</span>
                      <span className="font-bold tabular-nums">{formatINR(item.val)} ({item.pct}%)</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-cyan-500 h-full rounded-full"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800">
              <h3 className="text-sm font-bold text-white mb-4">Store Operational Health</h3>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex justify-between pb-2 border-b border-slate-800">
                  <span>Average Order Value (AOV)</span>
                  <span className="font-bold text-white tabular-nums">₹1,12,845</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-800">
                  <span>Courier Delivery Success Rate</span>
                  <span className="font-bold text-emerald-400">99.4%</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-800">
                  <span>Return & RMA Request Rate</span>
                  <span className="font-bold text-cyan-400">0.8% (Well below industry 4%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Customer Satisfaction (CSAT)</span>
                  <span className="font-bold text-amber-400">4.9 / 5.0 (50k+ votes)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: SETTINGS */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl p-6 rounded-3xl bg-slate-900/50 border border-slate-800">
          <h3 className="text-sm font-bold text-white mb-4">Store Configuration</h3>
          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Store Name</label>
              <input
                type="text"
                value={storeSettings.storeName}
                onChange={(e) => setStoreSettings({ ...storeSettings, storeName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Support Email</label>
                <input
                  type="email"
                  value={storeSettings.contactEmail}
                  onChange={(e) => setStoreSettings({ ...storeSettings, contactEmail: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Support Helpline</label>
                <input
                  type="text"
                  value={storeSettings.contactPhone}
                  onChange={(e) => setStoreSettings({ ...storeSettings, contactPhone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Free Shipping Threshold (INR)
              </label>
              <input
                type="number"
                value={storeSettings.freeShippingThreshold}
                onChange={(e) =>
                  setStoreSettings({ ...storeSettings, freeShippingThreshold: Number(e.target.value) })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Top Announcement Banner Message
              </label>
              <textarea
                rows={2}
                value={storeSettings.announcementText}
                onChange={(e) =>
                  setStoreSettings({ ...storeSettings, announcementText: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors"
            >
              Save Store Configurations
            </button>
          </form>
        </div>
      )}

      {/* Product Add / Edit Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0f172a] border border-slate-700 p-6 text-slate-100 shadow-2xl">
            <button
              onClick={() => setIsProductModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-white mb-4">
              {editingProduct ? 'Edit Product Details' : 'Add New Hardware to Catalog'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Sony WH-1000XM5 Noise Cancelling"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Brand</label>
                  <input
                    type="text"
                    value={formBrand}
                    onChange={(e) => setFormBrand(e.target.value)}
                    placeholder="Apple, Sony, etc."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as CategoryId)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="smartphones">Smartphones</option>
                    <option value="laptops">Laptops</option>
                    <option value="audio">Audio</option>
                    <option value="smartwatches">Smartwatches</option>
                    <option value="gaming">Gaming</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">MRP / Old Price (₹)</label>
                  <input
                    type="number"
                    value={formOldPrice}
                    onChange={(e) => setFormOldPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Units in Stock</label>
                  <input
                    type="number"
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Badge Tag</label>
                <input
                  type="text"
                  value={formBadge}
                  onChange={(e) => setFormBadge(e.target.value)}
                  placeholder="e.g. Flash Deal, Top Rated, Pro Tier"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold"
                >
                  {editingProduct ? 'Update Product' : 'Add to Catalog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
