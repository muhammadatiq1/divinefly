import React from 'react';

const PurchaseHistory = () => {
  return (
    <div className="space-y-6">
       <h1 className="text-2xl font-bold text-[#1A2B49]">Purchase History</h1>
       
       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4">Transaction ID</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                 {/* Mock Row */}
                 <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-gray-600">TRX-882190</td>
                    <td className="px-6 py-4 text-gray-800">12 Dec, 2025</td>
                    <td className="px-6 py-4 text-gray-800">Flight (LHE - KHI)</td>
                    <td className="px-6 py-4 font-bold text-[#1A2B49]">PKR 24,500</td>
                    <td className="px-6 py-4">
                       <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Success</span>
                    </td>
                 </tr>
                 <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-gray-600">TRX-773210</td>
                    <td className="px-6 py-4 text-gray-800">10 Nov, 2025</td>
                    <td className="px-6 py-4 text-gray-800">Bus (ISB - LHE)</td>
                    <td className="px-6 py-4 font-bold text-[#1A2B49]">PKR 3,200</td>
                    <td className="px-6 py-4">
                       <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Success</span>
                    </td>
                 </tr>
              </tbody>
            </table>
          </div>
       </div>
    </div>
  );
};

export default PurchaseHistory;