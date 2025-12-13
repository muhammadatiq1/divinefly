import React from 'react';
import { 
  FaPlane, FaBus, FaHotel, FaPassport, FaSuitcase, FaMapMarkedAlt, 
  FaUmbrellaBeach, FaCamera, FaTicketAlt, FaGlobeAmericas 
} from 'react-icons/fa';
import { GiCommercialAirplane, GiBusStop, GiPalmTree } from 'react-icons/gi';
import { RiShipFill, RiTaxiFill } from 'react-icons/ri';

const icons = [
  FaPlane, FaBus, FaHotel, FaPassport, FaSuitcase, FaMapMarkedAlt, 
  FaUmbrellaBeach, FaCamera, FaTicketAlt, FaGlobeAmericas,
  GiCommercialAirplane, GiBusStop, GiPalmTree,
  RiShipFill, RiTaxiFill
];

const BackgroundPattern = () => {
  // Create a dense grid of icons
  const iconGrid = [];
  for (let i = 0; i < 150; i++) {
    const Icon = icons[Math.floor(Math.random() * icons.length)];
    // Randomize size, rotation, and opacity for a more organic feel
    const size = Math.random() * 20 + 15; // 15px to 35px
    const rotation = Math.random() * 360;
    const opacity = Math.random() * 0.08 + 0.04; // Slightly more visible: 0.04 to 0.12

    iconGrid.push(
      <Icon
        key={i}
        style={{
          position: 'absolute',
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          transform: `rotate(${rotation}deg)`,
          opacity: opacity,
          fontSize: `${size}px`,
          color: '#ffffff', // White icons
        }}
      />
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {iconGrid}
    </div>
  );
};

export default BackgroundPattern;