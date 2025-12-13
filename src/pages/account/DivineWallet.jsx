import React from 'react';
import { FiPlus, FiCreditCard } from 'react-icons/fi';
import Button from '../../components/common/Button';

const DivineWallet = () => {
  return (
    <div className="space-y-6">
       <h1 className="text-2xl font-bold text-[#1A2B49]">Divine Wallet</h1>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Balance Card */}
          <div className="bg-gradient-to-br from-[#005494] to-[#003366] rounded-xl p-8 text-white shadow-lg relative overflow-hidden">
             {/* Decorative Circles */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full translate-x-10 -translate-y-10"></div>
             <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -translate-x-5 translate-y-5"></div>
             
             <div className="relative z-10">
                <p className="text-blue-100 text-sm font-medium mb-1">Available Balance</p>
                <h2 className="text-4xl font-bold mb-6">PKR 0.00</h2>
                
                <div className="flex gap-3">
                   <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
                      <FiPlus /> Add Money
                   </button>
                </div>
             </div>
          </div>

          {/* Info Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col justify-center">
             <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                   <FiCreditCard size={20} />
                </div>
                <h3 className="font-bold text-gray-800">Why use Divine Wallet?</h3>
             </div>
             <ul className="space-y-3 text-sm text-gray-600 list-disc list-inside">
                <li>Instant refunds processed within minutes.</li>
                <li>One-click checkout for faster bookings.</li>
                <li>Exclusive cashback offers for wallet users.</li>
             </ul>
          </div>
       </div>
    </div>
  );
};

export default DivineWallet;