import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  FiBriefcase, FiClock, FiCreditCard, FiLogOut, FiUser, FiSettings, FiCamera 
} from 'react-icons/fi';
import { PiMedalBold } from 'react-icons/pi';

const AccountLayout = () => {
  const navigate = useNavigate();

  // Mock User Data (In a real app, get this from Context/Redux)
  const user = {
    name: 'Syed Mujtaba Abbas',
    email: 'Add Email',
    phone: '+92 355 5118812',
    avatar: null // null shows initials
  };

  const handleLogout = () => {
    // Implement logout logic here
    navigate('/');
  };

  const navLinks = [
    { name: 'Bookings', path: '/account/bookings', icon: FiBriefcase },
    { name: 'Purchase History', path: '/account/history', icon: FiClock },
    { name: 'Divine Wallet', path: '/account/wallet', icon: FiCreditCard },
    { name: 'Divine Rewards', path: '/account/rewards', icon: PiMedalBold },
    { name: 'Edit Profile', path: '/account/profile', icon: FiSettings },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7FA] pt-24 pb-12">
      <div className="max-w-[1140px] mx-auto px-4">
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* =======================
              SIDEBAR (Desktop) / TABS (Mobile)
          ======================= */}
          <aside className="w-full lg:w-[280px] flex-shrink-0">
            
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-[#005494] to-[#003366] opacity-10"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto bg-[#005494] rounded-full flex items-center justify-center text-white text-3xl font-bold mb-3 shadow-lg border-4 border-white relative">
                  {user.name.charAt(0)}
                  <button className="absolute bottom-0 right-0 bg-gray-100 text-gray-600 p-1.5 rounded-full hover:bg-gray-200 transition-colors">
                    <FiCamera size={12} />
                  </button>
                </div>
                <h2 className="font-bold text-[#1A2B49] text-lg leading-tight">{user.name}</h2>
                <button className="text-xs text-[#005494] font-medium hover:underline mt-1 flex items-center justify-center gap-1 mx-auto">
                   {user.email} <FiBriefcase size={10} />
                </button>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Mobile: Horizontal Scroll */}
              <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible no-scrollbar">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-5 py-4 text-sm font-medium transition-all whitespace-nowrap lg:whitespace-normal border-b lg:border-b-0 lg:border-l-4 border-gray-50
                      ${isActive 
                        ? 'bg-blue-50/50 text-[#005494] border-[#005494]' 
                        : 'text-gray-600 hover:bg-gray-50 border-transparent hover:text-[#005494]'
                      }
                    `}
                  >
                    <link.icon size={18} />
                    {link.name}
                  </NavLink>
                ))}
                
                {/* Logout Button */}
                <button 
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-3 px-5 py-4 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors border-l-4 border-transparent"
                >
                  <FiLogOut size={18} />
                  Logout
                </button>
              </div>
            </nav>

          </aside>

          {/* =======================
              MAIN CONTENT AREA
          ======================= */}
          <main className="flex-1">
             {/* This is where the child pages (Bookings, Wallet, etc.) will render */}
             <Outlet />
          </main>

        </div>
      </div>
    </div>
  );
};

export default AccountLayout;