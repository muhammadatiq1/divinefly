import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlane, FaUtensils, FaSuitcase } from 'react-icons/fa';
import Button from '../common/Button';

const FlightCard = ({ flight }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* 1. Airline Info */}
        <div className="flex flex-col items-center md:items-start min-w-[80px]">
           <img 
             src={flight.logo} 
             alt={flight.airline} 
             className="h-10 w-10 object-contain mb-2" 
           />
           <span className="font-bold text-[#1A2B49] text-sm">{flight.airline}</span>
           <span className="text-xs text-gray-400">{flight.flightNumber}</span>
        </div>

        {/* 2. Timing & Route */}
        <div className="flex-1 flex items-center justify-center w-full md:w-auto gap-3 md:gap-8 text-center">
           
           {/* Departure */}
           <div className="text-right">
              <div className="text-xl font-bold text-[#1A2B49]">{flight.departureTime}</div>
              <div className="text-sm text-gray-500 font-medium">{flight.originCode}</div>
           </div>

           {/* Duration Line */}
           <div className="flex flex-col items-center w-24">
              <span className="text-xs text-gray-400 mb-1">{flight.duration}</span>
              <div className="w-full h-[2px] bg-gray-200 relative flex items-center justify-center">
                 <div className="w-2 h-2 bg-gray-300 rounded-full absolute left-0"></div>
                 <FaPlane className="text-gray-300 text-xs rotate-90" />
                 <div className="w-2 h-2 bg-gray-300 rounded-full absolute right-0"></div>
              </div>
              <span className="text-xs text-[#005494] font-bold mt-1">{flight.stops}</span>
           </div>

           {/* Arrival */}
           <div className="text-left">
              <div className="text-xl font-bold text-[#1A2B49]">{flight.arrivalTime}</div>
              <div className="text-sm text-gray-500 font-medium">{flight.destinationCode}</div>
           </div>

        </div>

        {/* 3. Price & Action */}
        <div className="flex flex-row md:flex-col items-center gap-4 md:gap-2 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-gray-100 pt-4 md:pt-0 mt-2 md:mt-0">
           
           {/* Amenities (Meal/Bag) */}
           <div className="flex gap-3 text-gray-400 text-xs">
              {flight.hasMeal && (
                 <div className="flex items-center gap-1" title="Meal Included">
                    <FaUtensils /> <span className="hidden md:inline">Meal</span>
                 </div>
              )}
              <div className="flex items-center gap-1" title="Baggage">
                 <FaSuitcase /> <span className="hidden md:inline">20kg</span>
              </div>
           </div>

           <Button 
             onClick={() => navigate('/flights/checkout')} 
             className="!bg-[#005494] hover:!bg-[#004080] !py-2 !px-6 !text-sm !font-bold rounded-lg shadow-sm"
           >
             PKR {flight.price.toLocaleString()}
           </Button>
        </div>

      </div>
    </div>
  );
};

export default FlightCard;