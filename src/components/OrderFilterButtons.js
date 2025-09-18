 function getFilterButtonStyle(filter, buttonFilter) {
    if (filter === buttonFilter) {
      return "font-semibold"; 
    } else {
      return "font-semibold text-gray-400"; 
    }
  }


function OrderFilterButtons({currentFilter, onFilterChange}){
  return ( 
     <div className="grid grid-cols-4 gap-4 p-4 mb-3 items-center">
        <button onClick={() => onFilterChange("all")}>
          <h1 className={getFilterButtonStyle(currentFilter, "all")}>All Orders</h1>
        </button>
        <button onClick={() => onFilterChange("progress")}>
          <h1 className={getFilterButtonStyle(currentFilter, "progress")}>In Progress</h1>
        </button>
        <button onClick={() => onFilterChange("ready")}>
          <h1 className={getFilterButtonStyle(currentFilter, "ready")}>Ready for Shipping</h1>
        </button>
        <button onClick={() => onFilterChange("completed")}>
          <h1 className={getFilterButtonStyle(currentFilter, "completed")}>Completed</h1>
        </button>
      </div>
  );  
}

export default OrderFilterButtons;