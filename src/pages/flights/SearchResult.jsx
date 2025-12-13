import React, { useState } from 'react';
import { 
  FiSearch, FiPhone, FiMail, FiShare2, FiFilter, FiChevronDown, 
  FiCalendar, FiArrowRight 
} from 'react-icons/fi';
import { FaWhatsapp, FaApple, FaGooglePlay } from 'react-icons/fa';
import FlightCard from '../../components/flights/FlightCard';
import Button from '../../components/common/Button';

// --- MOCK DATA ---
const FLIGHTS = [
  {
    id: 1,
    airline: 'PIA',
    logo: 'https://d1fugymezotnfx.cloudfront.net/feature-partner/PK.webp', // Real CDN Logo
    flightNumber: 'PK-452 (L)',
    originCode: 'KDU',
    destinationCode: 'ISB',
    departureTime: '09:30 AM',
    arrivalTime: '10:30 AM',
    duration: '1h',
    stops: 'Nonstop',
    price: 18900,
    hasMeal: true
  },
  {
    id: 2,
    airline: 'Airblue',
    logo: 'https://d1fugymezotnfx.cloudfront.net/feature-partner/PA.webp', // Real CDN Logo
    flightNumber: 'PA-202',
    originCode: 'KDU',
    destinationCode: 'ISB',
    departureTime: '11:45 AM',
    arrivalTime: '12:45 PM',
    duration: '1h',
    stops: 'Nonstop',
    price: 22500,
    hasMeal: false
  }
];

const DATES = [
  { day: 'Wed', date: '14 Jan', price: '21,290' },
  { day: 'Thu', date: '15 Jan', price: '-' },
  { day: 'Fri', date: '16 Jan', price: '18,900', active: true },
  { day: 'Sat', date: '17 Jan', price: '20,670' },
  { day: 'Sun', date: '18 Jan', price: '20,670' },
  { day: 'Mon', date: '19 Jan', price: '19,570' },
  { day: 'Tue', date: '20 Jan', price: '-' },
];

const SearchResult = () => {
  return (
    <div className="bg-[#F4F7FA] min-h-screen pt-[72px] pb-12">
       
       {/* =======================
           1. STICKY SEARCH HEADER
       ======================= */}
       <div className="bg-white border-b border-gray-200 sticky top-[72px] z-30 shadow-sm">
          <div className="max-w-[1140px] mx-auto px-4 py-4">
             {/* Desktop Compact Search */}
             <div className="hidden md:flex items-center gap-3">
                
                {/* Inputs */}
                <div className="flex-1 flex items-center border border-gray-300 rounded-lg overflow-hidden h-12">
                   <div className="flex-1 flex items-center px-4 border-r border-gray-200 bg-white">
                      <span className="font-bold text-[#1A2B49] text-sm truncate">Skardu (KDU)</span>
                   </div>
                   <div className="bg-gray-50 px-2 text-gray-400">
                      <FiArrowRight size={14} />
                   </div>
                   <div className="flex-1 flex items-center px-4 border-r border-gray-200 bg-white">
                      <span className="font-bold text-[#1A2B49] text-sm truncate">Islamabad (ISB)</span>
                   </div>
                   <div className="w-[180px] flex items-center px-4 border-r border-gray-200 bg-white gap-2">
                      <FiCalendar className="text-gray-400" />
                      <span className="font-bold text-[#1A2B49] text-sm">16 Jan, 2026</span>
                   </div>
                   <div className="w-[180px] flex items-center px-4 bg-gray-50 text-gray-400 text-sm font-medium">
                      Returning
                   </div>
                </div>

                {/* Pills */}
                <div className="flex gap-2">
                   <span className="bg-blue-50 text-[#005494] text-xs font-bold px-3 py-1.5 rounded-full border border-blue-100">One Way</span>
                   <span className="text-gray-500 text-xs font-bold px-3 py-1.5">1 Adult</span>
                   <span className="text-gray-500 text-xs font-bold px-3 py-1.5">Economy</span>
                </div>

                <Button className="h-12 px-8 !rounded-lg flex items-center gap-2">
                   <FiSearch /> Search
                </Button>
             </div>

             {/* Mobile Summary Header */}
             <div className="md:hidden flex items-center justify-between">
                <div>
                   <div className="flex items-center gap-2 text-[#1A2B49] font-bold">
                      KDU <FiArrowRight size={12} /> ISB
                   </div>
                   <div className="text-xs text-gray-500">
                      16 Jan • 1 Traveler • Economy
                   </div>
                </div>
                <button className="bg-blue-50 p-2 rounded-lg text-[#005494]">
                   <FiSearch />
                </button>
             </div>
          </div>
       </div>

       <div className="max-w-[1140px] mx-auto px-4 mt-6">
          <div className="flex flex-col lg:flex-row gap-6">
             
             {/* =======================
                 LEFT COLUMN: RESULTS
             ======================= */}
             <div className="flex-1">
                
                {/* 2. DATE STRIP */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 overflow-hidden">
                   <div className="flex overflow-x-auto no-scrollbar divide-x divide-gray-100">
                      {DATES.map((d, i) => (
                         <button 
                           key={i} 
                           className={`flex-shrink-0 w-28 py-3 flex flex-col items-center justify-center transition-colors
                             ${d.active ? 'bg-blue-50/50' : 'hover:bg-gray-50 bg-white'}`}
                         >
                            <span className={`text-xs font-medium mb-1 ${d.active ? 'text-[#005494]' : 'text-gray-500'}`}>{d.day}, {d.date}</span>
                            <span className={`text-xs font-bold ${d.active ? 'text-[#005494]' : 'text-gray-800'}`}>
                               {d.price !== '-' ? `PKR ${d.price}` : '-'}
                            </span>
                            {d.active && <div className="h-1 w-full bg-[#005494] absolute bottom-0 rounded-t-full max-w-[60px]" />}
                         </button>
                      ))}
                   </div>
                </div>

                {/* 3. FILTERS BAR */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                   <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-100">
                      <button className="px-4 py-1.5 text-xs font-bold bg-[#EBF5FF] text-[#005494] rounded-md shadow-sm">Suggested</button>
                      <button className="px-4 py-1.5 text-xs font-bold text-gray-500 hover:text-gray-700">Cheapest</button>
                      <button className="px-4 py-1.5 text-xs font-bold text-gray-500 hover:text-gray-700">Fastest</button>
                   </div>
                   
                   <div className="flex items-center gap-3">
                      <button className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded-full text-xs font-bold text-gray-600 hover:border-[#005494] transition-colors">
                         Nonstop
                      </button>
                      <button className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded-full text-xs font-bold text-gray-600 hover:border-[#005494] transition-colors">
                         More Filters <FiChevronDown />
                      </button>
                   </div>
                </div>

                {/* 4. FLIGHT CARDS */}
                <div className="space-y-4">
                   <div className="text-sm font-bold text-[#1A2B49] mb-2">
                      Select your departing flight to Islamabad
                   </div>
                   
                   {FLIGHTS.map((flight) => (
                      <FlightCard key={flight.id} flight={flight} />
                   ))}
                </div>

             </div>

             {/* =======================
                 RIGHT COLUMN: SIDEBAR
             ======================= */}
             <div className="w-full lg:w-[300px] space-y-4">
                
                {/* Support Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
                   <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3 text-[#005494]">
                      <FiPhone size={24} />
                   </div>
                   <h3 className="font-bold text-[#1A2B49] mb-6">24/7 Customer Support</h3>
                   
                   <div className="space-y-4 text-left">
                      <div className="flex items-center gap-3">
                         <FiPhone className="text-[#005494]" />
                         <span className="text-sm font-bold text-gray-600">(05815) 551456</span>
                      </div>
                      <div className="flex items-center gap-3">
                         <FaWhatsapp className="text-[#005494]" />
                         <span className="text-sm font-bold text-gray-600">+92 355 5118812</span>
                      </div>
                      <div className="flex items-center gap-3">
                         <FiMail className="text-[#005494]" />
                         <span className="text-sm font-bold text-gray-600">hello@divinefly.pk</span>
                      </div>
                   </div>
                </div>

                {/* Share Button */}
                <button className="w-full bg-white border border-[#005494] text-[#005494] font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors">
                   <FiShare2 /> Share Search Results
                </button>

                {/* App Promo */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col gap-4">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-16 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=100" alt="App" className="w-full h-full object-cover" />
                      </div>
                      <div>
                         <h4 className="font-bold text-[#1A2B49] text-sm">Don't miss out!</h4>
                         <p className="text-xs text-gray-500 mt-1">Use code <span className="font-bold text-[#005494]">WELCOME</span> for PKR 500 off.</p>
                      </div>
                   </div>
                   <div className="flex gap-2">
                      <button className="flex-1 bg-black text-white py-1.5 rounded flex items-center justify-center gap-1">
                         <FaApple size={14} /> <span className="text-[10px] font-bold">App Store</span>
                      </button>
                      <button className="flex-1 bg-black text-white py-1.5 rounded flex items-center justify-center gap-1">
                         <FaGooglePlay size={12} /> <span className="text-[10px] font-bold">Google Play</span>
                      </button>
                   </div>
                </div>

             </div>

          </div>
       </div>
    </div>
  );
};

export default SearchResult;