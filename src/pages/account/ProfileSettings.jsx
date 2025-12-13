import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiCalendar, FiMapPin, FiSave } from 'react-icons/fi';
import Button from '../../components/common/Button';

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    firstName: 'Syed Mujtaba',
    lastName: 'Abbas',
    email: '',
    phone: '+92 355 5118812', // Read only
    gender: 'Male',
    dob: '',
    city: 'Islamabad',
    address: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API Call to save profile logic here
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <h1 className="text-2xl font-bold text-[#1A2B49]">Edit Profile</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <form onSubmit={handleSubmit}>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              
              {/* First Name */}
              <FormInput 
                 label="First Name" 
                 icon={FiUser} 
                 name="firstName" 
                 value={formData.firstName} 
                 onChange={handleChange} 
              />

              {/* Last Name */}
              <FormInput 
                 label="Last Name" 
                 icon={FiUser} 
                 name="lastName" 
                 value={formData.lastName} 
                 onChange={handleChange} 
              />

              {/* Phone (Read Only) */}
              <div>
                 <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Phone Number</label>
                 <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                       <FiPhone />
                    </div>
                    <input 
                       type="text" 
                       value={formData.phone} 
                       readOnly
                       className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 pl-12 pr-4 text-gray-500 font-medium cursor-not-allowed focus:outline-none"
                    />
                 </div>
                 <p className="text-[11px] text-gray-400 mt-1 ml-1">Phone number cannot be changed.</p>
              </div>

              {/* Email */}
              <FormInput 
                 label="Email Address" 
                 icon={FiMail} 
                 type="email"
                 name="email" 
                 value={formData.email} 
                 placeholder="name@example.com"
                 onChange={handleChange} 
              />

              {/* Gender */}
              <div>
                 <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Gender</label>
                 <div className="flex gap-4">
                    {['Male', 'Female'].map((g) => (
                       <label key={g} className={`flex-1 border rounded-lg py-3 px-4 flex items-center justify-center gap-2 cursor-pointer transition-all
                          ${formData.gender === g 
                             ? 'bg-blue-50 border-[#005494] text-[#005494] font-bold' 
                             : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                          <input 
                             type="radio" 
                             name="gender" 
                             value={g} 
                             checked={formData.gender === g}
                             onChange={handleChange}
                             className="hidden"
                          />
                          {g}
                       </label>
                    ))}
                 </div>
              </div>

              {/* Date of Birth */}
              <FormInput 
                 label="Date of Birth" 
                 icon={FiCalendar} 
                 type="date"
                 name="dob" 
                 value={formData.dob} 
                 onChange={handleChange} 
              />

              {/* City */}
              <FormInput 
                 label="City" 
                 icon={FiMapPin} 
                 name="city" 
                 value={formData.city} 
                 onChange={handleChange} 
              />

           </div>

           <div className="flex justify-end pt-6 border-t border-gray-100">
              <Button type="submit" className="flex items-center gap-2 px-8">
                 <FiSave /> Save Changes
              </Button>
           </div>

        </form>
      </div>
    </div>
  );
};

const FormInput = ({ label, icon: Icon, type = "text", ...props }) => (
  <div>
     <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">{label}</label>
     <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#005494] transition-colors">
           <Icon />
        </div>
        <input 
           type={type} 
           className="w-full border border-gray-300 rounded-lg py-3 pl-12 pr-4 text-gray-800 font-medium outline-none focus:border-[#005494] focus:ring-1 focus:ring-[#005494] transition-all"
           {...props}
        />
     </div>
  </div>
);

export default ProfileSettings;