import { useState } from "react";
import EditInboundInput from "./EditInboundInput";

function EditInboundPopup({
  show,
  onClick,
  po_id,
  supplier_id,
  product_type,
  order_qty,
  received_qty,
  damaged,
  spoiled,
  missing,
  rejected,
}) {
  // Initialize state with actual data values
  const [formData, setFormData] = useState({
    po_id: po_id || "",
    supplier_id: supplier_id || "",
    product_type: product_type || "",
    order_qty: order_qty || 0,
    received_qty: received_qty || 0,
    damaged: damaged || 0,
    spoiled: spoiled || 0,
    missing: missing || 0,
    rejected: rejected || 0,
  });

  function getLabel(data) {
    switch (data) {
      case "po_id":
        return "PO ID";
      case "supplier_id":
        return "Supplier ID";
      case "product_type":
        return "Product Type";
      case "order_qty":
        return "Order Quantity";
      case "received_qty":
        return "Received Quantity";
      case "damaged":
        return "Damaged";
      case "spoiled":
        return "Spoiled";
      case "missing":
        return "Missing";
      case "rejected":
        return "Rejected";
    }
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Edit Inbound Item</h2>

        <div className="space-y-4">
          {Object.keys(formData).map((key) => {
            return (
                <div className="grid grid-cols-2 gap-4">
                    <h1 className="font-semibold">{getLabel(key)}</h1>
                    <EditInboundInput
                key={key}
                label={getLabel(key)}
                value={formData[key]}
                type={typeof formData[key] === "number" ? "number" : "text"}
                onChange={(e) => handleInputChange(key, e.target.value)}
              />
                </div>
            );
          })}
        </div>

        <div className="flex gap-2 mt-6">
          <button
            onClick={() => {}}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
          <button
            onClick={onClick}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditInboundPopup;
