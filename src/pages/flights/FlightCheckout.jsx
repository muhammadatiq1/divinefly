import React, { useState } from 'react';
import { FiCalendar, FiClock, FiUser, FiInfo, FiCheckCircle, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { FaPlane } from 'react-icons/fa';
import Button from '../../components/common/Button';

const FlightCheckout = () => {
  // Collapsible Flight Details State
  const [isFlightOpen, setIsFlightOpen] = useState(true);

  return (
    <div className="bg-[#F4F7FA] min-h-screen pt-24 pb-12">
      <div className="max-w-[1140px] mx-auto px-4">
        
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-[#1A2B49] mb-6">Review & Book</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* =======================
              LEFT COLUMN: FORMS
          ======================= */}
          <div className="flex-1 space-y-6">
            
            {/* 1. FLIGHT SUMMARY CARD */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
               <div 
                 className="flex items-center justify-between p-5 cursor-pointer bg-gray-50 border-b border-gray-100"
                 onClick={() => setIsFlightOpen(!isFlightOpen)}
               >
                  <div className="flex items-center gap-3">
                     <span className="bg-[#EBF5FF] text-[#005494] text-xs font-bold px-2 py-1 rounded">DEPARTURE</span>
                     <span className="font-bold text-[#1A2B49]">Islamabad - Skardu</span>
                     <span className="text-sm text-gray-500">• Fri, 16 Jan 2026</span>
                  </div>
                  {isFlightOpen ? <FiChevronUp /> : <FiChevronDown />}
               </div>

               {isFlightOpen && (
                 <div className="p-6">
                    <div className="flex gap-4">
                       {/* Airline Logo */}
                       <div className="flex flex-col items-center gap-1 min-w-[60px]">
                          <img src="https://d1fugymezotnfx.cloudfront.net/feature-partner/PK.webp" alt="PIA" className="w-10 h-10 object-contain" />
                          <span className="text-[10px] text-gray-500">PK-452</span>
                       </div>

                       {/* Timeline */}
                       <div className="flex-1 relative pl-4 border-l-2 border-dashed border-gray-200 ml-2 space-y-6 pb-2">
                          {/* Origin */}
                          <div className="relative">
                             <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-white border-2 border-[#005494]"></div>
                             <div className="flex items-baseline gap-2">
                                <span className="text-lg font-bold text-[#1A2B49]">09:30</span>
                                <span className="font-bold text-gray-600">Islamabad (ISB)</span>
                             </div>
                             <p className="text-xs text-gray-500">Islamabad International Airport</p>
                          </div>

                          {/* Duration Badge */}
                          <div className="w-fit bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full flex items-center gap-1 my-2">
                             <FiClock size={12} /> 1h 00m
                          </div>

                          {/* Destination */}
                          <div className="relative">
                             <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-[#005494]"></div>
                             <div className="flex items-baseline gap-2">
                                <span className="text-lg font-bold text-[#1A2B49]">10:30</span>
                                <span className="font-bold text-gray-600">Skardu (KDU)</span>
                             </div>
                             <p className="text-xs text-gray-500">Skardu Airport</p>
                          </div>
                       </div>
                    </div>
                 </div>
               )}
            </div>

            {/* 2. SIGN IN PROMO (If not logged in) */}
            <div className="bg-[#EBF5FF] border border-blue-100 rounded-xl p-5 flex items-center gap-4">
               <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#005494]">
                  <FiUser />
               </div>
               <div>
                  <h4 className="font-bold text-[#1A2B49] text-sm">Log in to earn Divine Points</h4>
                  <p className="text-xs text-gray-600">Get 50 points on this booking by logging in.</p>
               </div>
               <button className="ml-auto text-sm font-bold text-[#005494] hover:underline">Login</button>
            </div>

            {/* 3. TRAVELER DETAILS FORM */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
               <h3 className="font-bold text-[#1A2B49] mb-4 flex items-center gap-2">
                  <FiUser className="text-[#005494]" /> Traveler 1 (Adult)
               </h3>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                     <label className="block text-xs font-bold text-gray-500 mb-1">First Name</label>
                     <input type="text" placeholder="e.g. Syed" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#005494]" />
                  </div>
                  <div>
                     <label className="block text-xs font-bold text-gray-500 mb-1">Last Name</label>
                     <input type="text" placeholder="e.g. Mujtaba" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#005494]" />
                  </div>
                  <div>
                     <label className="block text-xs font-bold text-gray-500 mb-1">Date of Birth</label>
                     <input type="date" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#005494]" />
                  </div>
                  <div>
                     <label className="block text-xs font-bold text-gray-500 mb-1">CNIC / Passport</label>
                     <input type="text" placeholder="XXXXX-XXXXXXX-X" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#005494]" />
                  </div>
               </div>
            </div>

            {/* 4. CONTACT DETAILS */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
               <h3 className="font-bold text-[#1A2B49] mb-4">Contact Details</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                     <label className="block text-xs font-bold text-gray-500 mb-1">Email Address</label>
                     <input type="email" placeholder="name@example.com" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#005494]" />
                     <p className="text-[10px] text-gray-400 mt-1">Your ticket will be sent here.</p>
                  </div>
                  <div>
                     <label className="block text-xs font-bold text-gray-500 mb-1">Mobile Number</label>
                     <input type="tel" placeholder="+92 300 1234567" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#005494]" />
                  </div>
               </div>
            </div>

            {/* 5. CONTINUE BUTTON (Mobile Only - usually sticky bottom, but here inline for simplicity) */}
            <div className="lg:hidden">
               <Button className="w-full !bg-[#005494] !py-4 font-bold rounded-lg shadow-lg">
                  Continue to Payment
               </Button>
            </div>

          </div>

          {/* =======================
              RIGHT COLUMN: SUMMARY (Sticky)
          ======================= */}
          <div className="w-full lg:w-[360px] space-y-6">
             
             {/* Price Breakdown */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <h3 className="font-bold text-[#1A2B49] text-lg mb-4">Price Summary</h3>
                
                <div className="space-y-3 mb-4 pb-4 border-b border-gray-100 text-sm">
                   <div className="flex justify-between text-gray-600">
                      <span>Base Fare (1 Traveler)</span>
                      <span>PKR 14,500</span>
                   </div>
                   <div className="flex justify-between text-gray-600">
                      <span>Taxes & Fees</span>
                      <span>PKR 4,400</span>
                   </div>
                   <div className="flex justify-between text-green-600 font-medium">
                      <span>Discount</span>
                      <span>- PKR 0</span>
                   </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                   <span className="font-bold text-[#1A2B49] text-lg">Total</span>
                   <span className="font-bold text-[#005494] text-xl">PKR 18,900</span>
                </div>

                {/* Promo Code Input */}
                <div className="flex gap-2 mb-6">
                   <input 
                     type="text" 
                     placeholder="Promo Code" 
                     className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#005494] uppercase" 
                   />
                   <button className="bg-gray-100 text-gray-600 font-bold px-4 py-2 rounded-lg text-sm hover:bg-gray-200">
                      Apply
                   </button>
                </div>

                <Button className="w-full !bg-[#005494] hover:!bg-[#004080] !py-3 font-bold rounded-lg shadow-md transition-all">
                   Continue to Payment
                </Button>

                <div className="flex items-center gap-2 justify-center mt-4 text-xs text-gray-400">
                   <FiCheckCircle className="text-green-500" />
                   <span>Secure Payment Guaranteed</span>
                </div>
             </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default FlightCheckout;