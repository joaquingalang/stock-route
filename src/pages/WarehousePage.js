import OrderItemTile from "../components/OrderItemTile";
import { useState } from "react";
import ApprovalItemDetails from "../components/ApprovalItemDetails";
import OrderTableHeader from "../components/OrderTableHeader";
import OrderFilterButtons from "../components/OrderFilterButtons";
import WarehouseTabs from "../components/WarehouseTabs";
import EditInboundPopup from "../components/EditInboundPopup";
import ProcurementPopup from "../components/ProcurementPopup";

function WarehousePage() {
  const [showModal, setShowModal] = useState(false);
  const [showProcurementModal, setShowProcurementModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState("inbound");

  const suppliers = [
    { supplier_id: "HAUL-SUP-123", supplier_name: "Supplier Name 1" },
    { supplier_id: "HAUL-SUP-124", supplier_name: "Supplier Name 2" },
    { supplier_id: "HAUL-SUP-125", supplier_name: "Supplier Name 3" },
  ];

  const products = [
    { product_id: "PROD-1001", product_name: "Leather Belt" },
    { product_id: "PROD-1002", product_name: "Cotton Shirt" },
    { product_id: "PROD-1003", product_name: "Denim Jeans" },
  ];

  // Inbound Data - Items coming into warehouse
  const [inboundData, setInboundData] = useState([
    {
      po_id: "PO-2025-001",
      supplier_id: "HAUL-SUP-123",
      product_id: "PROD-1001",
      order_qty: 3,
      received_qty: 3,
      damaged: 0,
      missing: 0,
      rejected: 0,
    },
  ]);

  // Outbound Data - Items going out of warehouse
  const outboundData = [
    {
      so_id: "SO-2025-045",
      cust_id: "CUST-0098",
      product_id: "PROD-1001",
      order_qty: 3,
      shipped_qty: 3,
      pending: 0,
      returned: 0,
      status: "shipped",
    },
  ];

  // Stock Data - Current inventory
  const stockData = [
    {
      product_id: "PROD-1001",
      product_name: "Leather Belt",
      total_inbound_qty: 120,
      total_outbound_qty: 90,
      available_stock: 30,
      damaged: 2,
      last_updated: "2025-09-18",
    },
  ];

  const inboundColumns = [
    { field: "po_id", label: "Product Order ID" },
    { field: "supplier_id", label: "Supplier ID" },
    { field: "product_id", label: "Product ID" },
    { field: "order_qty", label: "Ordered Qty" },
    { field: "received_qty", label: "Received Qty" },
    { field: "damaged", label: "Damaged" },
    { field: "missing", label: "Missing" },
    { field: "rejected", label: "Rejected" },
  ];

  const outboundColumns = [
    { field: "so_id", label: "SO Number" },
    { field: "cust_id", label: "Customer ID" },
    { field: "product_id", label: "Product ID" },
    { field: "order_qty", label: "Ordered Qty" },
    { field: "shipped_qty", label: "Shipped Qty" },
    { field: "status", label: "Status" },
  ];

  const stockColumns = [
    { field: "product_name", label: "Product Name" },
    { field: "product_id", label: "Product ID" },
    { field: "total_inbound_qty", label: "Total Inbound Qty" },
    { field: "total_outbound_qty", label: "Total Outbound Qty" },
    { field: "available_stock", label: "Available Stock" },
    { field: "damaged", label: "Damaged" },
    { field: "last_updated", label: "Last Updated" },
  ];

  // ...existing code...
const handleOrderClick = (order) => {
  if (activeTab === "inbound") {
    setSelectedOrder({
      po_id: order.po_id,
      supplier_id: order.supplier_id,
      product_id: order.product_id,
      order_qty: order.order_qty,
      received_qty: order.received_qty,
      damaged: order.damaged || 0,
      missing: order.missing || 0,
      rejected: order.rejected || 0,
    });
    setShowModal(true);
  }
  // Add handling for other tabs if needed
};
// ...existing code...

  const getCurrentData = () => {
    switch (activeTab) {
      case "inbound":
        return { data: inboundData, columns: inboundColumns };
      case "outbound":
        return { data: outboundData, columns: outboundColumns };
      case "stock":
        return { data: stockData, columns: stockColumns };
      default:
        return { data: [], columns: [] };
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
                <div className="col-span-5">
                  <div className="flex justify-between mb-4">
                    <div>
                      <h1 className="font font-semibold text-3xl">Warehouse</h1>
                    </div>
                    {activeTab === "inbound" && (
                      <button
                        className="bg-red-500 text-white font-bold p-3 rounded-md"
                        onClick={() => {
                          setShowProcurementModal(true);
                        }}
                      >
                        <span className="text-xl font-bold mr-2">+</span>
                        New Procurement Form
                      </button>
                    )}
                  </div>
                </div>

                <WarehouseTabs
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />
                <OrderTableHeader columns={columns} />

                <div className="overflow-y-auto max-h-150">
                  {data.map((value) => (
                    <OrderItemTile
                      key={value.po_id}
                      columns={columns}
                      order={value}
                      onClick={handleOrderClick}
                    />
                  ))}
                </div>
                {showModal && selectedOrder && activeTab === "inbound" && (
                  <EditInboundPopup
                    show={showModal}
                    suppliers={suppliers}
                    products={products}
                    onClick={() => setShowModal(false)}
                    onSave={(updatedData) => {
                      console.log("Updated inbound data:", updatedData);
                      setInboundData((prev) =>
                        prev.map((item) =>
                          item.po_id === selectedOrder.po_id
                            ? { ...item, ...updatedData }
                            : item
                        )
                      );
                      setShowModal(false); // Add this line to close modal after save
                    }}
                    {...selectedOrder}
                  />
                )}
                {showProcurementModal && (
                  <ProcurementPopup
                    show={showProcurementModal}
                    suppliers={suppliers}
                    products={products}
                    inboundDataLength={inboundData.length}
                    onClose={() => setShowProcurementModal(false)}
                    onClick={(newProcurementData) => {
                      console.log("New procurement:", newProcurementData);
                      // Add the new procurement data to inboundData array
                      setInboundData((prev) => [...prev, newProcurementData]);
                      setShowProcurementModal(false);
                    }}
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
