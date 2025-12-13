import React, { useState, useEffect, useRef } from 'react';
import { FiX, FiChevronDown, FiSearch, FiCheck } from 'react-icons/fi';
import Button from '../common/Button';

// --- COUNTRY CODES DATA ---
const COUNTRIES = [
  { code: 'PK', name: 'Pakistan', dial_code: '+92', flag: '🇵🇰' },
  { code: 'SA', name: 'Saudi Arabia', dial_code: '+966', flag: '🇸🇦' },
  { code: 'AE', name: 'United Arab Emirates', dial_code: '+971', flag: '🇦🇪' },
  { code: 'GB', name: 'United Kingdom', dial_code: '+44', flag: '🇬🇧' },
  { code: 'US', name: 'United States', dial_code: '+1', flag: '🇺🇸' },
  { code: 'CA', name: 'Canada', dial_code: '+1', flag: '🇨🇦' },
  { code: 'TR', name: 'Turkey', dial_code: '+90', flag: '🇹🇷' },
  { code: 'QA', name: 'Qatar', dial_code: '+974', flag: '🇶🇦' },
];

const LoginPopup = ({ isOpen, onClose, onLogin }) => {
  // General State
  const [phone, setPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [method, setMethod] = useState('whatsapp');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState('input'); // 'input' | 'password' | 'otp'

  // OTP State
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(120); // 2 minutes in seconds
  const otpInputRefs = useRef([]);

  const dropdownRef = useRef(null);

  // --- EFFECT: Reset State on Open ---
  useEffect(() => {
    if (isOpen) {
      setStep('input');
      setPhone('');
      setOtp(['', '', '', '', '', '']);
      setTimer(120);
      setIsLoading(false);
      setIsCountryOpen(false);
    }
  }, [isOpen]);

  // --- EFFECT: OTP Timer ---
  useEffect(() => {
    let interval;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // --- HANDLERS ---
  
  // 1. Check Phone Number Logic
  const handleContinue = async () => {
    if (phone.length < 7) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Mock logic: specific number -> password, others -> OTP
      if (phone === '03555118812' || (selectedCountry.code === 'PK' && phone === '3555118812')) {
        setStep('password');
      } else {
        setStep('otp');
        setOtp(['', '', '', '', '', '']); // Reset OTP on entry
      }
    }, 1000);
  };

  // 2. OTP Input Logic (Auto-focus)
  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value entered
    if (value && index < 5) {
      otpInputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Move to previous input on Backspace if empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1].focus();
    }
  };

  // 3. Final Login Logic
  const handleFinalLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const fullPhone = `${selectedCountry.dial_code} ${phone}`;
      const name = (phone === '03555118812' || (selectedCountry.code === 'PK' && phone === '3555118812')) 
        ? 'Syed Mujtaba' 
        : 'Traveler';
      
      onLogin({ name, phone: fullPhone });
      onClose();
    }, 1000);
  };

  // Format Timer (MM:SS)
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const filteredCountries = COUNTRIES.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.dial_code.includes(searchQuery)
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      {/* Modal Container */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[450px] relative z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors z-20">
          <FiX size={24} />
        </button>

        <div className="p-8 pt-10 overflow-y-auto">
          
          {/* Vector Image (Same for all steps) */}
          <div className="flex justify-center mb-6">
            <img 
              src="https://img.freepik.com/free-vector/tourists-concept-illustration_114360-2602.jpg?w=740" 
              alt="Travelers" 
              className="h-36 object-contain mix-blend-multiply" 
            />
          </div>

          <h2 className="text-[22px] font-semibold text-[#1A2B49] text-center mb-2">
            Continue to your account
          </h2>

          {/* =======================
              STEP 1: PHONE INPUT
          ======================= */}
          {step === 'input' && (
            <>
              {/* Spacing adjustments to match screenshot */}
              <div className="mb-6"></div> 

              <label className="block text-xs font-bold text-gray-600 mb-2 ml-1">
                Mobile Number
              </label>

              <div className="flex gap-3 mb-6 relative">
                {/* Country Dropdown */}
                <div ref={dropdownRef} className="relative">
                  <button 
                    onClick={() => setIsCountryOpen(!isCountryOpen)}
                    className="h-12 border border-gray-300 rounded-lg px-3 flex items-center gap-2 bg-gray-50 min-w-[110px] hover:border-[#005494] transition-colors"
                  >
                    <span className="text-lg">{selectedCountry.flag}</span>
                    <span className="text-sm font-bold text-gray-700 whitespace-nowrap">{selectedCountry.dial_code}</span>
                    <FiChevronDown className={`text-gray-400 text-sm ml-auto transition-transform ${isCountryOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isCountryOpen && (
                    <div className="absolute top-full left-0 mt-2 w-[280px] bg-white rounded-xl shadow-xl border border-gray-100 z-50 max-h-64 flex flex-col overflow-hidden">
                      <div className="p-2 border-b border-gray-100">
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                          <FiSearch className="text-gray-400" />
                          <input 
                            autoFocus
                            type="text" 
                            placeholder="Search..." 
                            className="bg-transparent outline-none text-sm w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="overflow-y-auto flex-1">
                        {filteredCountries.map((country) => (
                          <button
                            key={country.code}
                            onClick={() => { setSelectedCountry(country); setIsCountryOpen(false); }}
                            className="w-full px-4 py-3 flex items-center gap-3 hover:bg-blue-50 text-left transition-colors border-b border-gray-50 last:border-0"
                          >
                            <span className="text-xl">{country.flag}</span>
                            <span className="text-sm font-medium text-gray-700 flex-1">{country.name}</span>
                            <span className="text-xs font-bold text-gray-500">{country.dial_code}</span>
                            {selectedCountry.code === country.code && <FiCheck className="text-[#005494]" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <input 
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="3XXXXXXXXX"
                  className="flex-1 h-12 border border-gray-300 rounded-lg px-4 outline-none focus:border-[#005494] focus:ring-1 focus:ring-[#005494] font-medium text-gray-800 placeholder:text-gray-300 transition-all"
                />
              </div>

              {/* Radio Options */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {['whatsapp', 'sms'].map((m) => (
                  <label key={m} className={`cursor-pointer flex items-center gap-3 px-4 py-3.5 rounded-lg border transition-all relative select-none
                      ${method === m ? 'bg-[#F0F7FF] border-[#005494]' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
                    <input type="radio" name="auth_method" className="hidden" checked={method === m} onChange={() => setMethod(m)} />
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${method === m ? 'border-[#005494]' : 'border-gray-300'}`}>
                      {method === m && <div className="w-2.5 h-2.5 bg-[#005494] rounded-full" />}
                    </div>
                    <span className={`text-sm font-bold ${method === m ? 'text-[#005494]' : 'text-gray-600'}`}>
                      Via {m === 'whatsapp' ? 'WhatsApp' : 'SMS'}
                    </span>
                  </label>
                ))}
              </div>

              <Button 
                onClick={handleContinue} 
                disabled={phone.length < 7 || isLoading} 
                className="w-full h-12 !text-[16px] !rounded-lg bg-gray-100 text-gray-400 font-bold hover:bg-[#005494] hover:text-white transition-all disabled:hover:bg-gray-100 disabled:hover:text-gray-400"
                style={{ backgroundColor: phone.length >= 7 ? '#005494' : '', color: phone.length >= 7 ? 'white' : '' }}
              >
                {isLoading ? 'Checking...' : 'Continue'}
              </Button>
            </>
          )}

          {/* =======================
              STEP 2: OTP (6-Digit)
          ======================= */}
          {step === 'otp' && (
            <div className="animate-in slide-in-from-right-4 duration-300">
              <p className="text-gray-600 text-[15px] text-center mb-6">
                Enter the 6-digit OTP we've sent to your mobile.
              </p>

              {/* Number & Change Link */}
              <div className="flex justify-between items-center mb-4 px-1">
                <span className="text-gray-800 font-medium">{selectedCountry.dial_code}{phone}</span>
                <button 
                  onClick={() => setStep('input')} 
                  className="text-[#005494] text-sm font-bold hover:underline"
                >
                  Change number
                </button>
              </div>

              {/* Label & Timer */}
              <div className="flex justify-between items-center mb-2 px-1">
                <span className="text-sm font-bold text-gray-700">OTP</span>
                <span className="text-[#005494] font-bold text-sm">{formatTime(timer)}</span>
              </div>

              {/* 6-Digit Inputs */}
              <div className="flex gap-2 mb-6 justify-between">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => otpInputRefs.current[index] = el}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-[50px] h-[50px] border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-800 outline-none focus:border-[#005494] focus:ring-1 focus:ring-[#005494] transition-all"
                  />
                ))}
              </div>

              {/* Resend Text */}
              <div className="text-center text-xs text-gray-400 mb-6">
                Resend OTP in {formatTime(timer)}
              </div>

              <Button 
                onClick={handleFinalLogin} 
                disabled={otp.some(d => d === '') || isLoading}
                className="w-full h-12 !text-[16px] !rounded-lg disabled:opacity-50"
              >
                {isLoading ? 'Verifying...' : 'Continue'}
              </Button>
            </div>
          )}

          {/* =======================
              STEP 2A: PASSWORD (Existing)
          ======================= */}
          {step === 'password' && (
            <div className="text-center animate-in slide-in-from-right-4 duration-300">
              <p className="text-gray-500 text-sm mb-6">
                Please enter your password for <br/><strong>{selectedCountry.dial_code} {phone}</strong>
              </p>
              <input type="password" placeholder="Password" className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 outline-none focus:border-[#005494]" />
              <Button onClick={handleFinalLogin} className="w-full h-12">{isLoading ? 'Logging in...' : 'Login'}</Button>
              <button onClick={() => setStep('input')} className="text-sm text-gray-400 mt-4 underline">Back</button>
            </div>
          )}

          {/* Footer Terms */}
          <p className="text-[12px] text-gray-400 text-center mt-6 leading-tight">
            By continuing you are agreeing to the <span className="text-[#005494] cursor-pointer hover:underline font-medium">Terms and Conditions</span> of Divineticket.pk.
          </p>

        </div>
      </div>
    </div>
  );
};

export default LoginPopup;