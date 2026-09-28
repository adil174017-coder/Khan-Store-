import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomeView } from './views/HomeView';
import { ProductsView } from './views/ProductsView';
import { ProductDetailView } from './views/ProductDetailView';
import { CartView } from './views/CartView';
import { CheckoutView } from './views/CheckoutView';
import { OrderSuccessView } from './views/OrderSuccessView';
import { OrdersView } from './views/OrdersView';
import { TrackOrderView } from './views/TrackOrderView';
import { WishlistView } from './views/WishlistView';
import { AccountView } from './views/AccountView';
import { AdminView } from './views/AdminView';
import {
  AboutView,
  ContactView,
  HelpCenterView,
  SellWithUsView,
  LegalView,
} from './views/StaticPages';
import { QuickViewModal } from './components/common/QuickViewModal';
import { AuthModal } from './components/common/AuthModal';
import { LocationModal } from './components/common/LocationModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { ToastContainer } from './components/common/ToastContainer';

const MainRouter: React.FC = () => {
  const { activePage } = useStore();

  const renderActiveView = () => {
    switch (activePage) {
      case 'home':
        return <HomeView />;
      case 'products':
        return <ProductsView />;
      case 'product-detail':
        return <ProductDetailView />;
      case 'cart':
        return <CartView />;
      case 'checkout':
        return <CheckoutView />;
      case 'order-success':
        return <OrderSuccessView />;
      case 'my-orders':
        return <OrdersView />;
      case 'track-order':
        return <TrackOrderView />;
      case 'wishlist':
        return <WishlistView />;
      case 'account':
        return <AccountView />;
      case 'admin':
        return <AdminView />;
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView />;
      case 'help':
        return <HelpCenterView />;
      case 'sell-with-us':
        return <SellWithUsView />;
      case 'privacy':
        return <LegalView type="privacy" />;
      case 'terms':
        return <LegalView type="terms" />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-cyan-500 selection:text-slate-950">
      <Header />
      <main className="flex-1 w-full">{renderActiveView()}</main>
      <Footer />

      {/* Global interactive drawers & modals */}
      <QuickViewModal />
      <AuthModal />
      <LocationModal />
      <CartDrawer />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainRouter />
    </StoreProvider>
  );
}
