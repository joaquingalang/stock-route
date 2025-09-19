import { useState } from "react";

function getFilterButtonStyle(filter, buttonFilter) {
  if (filter === buttonFilter) {
    return "font-semibold";
  } else {
    return "font-semibold text-gray-400";
  }
}

function OrderFilterButtons({ currentFilter, onFilterChange, filters}) {

  return (
    <div className="grid grid-cols-4 gap-4 p-4 mb-3 items-center">
      {filters.map((filterItem) => {
        return (
          <button
            key={filterItem.value}
            onClick={() => onFilterChange(filterItem.value)}
          >
            <h1
              className={getFilterButtonStyle(currentFilter, filterItem.value)}
            >
              {filterItem.label}
            </h1>
          </button>
        );
      })}
    </div>
  );
}

export default OrderFilterButtons;
