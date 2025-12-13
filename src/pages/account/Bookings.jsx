import React from 'react';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import Button from '../../components/common/Button';

const Bookings = () => {
  return (
    <div className="space-y-6">
       <h1 className="text-2xl font-bold text-[#1A2B49]">My Bookings</h1>
       
       {/* Empty State (For now) */}
       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
             <FiCalendar size={32} className="text-[#005494]" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">No upcoming bookings</h3>
          <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">
            You haven't booked any trips yet. Start exploring active flights and hotels now.
          </p>
          <Button onClick={() => window.location.href='/tours'}>
            Start Booking
          </Button>
       </div>
    </div>
  );
};

export default Bookings;