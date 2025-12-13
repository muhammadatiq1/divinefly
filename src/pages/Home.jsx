import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Added useNavigate
import Slider from "react-slick";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
// Essential CSS for react-slick
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import { 
  FaPlane, FaBus, FaPassport, FaUmbrellaBeach, FaExchangeAlt, 
  FaCalendarAlt, FaChevronDown, FaTimes, FaPlus, FaMinus, FaSearch,
  FaStar, FaStarHalfAlt, FaCheckCircle, FaUser, 
  FaChevronLeft, FaChevronRight, FaPlay, FaPause, FaWhatsapp, FaApple, FaGooglePlay
} from 'react-icons/fa';
import { 
  PiAirplaneTiltFill, PiBusFill, PiBuildingsFill, PiGaugeFill 
} from 'react-icons/pi';
import { FcCustomerSupport, FcMoneyTransfer, FcPrivacy } from 'react-icons/fc';
import { FiPhoneCall } from "react-icons/fi";
import { BsQrCode } from "react-icons/bs";

// Import your separate components
import Button from '../components/common/Button'; 
import FeaturedPartners from '../components/FeaturedPartners';
import BackgroundPattern from '../components/home/BackgroundPattern';
import AirportSearch from '../components/home/AirportSearch';

// --- MOCK DATA: REVIEWS ---
const REVIEWS_DATA = [
  { id: 1, name: "Muhammad Arslan", text: "Very good working and good staff. Got my tickets instantly.", location: "Lahore, PK", time: "8 hours ago", rating: 5 },
  { id: 2, name: "Tariq Mehmood", text: "Ease of Flight booking. App is very user friendly.", location: "Karachi, PK", time: "10 hours ago", rating: 5 },
  { id: 3, name: "Sara Ahmed", text: "Had an issue with payment but support team resolved it quickly. Thanks Asma!", location: "Islamabad, PK", time: "1 day ago", rating: 4 },
  { id: 4, name: "John Smith", text: "Great prices for international flights. Cheaper than other sites.", location: "Dubai, UAE", time: "1 day ago", rating: 5 },
  { id: 5, name: "Ali Hassan", text: "Smooth experience. The e-ticket process is seamless.", location: "Multan, PK", time: "2 days ago", rating: 5 },
];

// --- CUSTOM COMPONENTS FOR HERO ---

// Custom Date Input to match design exactly
const CustomDateInput = React.forwardRef(({ value, onClick, placeholder }, ref) => (
  <div 
    className="flex items-center h-[56px] border border-gray-300 bg-white rounded-[4px] px-4 w-full cursor-pointer hover:border-[#005494] transition-all group"
    onClick={onClick} ref={ref}
  >
    <FaCalendarAlt className="text-gray-500 mr-3 group-hover:text-[#005494]" />
    <input
      readOnly
      value={value}
      placeholder={placeholder}
      className="w-full text-sm font-bold text-[#1A2B49] placeholder:text-gray-400 placeholder:font-medium outline-none cursor-pointer bg-transparent"
    />
  </div>
));

const Home = () => {
  const navigate = useNavigate(); // Hook for navigation

  // --- STATE ---
  const [activeTab, setActiveTab] = useState('flights');
  const [tripType, setTripType] = useState('oneway');
  const [flightClass, setFlightClass] = useState('Economy');
  
  // Travelers
  const [travelers, setTravelers] = useState({ adults: 1, children: 0, infants: 0 });
  const [isTravelerOpen, setIsTravelerOpen] = useState(false);
  const [isClassOpen, setIsClassOpen] = useState(false);

  // Flight Segments
  const [segments, setSegments] = useState([
    { from: null, to: null, date: new Date(), returnDate: null }
  ]);

  // Slider Refs & State
  const sliderRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // --- HANDLERS ---
  const updateSegment = (index, field, value) => {
    const newSegments = [...segments];
    newSegments[index][field] = value;
    setSegments(newSegments);
  };

  const handleSwap = (index) => {
    const newSegments = [...segments];
    const temp = newSegments[index].from;
    newSegments[index].from = newSegments[index].to;
    newSegments[index].to = temp;
    setSegments(newSegments);
  };

  const addSegment = () => setSegments([...segments, { from: null, to: null, date: new Date() }]);
  const removeSegment = (index) => segments.length > 1 && setSegments(segments.filter((_, i) => i !== index));

  const handleTravelerChange = (type, op) => {
    setTravelers(prev => {
      const copy = { ...prev };
      if (op === 'inc') {
        if ((type === 'adults' || type === 'children') && copy.adults + copy.children < 9) copy[type]++;
        if (type === 'infants' && copy.infants < copy.adults) copy[type]++;
      } else {
        if (type === 'adults' && copy.adults > 1) copy.adults--;
        if (type !== 'adults' && copy[type] > 0) copy[type]--;
      }
      return copy;
    });
  };

  // Slider Pause/Play Toggle
  const toggleAutoPlay = () => {
    if (isPlaying) {
      sliderRef.current.slickPause();
    } else {
      sliderRef.current.slickPlay();
    }
    setIsPlaying(!isPlaying);
  };

  // Slider Settings
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "cubic-bezier(0.87, 0, 0.13, 1)",
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    responsive: [
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      }
    ]
  };

  // Handle Search Navigation
  const handleSearch = () => {
    // Navigate to search results page
    navigate('/flights/search');
  };

  return (
    <div className="bg-[#F2F4F7] min-h-screen font-sans">
      {/* =======================
          CUSTOM CALENDAR CSS
      ======================= */}
      <style>{`
        /* Force Z-Index higher than Navbar (z-50) */
        .react-datepicker-popper {
          z-index: 9999 !important;
        }
        
        /* Premium Calendar Styling */
        .react-datepicker {
          font-family: 'Inter', sans-serif;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .react-datepicker__header {
          background-color: white;
          border-bottom: none;
          padding-top: 15px;
        }
        .react-datepicker__current-month {
          color: #1A2B49;
          font-weight: 700;
          font-size: 16px;
          margin-bottom: 10px;
        }
        .react-datepicker__day-name {
          color: #005494;
          font-weight: 700;
          width: 38px;
        }
        .react-datepicker__day {
          width: 38px;
          line-height: 38px;
          margin: 0.166rem;
          color: #374151;
          font-weight: 500;
        }
        .react-datepicker__day:hover {
          border-radius: 50%;
          background-color: #EBF5FF;
          color: #005494;
        }
        .react-datepicker__day--selected, 
        .react-datepicker__day--keyboard-selected {
          border-radius: 50%;
          background-color: #005494 !important;
          color: white !important;
          font-weight: 700;
        }
        .react-datepicker__day--today {
          font-weight: bold;
          color: #005494;
        }
        .react-datepicker__navigation {
          top: 15px;
        }
        .react-datepicker__navigation-icon::before {
          border-color: #005494;
          border-width: 2px 2px 0 0;
        }
        .react-datepicker__triangle { display: none; }
      `}</style>

      {/* =========================================
          HERO SECTION
      ========================================= */}
      <div className="bg-[#003366] pt-32 pb-20 md:pb-32 relative overflow-visible">
        
        <BackgroundPattern />
        
        <div className="max-w-[1140px] mx-auto px-4 relative z-10">
          <h1 className="text-white text-2xl md:text-[28px] font-semibold mb-6 text-center md:text-left">
            Travel Bookings Made Easy
          </h1>

          <div className="relative drop-shadow-xl">
            
            {/* 1. TABS */}
            <div className="flex items-end pl-0 relative z-20 overflow-x-auto md:overflow-visible pb-[1px] no-scrollbar">
              <div className="flex items-end">
                <TabButton id="flights" label="Flights" icon={FaPlane} active={activeTab} onClick={setActiveTab} />
                <TabButton id="buses" label="Buses" icon={FaBus} active={activeTab} onClick={setActiveTab} />
                <div className="hidden md:flex items-end">
                  <TabButton id="visas" label="Visas" icon={FaPassport} active={activeTab} onClick={setActiveTab} />
                  <TabButton id="packages" label="Holiday Packages" icon={FaUmbrellaBeach} active={activeTab} onClick={setActiveTab} />
                </div>
              </div>
            </div>

            {/* 2. WHITE FORM BODY */}
            <div className="bg-white rounded-tr-lg rounded-b-lg rounded-tl-none p-4 md:p-6 min-h-[220px] relative z-10">
              
              {activeTab === 'flights' ? (
                <>
                  {/* TOP ROW: Controls */}
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 mb-5">
                    
                    {/* Trip Type Pills */}
                    <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                      <TripTypeButton id="oneway" label="One Way" active={tripType} onClick={(id) => { setTripType(id); setSegments([{...segments[0]}]); }} />
                      <TripTypeButton id="return" label="Return" active={tripType} onClick={(id) => { setTripType(id); setSegments([{...segments[0]}]); }} />
                      <TripTypeButton id="multicity" label="Multi City" active={tripType} onClick={(id) => { setTripType(id); if(segments.length === 1) addSegment(); }} />
                    </div>

                    <div className="flex gap-4 w-full md:w-auto">
                        {/* Travelers */}
                        <div className="relative">
                          <button onClick={() => setIsTravelerOpen(!isTravelerOpen)} className="flex items-center gap-2 text-[#005494] font-bold text-[14px] hover:bg-blue-50 px-2 py-1 rounded transition-colors whitespace-nowrap">
                            {travelers.adults + travelers.children} Adults <FaChevronDown size={12} />
                          </button>
                          
                          {isTravelerOpen && (
                            <div className="absolute top-full left-0 mt-2 w-[280px] md:w-[320px] bg-white rounded-lg shadow-xl border border-gray-100 p-5 z-50">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-[#005494] text-lg">Travelers</h3>
                                    <button onClick={() => setIsTravelerOpen(false)}><FaTimes className="text-gray-400" /></button>
                                </div>
                                <TravelerRow label="Adults" sub="12+ years" count={travelers.adults} onInc={() => handleTravelerChange('adults', 'inc')} onDec={() => handleTravelerChange('adults', 'dec')} />
                                <TravelerRow label="Children" sub="2-11 years" count={travelers.children} onInc={() => handleTravelerChange('children', 'inc')} onDec={() => handleTravelerChange('children', 'dec')} />
                                <TravelerRow label="Infants" sub="< 2 years" count={travelers.infants} onInc={() => handleTravelerChange('infants', 'inc')} onDec={() => handleTravelerChange('infants', 'dec')} />
                            </div>
                          )}
                        </div>

                        {/* Class */}
                        <div className="relative">
                          <button onClick={() => setIsClassOpen(!isClassOpen)} className="flex items-center gap-2 text-[#005494] font-bold text-[14px] hover:bg-blue-50 px-2 py-1 rounded transition-colors whitespace-nowrap">
                            {flightClass} <FaChevronDown size={12} />
                          </button>
                          
                          {isClassOpen && (
                            <div className="absolute top-full left-0 mt-2 w-[200px] bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100">
                              {['Economy', 'Premium Economy', 'Business', 'First'].map((c) => (
                                <button key={c} onClick={() => { setFlightClass(c); setIsClassOpen(false); }} className="w-full text-left px-4 py-3 text-sm text-gray-700 flex items-center gap-3 hover:bg-blue-50">
                                  {flightClass === c && <div className="w-2 h-2 bg-[#005494] rounded-full" />}
                                  {c}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                    </div>
                  </div>

                  {/* MIDDLE ROW: Inputs */}
                  <div className="flex flex-col gap-4">
                    {segments.map((segment, index) => (
                      <div key={index} className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center relative">
                        
                        {tripType === 'multicity' && (
                          <div className="w-full lg:w-16 text-xs font-bold text-gray-700 lg:pt-5">Flight {index + 1}</div>
                        )}

                        {/* Location Group */}
                        <div className="flex-1 w-full flex flex-col md:flex-row items-center relative gap-2">
                          
                          {/* FROM BOX - Excludes Selected 'To' Airport */}
                          <div className="w-full md:flex-1">
                             <AirportSearch 
                                type="from"
                                placeholder="Flying From" 
                                value={segment.from} 
                                excludeCode={segment.to?.code}
                                onChange={(val) => updateSegment(index, 'from', val)} 
                             />
                          </div>

                          {/* SWAP BUTTON */}
                          <div className="relative md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-20 my-[-10px] md:my-0">
                             <button 
                               onClick={() => handleSwap(index)} 
                               className="bg-white text-[#555] p-2 rounded-full shadow-md border border-gray-200 hover:text-[#005494] hover:border-[#005494] transition-all transform rotate-90 md:rotate-0"
                             >
                               <FaExchangeAlt size={14} />
                             </button>
                          </div>

                          {/* TO BOX - Excludes Selected 'From' Airport */}
                          <div className="w-full md:flex-1">
                             <AirportSearch 
                                type="to"
                                placeholder="Flying To" 
                                value={segment.to} 
                                excludeCode={segment.from?.code}
                                onChange={(val) => updateSegment(index, 'to', val)} 
                             />
                          </div>
                        </div>

                        {/* Date Group */}
                        <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
                          
                          {/* Departure Date - Forces Bottom Placement */}
                          <div className="w-full md:w-[240px]">
                            <DatePicker
                              selected={segment.date}
                              onChange={(d) => updateSegment(index, 'date', d)}
                              customInput={<CustomDateInput placeholder="Departure" />}
                              dateFormat="dd MMM, yyyy"
                              minDate={new Date()}
                              monthsShown={window.innerWidth > 768 ? 2 : 1} 
                              shouldCloseOnSelect={true}
                              popperPlacement="bottom-start" // Forces Popover Below
                            />
                          </div>

                          {/* Return Date - Forces Bottom Placement */}
                          {tripType === 'return' && index === 0 && (
                             <div className="w-full md:w-[240px]">
                                <DatePicker
                                  selected={segment.returnDate}
                                  onChange={(d) => updateSegment(index, 'returnDate', d)}
                                  customInput={<CustomDateInput placeholder="Returning" />}
                                  dateFormat="dd MMM, yyyy"
                                  minDate={segment.date || new Date()}
                                  placeholderText="Returning"
                                  monthsShown={window.innerWidth > 768 ? 2 : 1}
                                  popperPlacement="bottom-end" // Forces Popover Below
                                />
                             </div>
                          )}

                           {/* One Way Placeholder */}
                           {tripType === 'oneway' && (
                             <div className="hidden md:flex w-[240px] border border-gray-300 bg-[#F8F9FA] rounded-[4px] h-[56px] px-4 items-center gap-3 cursor-not-allowed">
                               <FaCalendarAlt className="text-gray-300" />
                               <span className="text-gray-400 text-sm font-medium">Returning</span>
                             </div>
                           )}
                           
                           {/* Remove Button for Multi-City */}
                           {tripType === 'multicity' && index > 0 && (
                             <button onClick={() => removeSegment(index)} className="text-gray-400 hover:text-red-500 w-full md:w-8 flex justify-center md:justify-start py-2 md:py-0 bg-gray-50 md:bg-transparent rounded md:rounded-none lg:absolute lg:-right-10 lg:top-1/2 lg:-translate-y-1/2">
                               <span className="md:hidden text-sm mr-2">Remove Flight</span> <FaTimes size={18} />
                             </button>
                           )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* BOTTOM ROW */}
                  <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                     <div className="w-full md:w-auto min-w-[150px]">
                       {tripType === 'multicity' && segments.length < 4 && (
                         <button 
                           onClick={addSegment} 
                           className="w-full md:w-auto flex items-center justify-center gap-2 text-[#005494] font-bold border-2 border-[#005494] rounded-[4px] px-4 py-2 hover:bg-blue-50 text-sm transition-colors whitespace-nowrap"
                         >
                           <FaPlus size={12} /> Add Destination
                         </button>
                       )}
                     </div>
                     
                     <div className="w-full flex justify-center md:justify-end">
                        <Button 
                          onClick={handleSearch} // Trigger Navigation
                          className="w-full md:w-[220px] h-[50px] !bg-[#005494] hover:!bg-[#004080] !text-white !font-bold !text-[16px] !rounded-[4px] shadow-md flex items-center justify-center gap-2"
                        >
                          <FaSearch size={14} /> Search Flights
                        </Button>
                     </div>
                  </div>
                </>
              ) : (
                <div className="h-48 flex flex-col items-center justify-center text-gray-400">
                  <span className="text-4xl mb-2">🚧</span>
                  <p>Booking engine for {activeTab} is coming soon.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* =========================================
          CONTENT SECTIONS
      ========================================= */}
      <div className="bg-[#F4F7FA] pb-12">
        
        {/* Support Strip */}
        <div className="bg-[#EBF5FF] py-5 border-y border-blue-50 shadow-sm">
          <div className="max-w-[1140px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
             <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-[52px] h-[52px] rounded-full overflow-hidden border-2 border-white shadow-sm">
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" alt="Asma" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex flex-col">
                   <h3 className="text-[#1A2B49] font-bold text-[16px] leading-tight">24/7 Customer Support</h3>
                   <p className="text-[#5E6D77] text-[13px]">Speak to Asma or another travel expert</p>
                </div>
             </div>
             <div className="flex items-center gap-8 md:gap-12">
                <div className="flex items-start gap-3">
                   <FiPhoneCall className="text-[#005494] mt-1" size={20} />
                   <div className="flex flex-col">
                      <span className="text-[#5E6D77] text-[12px] leading-none mb-1">Call</span>
                      <a href="tel:05815551456" className="text-[#005494] font-bold text-[15px] hover:underline decoration-1 underline-offset-2">05815-551456</a>
                   </div>
                </div>
                <div className="flex items-start gap-3">
                   <FaWhatsapp className="text-[#005494] mt-1" size={22} />
                   <div className="flex flex-col">
                      <span className="text-[#5E6D77] text-[12px] leading-none mb-1">WhatsApp</span>
                      <a href="https://wa.me/923555118812" target="_blank" rel="noreferrer" className="text-[#005494] font-bold text-[15px] hover:underline decoration-1 underline-offset-2">0355-5118812</a>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* App Download Card */}
        <div className="max-w-[1140px] mx-auto px-4 mt-8">
           <div className="bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col md:flex-row overflow-hidden items-center">
              <div className="w-full md:w-[280px] h-[200px] relative">
                 <img src="https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?q=80&w=800&auto=format&fit=crop" alt="Tropical Beach" className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
              </div>
              <div className="flex-1 p-6 md:pl-10 flex flex-col justify-center">
                 <h2 className="text-[22px] font-bold text-[#1A2B49] mb-2">Get PKR 500 off - download the app now</h2>
                 <p className="text-[#5E6D77] text-[14px] mb-6">Use promo code <span className="font-bold text-black">WELCOME</span> & save <span className="font-bold text-black">PKR 500</span> on the app.</p>
                 <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 bg-black text-white px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-colors">
                       <FaApple size={24} />
                       <div className="flex flex-col items-start leading-none"><span className="text-[9px] uppercase">Download on the</span><span className="text-[13px] font-bold">App Store</span></div>
                    </button>
                    <button className="flex items-center gap-2 bg-black text-white px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-colors">
                       <FaGooglePlay size={20} />
                       <div className="flex flex-col items-start leading-none"><span className="text-[9px] uppercase">Get it on</span><span className="text-[13px] font-bold">Google Play</span></div>
                    </button>
                    <span className="text-[#9AA5B1] text-xs ml-2 hidden md:inline-block">Available on iOS and Android</span>
                 </div>
              </div>
              <div className="hidden md:flex items-center justify-center pr-10 border-l border-gray-100 h-[140px] pl-8">
                 <div className="bg-white p-2 rounded-lg border border-gray-200"><BsQrCode size={80} className="text-[#1A2B49]" /></div>
              </div>
           </div>
        </div>

        {/* ESIM PROMO */}
        <div className="max-w-[1140px] mx-auto px-4 mt-10">
           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
              <div className="z-10 max-w-lg">
                 <h2 className="text-[24px] font-bold text-[#1A2B49] mb-2">Get 10% off on your Travel eSIMs.</h2>
                 <p className="text-[#5E6D77] text-[15px] mb-4">Get travel eSIMs for 200+ destinations. Buy data for any country or region.</p>
                 <div className="flex items-center gap-2 text-xs text-gray-400"><span>Powered by</span><span className="font-bold text-[#1A2B49] text-lg tracking-tight">airalo</span></div>
              </div>
              <div className="md:absolute md:right-0 md:top-0 h-full w-full md:w-[400px] mt-6 md:mt-0 flex justify-end">
                 <img src="https://cdn.pixabay.com/photo/2020/04/24/18/14/credit-card-5088219_1280.png" alt="eSIM Cards" className="h-[180%] object-contain -mr-10 -mt-10 opacity-90 rotate-[-10deg]" />
              </div>
           </div>
        </div>

        {/* REVIEWS SLIDER */}
        <div className="max-w-[1140px] mx-auto px-4 mt-16 text-center relative">
           
           {/* Review Header */}
           <div className="flex items-center justify-center gap-4 mb-10">
              <span className="font-bold text-[#1A2B49] text-xl">Excellent</span>
              <div className="flex gap-1 text-[#F5A623]">
                 <FaStar size={20} /><FaStar size={20} /><FaStar size={20} /><FaStar size={20} /><FaStarHalfAlt size={20} />
              </div>
              <span className="text-[#1A2B49]">
                 <span className="font-bold">4.8</span> based on <span className="font-bold">{REVIEWS_DATA.length}</span> reviews
              </span>
           </div>

           {/* SLIDER COMPONENT */}
           <div className="px-8 md:px-12 relative">
             <Slider ref={sliderRef} {...sliderSettings}>
               {REVIEWS_DATA.map((review) => (
                 <div key={review.id} className="px-3 pb-5 outline-none">
                   <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-left hover:shadow-md transition-shadow relative h-full flex flex-col">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-[#005494]">
                          <FaUser />
                        </div>
                        <div>
                           <h4 className="font-bold text-[#1A2B49] text-sm">{review.name}</h4>
                           <div className="flex text-[#F5A623] text-xs">
                              {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
                              {[...Array(5-review.rating)].map((_, i) => <FaStar key={i} className="text-gray-200" />)}
                           </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-[#005494] text-xs font-bold mb-3">
                         <FaCheckCircle /> Verified Customer
                      </div>
                      <p className="text-[#1A2B49] text-[15px] mb-8 flex-grow">
                         "{review.text}"
                      </p>
                      <div className="text-xs text-gray-400 mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                         <span>{review.location}</span>
                         <span>{review.time}</span>
                      </div>
                   </div>
                 </div>
               ))}
             </Slider>
           </div>

           {/* Reviews Footer */}
           <div className="flex justify-end mt-4 items-center gap-4 pr-12 relative">
              <button 
                onClick={toggleAutoPlay}
                className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-[#005494] transition-colors bg-white border border-gray-200 px-3 py-1.5 rounded-full shadow-sm"
              >
                {isPlaying ? <><FaPause size={10} /> Pause</> : <><FaPlay size={10} /> Play</>}
              </button>

              <div className="flex items-center gap-1 text-gray-800 font-bold text-sm opacity-80">
                <FaStar className="text-black" /> REVIEWS.io
              </div>
           </div>
        </div>
        
        {/* STATS */}
        <div className="bg-[#F4F7FA] pt-16 pb-12">
           <div className="max-w-[1140px] mx-auto px-4 mb-20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                 <div className="flex flex-col items-center group">
                    <div className="h-[120px] flex items-end mb-6 transition-transform group-hover:scale-110 duration-300">
                       <FcCustomerSupport size={100} />
                    </div>
                    <h3 className="text-[#1A2B49] font-bold text-[17px]">24/7 Customer Support</h3>
                 </div>
                 <div className="flex flex-col items-center group">
                    <div className="h-[120px] flex items-end mb-6 transition-transform group-hover:scale-110 duration-300">
                       <FcMoneyTransfer size={100} />
                    </div>
                    <h3 className="text-[#1A2B49] font-bold text-[17px]">Refunds within 48 hours</h3>
                 </div>
                 <div className="flex flex-col items-center group">
                    <div className="h-[120px] flex items-end mb-6 transition-transform group-hover:scale-110 duration-300">
                       <FcPrivacy size={100} />
                    </div>
                    <h3 className="text-[#1A2B49] font-bold text-[17px]">Secure Transaction Guaranteed</h3>
                 </div>
              </div>
           </div>

           <div className="bg-white py-12 border-t border-gray-200">
              <div className="max-w-[1140px] mx-auto px-4">
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="flex items-center gap-4 justify-center md:justify-start group">
                       <PiAirplaneTiltFill className="text-[#005494] text-4xl group-hover:scale-110 transition-transform" />
                       <div className="flex flex-col">
                          <span className="text-[#1A2B49] font-extrabold text-2xl tracking-tight">700k+</span>
                          <span className="text-[#5E6D77] text-sm font-medium">Flights booked</span>
                       </div>
                    </div>
                    <div className="flex items-center gap-4 justify-center md:justify-start group">
                       <PiBusFill className="text-[#005494] text-4xl group-hover:scale-110 transition-transform" />
                       <div className="flex flex-col">
                          <span className="text-[#1A2B49] font-extrabold text-2xl tracking-tight">300k+</span>
                          <span className="text-[#5E6D77] text-sm font-medium">Buses booked</span>
                       </div>
                    </div>
                    <div className="flex items-center gap-4 justify-center md:justify-start group">
                       <PiBuildingsFill className="text-[#005494] text-4xl group-hover:scale-110 transition-transform" />
                       <div className="flex flex-col">
                          <span className="text-[#1A2B49] font-extrabold text-2xl tracking-tight">50k+</span>
                          <span className="text-[#5E6D77] text-sm font-medium">Hotels booked</span>
                       </div>
                    </div>
                    <div className="flex items-center gap-4 justify-center md:justify-start group">
                       <PiGaugeFill className="text-[#005494] text-4xl group-hover:scale-110 transition-transform" />
                       <div className="flex flex-col">
                          <span className="text-[#1A2B49] font-extrabold text-2xl tracking-tight">20m+</span>
                          <span className="text-[#5E6D77] text-sm font-medium">Kilometres traveled</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

      </div>
      <FeaturedPartners />

    </div>
  );
};

// --- SUB-COMPONENTS ---

const TabButton = ({ id, label, icon: Icon, active, onClick }) => (
  <button 
    onClick={() => onClick(id)}
    className={`flex items-center gap-2 px-8 py-4 text-[15px] font-bold rounded-t-lg transition-all relative top-[1px]
      ${active === id 
        ? 'bg-white text-[#005494] z-20 shadow-[0_-4px_6px_rgba(0,0,0,0.05)]' 
        : 'bg-transparent text-white hover:bg-white/10'
      }`}
  >
    <Icon size={16} />
    <span className="whitespace-nowrap">{label}</span>
  </button>
);

const TripTypeButton = ({ id, label, active, onClick }) => (
  <button 
    onClick={() => onClick(id)}
    className={`px-4 py-1.5 rounded-full text-[13px] font-bold transition-all border whitespace-nowrap
      ${active === id 
        ? 'bg-[#FFF8E1] text-[#005494] border-[#F5A623]' 
        : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
      }`}
  >
    {label}
  </button>
);

const TravelerRow = ({ label, sub, count, onInc, onDec }) => (
  <div className="flex justify-between items-center mb-4 last:mb-0">
    <div>
      <div className="font-bold text-gray-800 text-[15px]">{label}</div>
      <div className="text-xs text-gray-500">{sub}</div>
    </div>
    <div className="flex items-center gap-3">
      <button onClick={onDec} disabled={count === 0} className="w-7 h-7 rounded-full border border-[#005494] text-[#005494] flex items-center justify-center disabled:opacity-30 hover:bg-blue-50">
        <FaMinus size={10} />
      </button>
      <span className="w-4 text-center font-bold text-sm">{count}</span>
      <button onClick={onInc} className="w-7 h-7 rounded-full border border-[#005494] text-[#005494] flex items-center justify-center hover:bg-blue-50">
        <FaPlus size={10} />
      </button>
    </div>
  </div>
);

// --- SLIDER ARROWS ---
const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
  <button
    {...props}
    className={"absolute top-1/2 -left-4 md:-left-6 -translate-y-1/2 z-10 bg-[#EBF5FF] hover:bg-blue-100 text-[#005494] w-8 h-10 md:w-10 md:h-12 flex items-center justify-center rounded-sm shadow-sm transition-colors slick-arrow-custom" + (currentSlide === 0 ? ' opacity-50 cursor-not-allowed' : '')}
    aria-label="Previous"
    type="button"
  >
    <FaChevronLeft size={14} />
  </button>
);

const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
  <button
    {...props}
    className={"absolute top-1/2 -right-4 md:-right-6 -translate-y-1/2 z-10 bg-[#EBF5FF] hover:bg-blue-100 text-[#005494] w-8 h-10 md:w-10 md:h-12 flex items-center justify-center rounded-sm shadow-sm transition-colors slick-arrow-custom" + (currentSlide === slideCount - 1 ? ' opacity-50 cursor-not-allowed' : '')}
    aria-label="Next"
    type="button"
  >
    <FaChevronRight size={14} />
  </button>
);

export default Home;