import React, { useState, useEffect, useRef } from 'react';
import { FaPlaneDeparture, FaPlaneArrival, FaPlane } from 'react-icons/fa';
import airportsData from '../../data/airports.json';

const AirportSearch = ({ type, value, onChange, placeholder, excludeCode }) => {
  const [searchTerm, setSearchTerm] = useState(value ? `${value.city} (${value.code})` : '');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const Icon = type === 'from' ? FaPlaneDeparture : FaPlaneArrival;

  useEffect(() => {
    if (searchTerm.length > 0 && isOpen) {
      const filtered = airportsData.filter(airport => {
        // 1. Exclude the airport selected in the other field
        if (excludeCode && airport.code === excludeCode) return false;

        // 2. Search logic
        return (
          airport.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          airport.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          airport.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setSuggestions(filtered.slice(0, 10)); 
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, isOpen, excludeCode]);

  useEffect(() => {
    if (value) {
      setSearchTerm(`${value.city} (${value.code})`);
    } else {
      setSearchTerm('');
    }
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (airport) => {
    onChange(airport);
    setSearchTerm(`${airport.city} (${airport.code})`);
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
      setSearchTerm(e.target.value);
      if (!isOpen) setIsOpen(true);
      if (e.target.value === '') {
          onChange(null);
      }
  };

  return (
    <div className="relative flex-1" ref={wrapperRef}>
      <div className="flex items-center h-[56px] border border-gray-300 bg-white rounded-[4px] px-4 transition-all hover:border-[#005494] focus-within:border-[#005494] focus-within:shadow-[0_0_0_1px_#005494] group">
        <Icon className="text-gray-500 mr-3 group-hover:text-[#005494]" />
        <div className="flex-1">
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
            className="w-full text-sm font-bold text-[#1A2B49] placeholder:text-gray-400 placeholder:font-medium outline-none bg-transparent"
          />
        </div>
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-[4px] shadow-lg mt-1 z-50 max-h-[300px] overflow-y-auto animate-in fade-in zoom-in-95 duration-100">
          {suggestions.map((airport) => (
            <div
              key={airport.code}
              onClick={() => handleSelect(airport)}
              className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-0 group"
            >
              <div className="flex items-center gap-3">
                <FaPlane className="text-gray-400 group-hover:text-[#005494]" />
                <div>
                  <div className="text-sm font-bold text-[#1A2B49]">
                    {airport.city} <span className="text-gray-500">({airport.code})</span>
                  </div>
                  <div className="text-xs text-gray-500 truncate max-w-[180px]">{airport.name}</div>
                </div>
              </div>
              <div className="text-xs text-gray-400 font-medium">{airport.country}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AirportSearch;