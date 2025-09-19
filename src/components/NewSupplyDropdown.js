import React, { useState, useRef, useEffect } from 'react';

function NewSupplyDropdown({ onSelect, placeholder = "Select Supplier" , suppliers }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const dropdownRef = useRef(null);

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle option selection
  const handleSelect = (supplier) => {
    setSelectedValue(supplier);
    setIsOpen(false);
    onSelect(supplier); 
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={toggleDropdown}
        className="w-32 border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center"
      >
        <span className="truncate">
          {selectedValue || placeholder}
        </span>
        <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border rounded-md shadow-lg z-10 overflow-y-auto max-h-30">
          {suppliers.map((supplier) => (
            <button
              key={supplier}
              type="button"
              onClick={() => handleSelect(supplier)}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
            >
              {supplier}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default NewSupplyDropdown;