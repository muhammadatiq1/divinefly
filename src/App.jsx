import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import SearchResult from './pages/flights/SearchResult';
import FlightCheckout from './pages/flights/FlightCheckout';
import AccountLayout from './components/layout/AccountLayout';
import Bookings from './pages/account/Bookings';
import PurchaseHistory from './pages/account/PurchaseHistory';
import DivineWallet from './pages/account/DivineWallet';
import DivineRewards from './pages/account/DivineRewards';
import ProfileSettings from './pages/account/ProfileSettings';

// Placeholder Pages (We will build these next)
const Login = () => <div className="pt-32 min-h-screen text-center"><h1 className="text-2xl mt-10">Login Page Coming Soon</h1></div>;
const Tours = () => <div className="pt-32 min-h-screen text-center"><h1 className="text-2xl mt-10">Tours Listing Coming Soon</h1></div>;

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans bg-brand-light">
        {/* Navigation Bar */}
        <Navbar />
        
        {/* Main Content Area */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/login" element={<Login />} />
            <Route path="/flights/search" element={<SearchResult />} />
            <Route path="/flights/checkout" element={<FlightCheckout />} />
            {/* Account Routes */}
            <Route path="/account" element={<AccountLayout />}>
              <Route index element={<Bookings />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="history" element={<PurchaseHistory />} />
              <Route path="wallet" element={<DivineWallet />} />
              <Route path="rewards" element={<DivineRewards />} />
              <Route path="profile" element={<ProfileSettings />} />
            </Route>
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;