import React, { useRef, useState } from 'react';
import Slider from "react-slick";
import { FaPlay, FaPause } from 'react-icons/fa';

// --- ACCURATE AIRLINE DATA (Mapped to IATA Codes for the CDN) ---
const PARTNERS = [
  // --- PAKISTAN (Priority) ---
  { name: "Air Sial", code: "PF" },
  { name: "PIA", code: "PK" },
  { name: "Serene Air", code: "ER" },
  { name: "Fly Jinnah", code: "9P" },
  { name: "Airblue", code: "PA" },

  // --- MIDDLE EAST ---
  { name: "Fly Dubai", code: "FZ" },
  { name: "Air Arabia", code: "G9" },
  { name: "Emirates", code: "EK" },
  { name: "Saudia", code: "SV" },
  { name: "Qatar Airways", code: "QR" },
  { name: "Etihad Airways", code: "EY" },
  { name: "Gulf Air", code: "GF" },
  { name: "Oman Air", code: "WY" },
  { name: "Flynas", code: "XY" },
  { name: "Jazeera Airways", code: "J9" },
  { name: "SalamAir", code: "OV" },
  { name: "Flyadeal", code: "F3" },

  // --- TURKEY & EUROPE ---
  { name: "Turkish Airlines", code: "TK" },
  { name: "Pegasus Airlines", code: "PC" },
  { name: "British Airways", code: "BA" },
  { name: "Virgin Atlantic", code: "VS" },
  { name: "Azerbaijan Airlines", code: "J2" },

  // --- ASIA ---
  { name: "Thai Airways", code: "TG" },
  { name: "AirAsia", code: "AK" },
  { name: "Batik Air", code: "OD" },
  { name: "SriLankan Airlines", code: "UL" },
  { name: "Air China", code: "CA" },
  { name: "China Southern", code: "CZ" },
  
  // --- AFRICA ---
  { name: "Ethiopian Airlines", code: "ET" },
  { name: "Kenya Airways", code: "KQ" },

  // --- AMERICAS ---
  { name: "American Airlines", code: "AA" },
  { name: "Air Canada", code: "AC" },
  { name: "United Airlines", code: "UA" },
];

const FeaturedPartners = () => {
  const sliderRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleAutoPlay = () => {
    if (isPlaying) {
      sliderRef.current.slickPause();
    } else {
      sliderRef.current.slickPlay();
    }
    setIsPlaying(!isPlaying);
  };
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 4000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2 } // Showing 2 larger logos on mobile
      }
    ]
  };

  const CDN_BASE = "https://d1fugymezotnfx.cloudfront.net/feature-partner/";

  return (
    <div className="bg-white py-8 md:py-12 border-t border-gray-100 relative">
      <div className="max-w-[1140px] mx-auto px-4 relative">
        
        {/* Header */}
        <div className="mb-6 md:mb-10 text-center md:text-left">
           <h2 className="text-[20px] md:text-[22px] font-bold text-[#1A2B49]">Featured Partners</h2>
           <p className="text-[#5E6D77] text-sm">Domestic & International</p>
        </div>

        {/* Slider */}
        <div className="px-0 md:px-2 mb-4 md:mb-8">
          <Slider ref={sliderRef} {...settings}>
            {PARTNERS.map((airline, index) => (
              // Reduced padding (px-2) on mobile to give logos more space
              <div key={index} className="px-2 md:px-6 h-20 md:h-24 flex items-center justify-center outline-none">
                <div className="w-full h-full flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
                  <img 
                    src={`${CDN_BASE}${airline.code}.webp`} 
                    alt={airline.name} 
                    // Adjusted sizes: h-12 on mobile, h-16 on desktop
                    className="h-12 md:h-16 w-auto object-contain cursor-pointer transform hover:scale-110 transition-transform duration-300"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Pause/Play Button (Bottom Right) */}
        <div className="flex justify-center md:justify-end pr-0 md:pr-4">
          <button 
            onClick={toggleAutoPlay}
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#005494] transition-colors bg-white border border-gray-200 px-3 py-1.5 rounded-full shadow-sm z-10"
          >
            {isPlaying ? (
              <>
                <FaPause size={10} /> Pause
              </>
            ) : (
              <>
                <FaPlay size={10} /> Play
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default FeaturedPartners;