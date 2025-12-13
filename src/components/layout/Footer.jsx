import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaCcVisa, FaCcMastercard } from 'react-icons/fa';
import { SiNorton } from 'react-icons/si'; 

// Import Local Images
import jazzcashLogo from '../../assets/images/jazzcash.png';
import easypaisaLogo from '../../assets/images/easypaisa.png';

const Footer = () => {
  return (
    <footer className="bg-white pt-10 border-t border-gray-200 text-sm font-sans">
      
      {/* =========================================
          1. SUBSCRIBE SECTION
      ========================================= */}
      <div className="max-w-[1140px] mx-auto px-4 pb-10 border-b border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
             <h3 className="text-xl font-bold text-gray-800 mb-1">Be the first one to get the deal.</h3>
             <p className="text-gray-500 text-sm">Subscribe now to know about our new deals, offers and travel prices</p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
             <input 
               type="email" 
               placeholder="Enter Email" 
               className="border border-gray-300 rounded px-4 py-2 w-full md:w-[350px] outline-none focus:border-[#005494] transition-colors"
             />
             <button className="bg-[#005494] text-white font-bold px-8 py-2 rounded hover:bg-[#004080] transition-colors shadow-md">
               Subscribe
             </button>
          </div>
        </div>
      </div>

      {/* =========================================
          2. LINKS COLUMNS
      ========================================= */}
      <div className="max-w-[1140px] mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-600">
        
        {/* COLUMN 1: Top Airlines */}
        <div>
           <h4 className="font-bold text-gray-800 mb-4">Top Airlines</h4>
           
           <h5 className="font-bold text-gray-700 text-xs mb-2">Domestic</h5>
           <ul className="space-y-2 text-xs mb-4">
             <li><a href="#" className="hover:text-[#005494]">Air Blue</a></li>
             <li><a href="#" className="hover:text-[#005494]">Air Sial</a></li>
             <li><a href="#" className="hover:text-[#005494]">Pakistan International Airways</a></li>
             <li><a href="#" className="hover:text-[#005494]">K2 Airways</a></li>
             <li><a href="#" className="hover:text-[#005494]">Serene Airways</a></li>
             <li><a href="#" className="hover:text-[#005494]">Fly Jinnah</a></li>
           </ul>

           <h5 className="font-bold text-gray-700 text-xs mb-2">International</h5>
           <ul className="space-y-2 text-xs">
             <li><a href="#" className="hover:text-[#005494]">Air Arabia</a></li>
             <li><a href="#" className="hover:text-[#005494]">Emirates</a></li>
             <li><a href="#" className="hover:text-[#005494]">Etihad Airways</a></li>
             <li><a href="#" className="hover:text-[#005494]">Fly Dubai</a></li>
             <li><a href="#" className="hover:text-[#005494]">Qatar Airways</a></li>
             <li><a href="#" className="hover:text-[#005494]">Saudia Arabian Airline</a></li>
             <li><a href="#" className="hover:text-[#005494]">Turkish Airlines</a></li>
           </ul>
        </div>

        {/* COLUMN 2: Popular Flight Routes */}
        <div>
           <h4 className="font-bold text-gray-800 mb-4">Popular Flight Routes</h4>
           <div className="grid grid-cols-2 gap-4">
             <div>
                <h5 className="font-bold text-gray-700 text-xs mb-2">Domestic</h5>
                <ul className="space-y-2 text-xs">
                  <li><a href="#" className="hover:text-[#005494]">Karachi to Islamabad</a></li>
                  <li><a href="#" className="hover:text-[#005494]">Karachi to Lahore</a></li>
                  <li><a href="#" className="hover:text-[#005494]">Islamabad to Karachi</a></li>
                  <li><a href="#" className="hover:text-[#005494]">Lahore to Islamabad</a></li>
                  <li><a href="#" className="hover:text-[#005494]">Lahore to Karachi</a></li>
                  <li><a href="#" className="hover:text-[#005494]">Karachi to Peshawar</a></li>
                  <li><a href="#" className="hover:text-[#005494]">Karachi to Faisalabad</a></li>
                </ul>
             </div>
             <div>
                <h5 className="font-bold text-gray-700 text-xs mb-2">International</h5>
                <ul className="space-y-2 text-xs">
                  <li><a href="#" className="hover:text-[#005494]">Karachi to Dubai</a></li>
                  <li><a href="#" className="hover:text-[#005494]">Lahore to Dubai</a></li>
                  <li><a href="#" className="hover:text-[#005494]">Islamabad to Dubai</a></li>
                  <li><a href="#" className="hover:text-[#005494]">Karachi to Jeddah</a></li>
                  <li><a href="#" className="hover:text-[#005494]">Karachi to Madinah</a></li>
                  <li><a href="#" className="hover:text-[#005494]">Karachi to Bangkok</a></li>
                  <li><a href="#" className="hover:text-[#005494]">Lahore to Beijing</a></li>
                </ul>
             </div>
           </div>
        </div>

        {/* COLUMN 3: Top Bus Operators */}
        <div>
           <h4 className="font-bold text-gray-800 mb-4">Top Bus Operators</h4>
           <ul className="space-y-2 text-xs">
             <li><a href="#" className="hover:text-[#005494]">Online Bus Tickets</a></li>
             <li><a href="#" className="hover:text-[#005494]">Daewoo Express</a></li>
             <li><a href="#" className="hover:text-[#005494]">Kainat Travels</a></li>
             <li><a href="#" className="hover:text-[#005494]">Niazi Express</a></li>
             <li><a href="#" className="hover:text-[#005494]">Faisal Movers</a></li>
             <li><a href="#" className="hover:text-[#005494]">Bilal Travels</a></li>
             <li><a href="#" className="hover:text-[#005494]">Skyways</a></li>
           </ul>
        </div>
      </div>

      {/* =========================================
          3. PAYMENT PARTNERS & BOTTOM LINKS
      ========================================= */}
      <div className="border-t border-gray-100 py-10 text-center bg-gray-50">
         
         {/* Payment Logos (Full Color & Big) */}
         <div className="flex flex-wrap justify-center items-center gap-8 mb-10">
            {/* Norton */}
            <div className="flex items-center gap-2 font-bold text-gray-700 text-lg">
                <SiNorton size={32} className="text-yellow-500" /> Norton
            </div>
            
            {/* JazzCash (Local Image) */}
            <img 
              src={jazzcashLogo} 
              alt="JazzCash" 
              className="h-14 object-contain"
            />
            
            {/* EasyPaisa (Local Image) */}
            <img 
              src={easypaisaLogo} 
              alt="EasyPaisa" 
              className="h-14 object-contain"
            />
            
            {/* HBL */}
            <div className="bg-[#008266] text-white font-bold px-4 text-xl py-2 rounded-md h-12 flex items-center justify-center">
                HBL
            </div>
            
            {/* Cards */}
            <FaCcMastercard size={64} className="text-[#eb001b]" />
            <div className="font-bold text-green-600 text-lg border-2 border-green-600 px-3 py-1 rounded h-12 flex items-center justify-center">
                PayPak
            </div>
            <FaCcVisa size={64} className="text-[#1A1F71]" />
         </div>

         {/* Bottom Links */}
         <div className="flex flex-wrap justify-center gap-6 text-xs text-[#005494] font-medium mb-4">
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">About Us</a>
            <a href="#" className="hover:underline">Contact Us</a>
            <a href="#" className="hover:underline">Search Bookings</a>
            <a href="#" className="hover:underline">FAQ</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Careers</a>
            <a href="#" className="hover:underline">Terms & Conditions</a>
            <a href="#" className="hover:underline">Divine Refund</a>
         </div>

         {/* Social Icons */}
         <div className="flex justify-center gap-6 mb-4 text-gray-400">
            <a href="#" className="hover:text-[#1877F2] transition-colors"><FaFacebookF size={18} /></a>
            <a href="#" className="hover:text-[#E4405F] transition-colors"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-[#1DA1F2] transition-colors"><FaTwitter size={20} /></a>
         </div>

         {/* Copyright */}
         <div className="text-xs text-gray-500">
            Copyright {new Date().getFullYear()} Divine Fly Private Limited. All rights reserved.
         </div>
      </div>

    </footer>
  );
};

export default Footer;