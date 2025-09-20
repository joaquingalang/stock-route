import OrderItemTile from "../components/OrderItemTile";
import { useState } from "react";
import ApprovalItemDetails from "../components/ApprovalItemDetails";
import OrderTableHeader from "../components/OrderTableHeader";
import OrderFilterButtons from "../components/OrderFilterButtons";
import WarehouseTabs from "../components/WarehouseTabs";
import EditInboundPopup from "../components/EditInboundPopup";

function WarehousePage() {

  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState("inbound");

  // Inbound Data - Items coming into warehouse
  const inboundData = [
    {
      po_id: "PO-2025-001",
      supplier_id: "HAUL-SUP-123", 
      product_type: "Accessories",
      order_qty: 3,
      received_qty: 3,
      damaged: 0,
      spoiled: 0,
      missing: 0,
      rejected: 0
    },
   
  ];

  // Outbound Data - Items going out of warehouse
  const outboundData = [
    {
      so_id: "SO-2025-045",
      cust_id: "CUST-0098",
      product_type: "Accessories",
      order_qty: 3,
      shipped_qty: 3,
      pending: 0,
      returned: 0,
      status: "shipped"
    },
   
  ];

  // Stock Data - Current inventory
  const stockData = [
    {
      product_id: "PROD-1001",
      product_name: "Leather Belt",
      product_type: "Accessories",
      total_inbound_qty: 120,
      total_outbound_qty: 90,
      available_stock: 30,
      damaged_spoiled: 2,
      last_updated: "2025-09-18"
    },
   
  ];

  const inboundColumns = [
    { field: "po_id", label: "Product Order ID" },
    { field: "supplier_id", label: "Supplier ID" },
    { field: "product_type", label: "Product Type" },
    { field: "order_qty", label: "Ordered Qty" },
    { field: "received_qty", label: "Received Qty" },
    { field: "damaged", label: "Damaged" },
    { field: "spoiled", label: "Spoiled" },
    { field: "missing", label: "Missing" },
    { field: "rejected", label: "Rejected" },
  ];

  const outboundColumns = [
  { field: "so_id", label: "SO Number" },
  { field: "cust_id", label: "Customer ID" },
  { field: "product_type", label: "Product Type" },
  { field: "order_qty", label: "Ordered Qty" },
  { field: "shipped_qty", label: "Shipped Qty" },
  { field: "status", label: "Status" }
];

const stockColumns = [
  { field: "product_id", label: "Product ID" },
  { field: "product_name", label: "Product Name" },
  { field: "product_type", label: "Product Type" },
  { field: "total_inbound_qty", label: "Total Inbound Qty" },
  { field: "total_outbound_qty", label: "Total Outbound Qty" },
  { field: "available_stock", label: "Available Stock" },
  { field: "damaged_spoiled", label: "Damaged/Spoiled" },
  { field: "last_updated", label: "Last Updated" }
];

  const handleOrderClick = (...args) => {
  if (activeTab === "inbound") {
    const [po_id, supplier_id, product_type, order_qty, received_qty] = args;
    setSelectedOrder({ po_id, supplier_id, product_type, order_qty, received_qty });
    setShowModal(true);
  } 
};

  const getCurrentData = () => {
    switch(activeTab) {
      case "inbound": return { data: inboundData, columns: inboundColumns };
      case "outbound": return { data: outboundData, columns: outboundColumns };
      case "stock": return { data: stockData, columns: stockColumns };
      default: return { data: [], columns: [] };
    }
  };

  const { data, columns } = getCurrentData();
 
  return (
    <div className="col-span-16 h-screen">
      <div className="grid grid-cols-16">
        {/* Main Dashboard */}
        <div className="col-span-16">
          <div className="m-6">
            <div className="grid grid-cols-8 grid-rows-8 gap-5">
              <div className="col-span-12 row-span-10 p-4">
                <h1 className="font font-semibold text-3xl mb-5">Warehouse</h1>
                 <WarehouseTabs 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
                <OrderTableHeader columns={columns} />

                <div className="overflow-y-auto max-h-150">
                  {data.map((value) => (
                    <OrderItemTile
                      columns={columns}
                      order={value}
                      onClick={handleOrderClick}
                    />
                  ))}
                  
                </div>
                 {showModal && selectedOrder && activeTab === "inbound" && (
                    <EditInboundPopup
                      show={showModal}
                      onClick={() => setShowModal(false)}
                      {...selectedOrder}
                    />
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WarehousePage;
