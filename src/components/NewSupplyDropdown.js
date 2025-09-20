import React, { useState, useRef, useEffect } from 'react';

function NewSupplyDropdown({ onSelect, placeholder = "Select Option", suppliers}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const dropdownRef = useRef(null);

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle option selection
  const handleSelect = (item) => {
    setSelectedValue(item.supplier_name || item.product_name);
    setIsOpen(false);
    onSelect(item); 
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

  // Add null check for suppliers
  if (!suppliers || !Array.isArray(suppliers)) {
    return <div>No options available</div>;
  }

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
          ▼
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border rounded-md shadow-lg z-10 overflow-y-auto max-h-30">
          {suppliers.map((item, index) => (
            <button
              key={item.supplier_id || item.product_id}
              type="button"
              onClick={() => handleSelect(item)}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
            >
              {`${index + 1} - (${item.supplier_name || item.product_name})`}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default NewSupplyDropdown;