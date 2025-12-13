import React from 'react';
import { FiGift, FiCheck, FiInfo } from 'react-icons/fi';
import { PiMedalBold, PiAirplaneTiltBold, PiCrownBold } from 'react-icons/pi';

const DivineRewards = () => {
  return (
    <div className="space-y-8">
      
      {/* HEADER & TIER CARD */}
      <div>
        <h1 className="text-2xl font-bold text-[#1A2B49] mb-6">Divine Rewards</h1>
        
        {/* Tier Status Card */}
        <div className="bg-gradient-to-r from-[#1A2B49] to-[#005494] rounded-2xl p-8 text-white relative overflow-hidden shadow-lg">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full translate-x-20 -translate-y-20 blur-2xl"></div>
           
           <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                 <div className="flex items-center gap-2 text-yellow-400 font-bold mb-1 uppercase tracking-wider text-xs">
                    <PiCrownBold /> Current Tier
                 </div>
                 <h2 className="text-4xl font-bold mb-2">Silver Member</h2>
                 <p className="text-blue-200 text-sm">You need <span className="font-bold text-white">400 points</span> to reach Gold status.</p>
              </div>
              
              <div className="text-center bg-white/10 backdrop-blur-md rounded-xl p-4 min-w-[120px]">
                 <p className="text-xs text-blue-200 mb-1">Available Points</p>
                 <p className="text-3xl font-bold">1,250</p>
              </div>
           </div>

           {/* Progress Bar */}
           <div className="mt-8">
              <div className="flex justify-between text-xs font-medium text-blue-200 mb-2">
                 <span>Silver</span>
                 <span>Gold</span>
              </div>
              <div className="w-full h-3 bg-black/20 rounded-full overflow-hidden">
                 <div className="h-full bg-yellow-400 w-[60%] rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
              </div>
           </div>
        </div>
      </div>

      {/* BENEFITS GRID */}
      <div>
         <h3 className="font-bold text-[#1A2B49] text-lg mb-4 flex items-center gap-2">
            <FiGift className="text-[#005494]" /> Your Benefits
         </h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <BenefitCard 
               icon={PiAirplaneTiltBold} 
               title="Priority Boarding" 
               desc="Skip the queue on selected airlines." 
               active 
            />
            <BenefitCard 
               icon={FiCheck} 
               title="Free Cancellation" 
               desc="Get full refunds on domestic flights." 
               active 
            />
            <BenefitCard 
               icon={PiMedalBold} 
               title="Double Points" 
               desc="Earn 2x points on international trips." 
               active={false} 
            />
         </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
         <h3 className="font-bold text-[#1A2B49] mb-4 flex items-center gap-2">
            <FiInfo /> How to earn points?
         </h3>
         <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
               <span className="text-gray-700 font-medium">Book a domestic flight</span>
               <span className="font-bold text-[#005494]">+50 pts</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
               <span className="text-gray-700 font-medium">Book an international flight</span>
               <span className="font-bold text-[#005494]">+150 pts</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
               <span className="text-gray-700 font-medium">Book a hotel stay</span>
               <span className="font-bold text-[#005494]">+100 pts</span>
            </div>
         </div>
      </div>

    </div>
  );
};

const BenefitCard = ({ icon: Icon, title, desc, active }) => (
  <div className={`p-5 rounded-xl border flex flex-col items-start gap-3 transition-all
      ${active ? 'bg-white border-blue-100 shadow-sm' : 'bg-gray-50 border-gray-100 opacity-60'}`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg
         ${active ? 'bg-blue-50 text-[#005494]' : 'bg-gray-200 text-gray-400'}`}>
         <Icon />
      </div>
      <div>
         <h4 className={`font-bold text-sm ${active ? 'text-gray-800' : 'text-gray-500'}`}>{title}</h4>
         <p className="text-xs text-gray-500 mt-1 leading-relaxed">{desc}</p>
      </div>
      {!active && <div className="mt-auto text-[10px] font-bold uppercase tracking-wide text-gray-400 bg-gray-200 px-2 py-1 rounded">Locked</div>}
  </div>
);

export default DivineRewards;