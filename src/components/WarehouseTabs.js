function WarehouseTabs({ activeTab, onTabChange }) {
  const tabs = [
    {
      value: "inbound",
      label: "Inbound",
    },
    {
      value: "outbound",
      label: "Outbound",
    },
    {
      value: "stock",
      label: "Stock",
    },
  ];

  const getTabStyle = (tab) => {
    if (activeTab === tab) {
      return "font-semibold";
    } else {
      return "font-semibold text-gray-400";
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4 mb-3 items-center">
      {tabs.map((tab) => {
        return (
          <button onClick={() => onTabChange(tab.value)}>
            <h1 className={getTabStyle(tab.value)}>{tab.label}</h1>
          </button>
        );
      })}
    </div>
  );
}

export default WarehouseTabs;
