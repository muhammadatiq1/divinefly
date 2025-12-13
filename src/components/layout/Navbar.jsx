import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FiMenu, FiX, FiSearch, FiPhone, FiUser, FiChevronDown, FiMapPin, 
  FiLogOut, FiBriefcase, FiEdit2, FiSettings 
} from 'react-icons/fi';
import { FaWhatsapp, FaHandshake, FaWallet } from 'react-icons/fa';
import { PiAirplaneTiltBold, PiBusBold, PiMedalBold } from 'react-icons/pi';
import logo from '../../assets/logo.png'; 
import LoginPopup from '../auth/LoginPopup';

const Navbar = () => {
  const navigate = useNavigate();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); 
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  // --- USER STATE ---
  const [user, setUser] = useState(null); 

  const [selectedCurrency, setSelectedCurrency] = useState({ code: 'PKR', country: 'pk' });
  
  const currencyRef = useRef(null);
  const userMenuRef = useRef(null); 

  // Click Outside Logic
  useEffect(() => {
    function handleClickOutside(event) {
      if (currencyRef.current && !currencyRef.current.contains(event.target)) {
        setIsCurrencyOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isSideMenuOpen ? 'hidden' : 'unset';
  }, [isSideMenuOpen]);

  const currencies = [
    { code: 'PKR', country: 'pk', name: 'Pakistan Rupee' },
    { code: 'AED', country: 'ae', name: 'UAE Dirham' },
    { code: 'USD', country: 'us', name: 'US Dollar' },
    { code: 'SAR', country: 'sa', name: 'Saudi Riyal' },
    { code: 'GBP', country: 'gb', name: 'British Pound' },
  ];

  const handleCurrencySelect = (curr) => {
    setSelectedCurrency(curr);
    setIsCurrencyOpen(false);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsUserMenuOpen(false);
    setIsSideMenuOpen(false);
    navigate('/');
  };

  return (
    <>
      {/* =======================
          MAIN NAVBAR
      ======================= */}
      <nav className="bg-white shadow-sm fixed w-full z-50 top-0 h-[72px] border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            
            {/* LEFT: Hamburger + Logo */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSideMenuOpen(true)} 
                className="text-[#005494] hover:bg-blue-50 p-2 -ml-2 rounded-full transition-colors"
              >
                <FiMenu size={28} />
              </button>
              
              <Link to="/" className="flex items-center">
                <img className="h-20 w-auto object-contain" src={logo} alt="Divine Fly" />
              </Link>
            </div>

            {/* RIGHT: Utilities (Desktop) */}
            <div className="hidden lg:flex items-center gap-8">
              
              <Link to="/tours" className="flex items-center gap-2 text-[#005494] font-semibold hover:opacity-80">
                <FiSearch size={20} />
                <span>Search Bookings</span>
              </Link>

              <a href="tel:05815551456" className="flex items-center gap-3 group">
                <FiPhone size={22} className="text-[#005494]" />
                <div className="flex flex-col leading-none">
                  <span className="text-[11px] text-gray-500 font-medium mb-1">Call 24/7</span>
                  <span className="text-sm font-bold text-[#005494] group-hover:underline">05815-551456</span>
                </div>
              </a>

              <a href="https://wa.me/923555118812" target="_blank" rel="noreferrer" className="flex items-center gap-3 group">
                <FaWhatsapp size={24} className="text-[#005494]" />
                <div className="flex flex-col leading-none">
                  <span className="text-[11px] text-gray-500 font-medium mb-1">WhatsApp 24/7</span>
                  <span className="text-sm font-bold text-[#005494] group-hover:underline">0355-5118812</span>
                </div>
              </a>

              {/* Currency Dropdown */}
              <div className="relative" ref={currencyRef}>
                <button onClick={() => setIsCurrencyOpen(!isCurrencyOpen)} className="flex items-center gap-2 text-brand-black font-semibold hover:text-[#005494] transition-colors text-sm border border-transparent hover:border-gray-100 rounded px-2 py-1">
                  <img src={`https://flagcdn.com/w40/${selectedCurrency.country}.png`} alt={selectedCurrency.code} className="w-5 h-auto rounded-[2px] shadow-sm object-cover" />
                  <span>{selectedCurrency.code}</span>
                  <FiChevronDown size={16} className={`transition-transform duration-200 ${isCurrencyOpen ? 'rotate-180' : ''}`} />
                </button>
                {isCurrencyOpen && (
                  <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-lg shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-1 z-50">
                    {currencies.map((curr) => (
                      <button key={curr.code} onClick={() => handleCurrencySelect(curr)} className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-blue-50 transition-colors text-left group">
                        <img src={`https://flagcdn.com/w40/${curr.country}.png`} alt={curr.code} className="w-5 h-auto rounded-[2px] shadow-sm object-cover group-hover:scale-110 transition-transform" />
                        <span className={`text-sm font-bold ${selectedCurrency.code === curr.code ? 'text-[#005494]' : 'text-gray-700'}`}>{curr.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* USER LOGIN STATE (DESKTOP) */}
              {user ? (
                <div className="relative" ref={userMenuRef}>
                   <button 
                     onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                     className="flex items-center gap-2 cursor-pointer hover:opacity-80 border border-transparent hover:border-gray-100 rounded-full pr-2 py-1 transition-all"
                   >
                     <div className="w-9 h-9 rounded-full bg-[#005494] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                       {user.name.charAt(0)}
                     </div>
                     <div className="flex flex-col items-start">
                       <span className="text-[#005494] font-bold text-sm leading-tight">{user.name.split(' ')[0]}</span>
                     </div>
                     <FiChevronDown className={`text-[#005494] transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                   </button>

                   {/* USER DROPDOWN MENU */}
                   {isUserMenuOpen && (
                     <div className="absolute top-full right-0 mt-3 w-56 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 z-50 overflow-hidden">
                        
                        <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                           <p className="text-sm font-bold text-gray-800">{user.name}</p>
                           <p className="text-xs text-gray-500">{user.phone}</p>
                        </div>

                        <div className="py-1">
                           <DropdownItem to="/account/bookings" icon={FiBriefcase} label="Bookings" onClick={() => setIsUserMenuOpen(false)} />
                           <DropdownItem to="/account/profile" icon={FiEdit2} label="Edit Profile" onClick={() => setIsUserMenuOpen(false)} />
                           <DropdownItem to="/account/wallet" icon={FaWallet} label="Divine Wallet" onClick={() => setIsUserMenuOpen(false)} />
                           <DropdownItem to="/account/rewards" icon={PiMedalBold} label="Divine Rewards" onClick={() => setIsUserMenuOpen(false)} />
                        </div>
                        
                        <div className="border-t border-gray-100 mt-1 pt-1">
                           <button 
                             onClick={handleLogout}
                             className="w-full text-left px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors flex items-center gap-3"
                           >
                             <FiLogOut size={16} /> Logout
                           </button>
                        </div>
                     </div>
                   )}
                </div>
              ) : (
                <button 
                  onClick={() => setIsLoginOpen(true)}
                  className="flex items-center gap-2 text-[#005494] font-bold text-sm hover:opacity-80"
                >
                  <FiUser size={22} />
                  <span>Sign In</span>
                </button>
              )}
            </div>

            {/* Mobile Icons */}
            <div className="lg:hidden flex items-center gap-5">
               <a href="https://wa.me/923555118812" target="_blank" rel="noreferrer" className="text-[#005494]">
                 <FaWhatsapp size={24} />
               </a>
               <button onClick={() => !user && setIsLoginOpen(true)} className="text-[#005494]">
                  {user ? (
                    <div className="w-8 h-8 rounded-full bg-[#005494] text-white flex items-center justify-center font-bold text-sm" onClick={() => setIsSideMenuOpen(true)}>
                      {user.name.charAt(0)}
                    </div>
                  ) : (
                    <FiUser size={24} />
                  )}
               </button>
            </div>
          </div>
        </div>
      </nav>

      {/* =======================
          SIDE DRAWER (MOBILE)
      ======================= */}
      {isSideMenuOpen && (
        <div className="fixed inset-0 z-[60]" onClick={() => setIsSideMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>
      )}

      <div className={`fixed top-0 left-0 h-full w-[300px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${isSideMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Drawer Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
           {user ? (
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#005494] text-white flex items-center justify-center font-bold text-xl">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-[#1A2B49]">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.phone}</div>
                </div>
             </div>
           ) : (
             <img className="h-16 w-auto object-contain" src={logo} alt="Divine Fly" />
           )}
           
           <button onClick={() => setIsSideMenuOpen(false)} className="text-gray-400 hover:text-[#005494]">
             <FiX size={24} />
           </button>
        </div>

        {/* Drawer Links */}
        <div className="py-2 overflow-y-auto h-[calc(100%-80px)]">
          {user && (
            <div className="mb-2 pb-2 border-b border-gray-100">
               <div className="px-6 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">My Account</div>
               <MenuItem to="/account/bookings" icon={FiBriefcase} label="Bookings" onClick={() => setIsSideMenuOpen(false)} />
               <MenuItem to="/account/profile" icon={FiEdit2} label="Edit Profile" onClick={() => setIsSideMenuOpen(false)} />
               <MenuItem to="/account/wallet" icon={FaWallet} label="Divine Wallet" onClick={() => setIsSideMenuOpen(false)} />
               <MenuItem to="/account/rewards" icon={PiMedalBold} label="Divine Rewards" onClick={() => setIsSideMenuOpen(false)} />
            </div>
          )}

          <div className="px-6 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider mt-2">Services</div>
          <MenuItem to="/" icon={PiAirplaneTiltBold} label="Flights" active onClick={() => setIsSideMenuOpen(false)} />
          <MenuItem to="/bus" icon={PiBusBold} label="Buses" onClick={() => setIsSideMenuOpen(false)} />
          
          <div className="px-6 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider mt-4">Support</div>
          <MenuItem to="/branches" icon={FiMapPin} label="Our Branches" onClick={() => setIsSideMenuOpen(false)} />
          <MenuItem to="/partner" icon={FaHandshake} label="Partner With Us" onClick={() => setIsSideMenuOpen(false)} />

          <div className="mt-4 pt-2 border-t border-gray-100">
            {user ? (
              <button onClick={handleLogout} className="w-full flex items-center gap-4 px-6 py-4 text-red-500 hover:bg-red-50 transition-colors font-medium">
                <FiLogOut size={20} />
                <span>Logout</span>
              </button>
            ) : (
              <button 
                onClick={() => { setIsSideMenuOpen(false); setIsLoginOpen(true); }} 
                className="w-full flex items-center gap-4 px-6 py-4 text-brand-black hover:text-[#005494] transition-colors"
              >
                <FiUser size={20} />
                <span className="font-medium">Login / Signup</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <LoginPopup 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLogin={handleLoginSuccess}
      />
    </>
  );
};

// --- HELPER COMPONENTS (Now with Link support) ---

const MenuItem = ({ icon: Icon, label, active = false, onClick, to }) => {
  if (to) {
    return (
      <Link 
        to={to} 
        onClick={onClick}
        className={`w-full flex items-center gap-4 px-6 py-3.5 transition-colors 
          ${active ? 'text-[#005494] font-bold bg-blue-50/50' : 'text-gray-600 font-medium hover:bg-gray-50 hover:text-[#005494]'}`}
      >
        <Icon size={20} className={active ? "text-[#005494]" : "text-gray-400 group-hover:text-[#005494]"} />
        <span>{label}</span>
      </Link>
    );
  }
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-6 py-3.5 transition-colors 
        ${active ? 'text-[#005494] font-bold bg-blue-50/50' : 'text-gray-600 font-medium hover:bg-gray-50 hover:text-[#005494]'}`}
    >
      <Icon size={20} className={active ? "text-[#005494]" : "text-gray-400 group-hover:text-[#005494]"} />
      <span>{label}</span>
    </button>
  );
};

const DropdownItem = ({ icon: Icon, label, onClick, to }) => (
  <Link 
    to={to}
    onClick={onClick}
    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#005494] transition-colors flex items-center gap-3 group"
  >
    <Icon size={16} className="text-gray-400 group-hover:text-[#005494] transition-colors" />
    <span className="font-medium">{label}</span>
  </Link>
);

export default Navbar;