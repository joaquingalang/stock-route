import OrderItemTile from "../components/OrderItemTile";
import { useState } from "react";
import ApprovalItemDetails from "../components/ApprovalItemDetails";
import OrderTableHeader from "../components/OrderTableHeader";
import OrderFilterButtons from "../components/OrderFilterButtons";

function WarehousePage() {
  // have outbound section have an editable tile.
  // DONT FORGET TO PULL ORIGIN FROM MASTER!!!

  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState("all");

  const handleOrderClick = (cust_id, order_id, amount, status, date) => {
    setSelectedOrder({ cust_id, order_id, amount, status, date });
    setShowModal(true);
  };

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
    { field: "rejected", label: "Rejected" },
  ];

  const outboundColumns = [
    { field: "po_id", label: "Product Order ID" },
    { field: "supplier_id", label: "Supplier ID" },
    { field: "product_type", label: "Product Type" },
    { field: "order_qty", label: "Ordered Qty" },
    { field: "received_qty", label: "Received Qty" },
    { field: "damaged", label: "Damaged" },
    { field: "spoiled", label: "Spoiled" },
    { field: "missing", label: "Missing" },
    { field: "rejected", label: "Rejected" },
    { field: "rejected", label: "Rejected" },
  ];

  const stockColumns = [
    { field: "so_id", label: "Supplier Order ID" },
    { field: "cust_id", label: "Customer ID" },
    { field: "product_type", label: "Product Type" },
    { field: "order_qty", label: "Ordered Qty" },
    { field: "received_qty", label: "Received Qty" },
    { field: "damaged", label: "Damaged" },
    { field: "spoiled", label: "Spoiled" },
    { field: "missing", label: "Missing" },
    { field: "rejected", label: "Rejected" },
    { field: "rejected", label: "Rejected" },
  ];

  const [bills, setBills] = useState([
    {
      po_id: "PO-2025-001",
      supplier_id: "HAU-SUP-123",
      product_type: "Accessories",
      order_qty: 3,
      received_qty: 3,
      damaged: 1,
      spoiled: 3,
      missing: 2,
      rejected: 1,
    },
  ]);

  return (
    <div className="col-span-16 h-screen">
      <div className="grid grid-cols-16">
        {/* Main Dashboard */}
        <div className="col-span-16">
          <div className="m-6">
            <div className="grid grid-cols-8 grid-rows-8 gap-5">
              <div className="col-span-12 row-span-10 p-4">
                <h1 className="font font-semibold text-3xl mb-5">Billing</h1>
                <OrderTableHeader columns={inboundColumns} />

                <div className="overflow-y-auto max-h-150">
                  {(filter !== "all"
                    ? bills.filter((order) => order.status === filter)
                    : bills
                  ).map((bill, idx) => (
                    <OrderItemTile
                      columns={inboundColumns}
                      order={bill}
                      onClick={handleOrderClick}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WarehousePage;
