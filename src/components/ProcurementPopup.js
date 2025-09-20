import { useState } from "react";
import EditInboundInput from "./EditInboundInput";
import NewSupplyDropdown from "./NewSupplyDropdown";

function ProcurementPopup({
  show,
  onClose,
  onClick,
  suppliers,
  products,
  inboundDataLength = 0 // Pass the length of inboundData
}) {
  // Initialize state without po_id since it will be auto-generated
  const [formData, setFormData] = useState({
    supplier_id: "",
    product_id: "",
    order_qty: 0,
    received_qty: 0,
    damaged: 0,
    missing: 0,
    rejected: 0,
  });

  function getLabel(data) {
    switch (data) {
      case "supplier_id":
        return "Supplier ID";
      case "product_id":
        return "Product ID";
      case "order_qty":
        return "Order Quantity";
      case "received_qty":
        return "Received Quantity";
      case "damaged":
        return "Damaged";
      case "missing":
        return "Missing";
      case "rejected":
        return "Rejected";
      default:
        return data;
    }
  }

  const handleInputChange = (field, value) => {
    console.log(`Changing ${field} to:`, value);
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Function to generate PO ID based on current length
  const generatePOId = () => {
    const currentYear = new Date().getFullYear();
    const nextIndex = inboundDataLength + 1;
    
    // Format: PO-2025-001
    return `PO-${currentYear}-${nextIndex.toString().padStart(3, '0')}`;
  };

  const handleSave = () => {
    // Generate PO ID when saving
    const po_id = generatePOId();
    
    const completeFormData = {
      po_id,
      ...formData
    };
    
    console.log("New procurement form data:", completeFormData);
    onClick(completeFormData); 
    onClose(); 
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full max-h-120 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Create Procurement Form</h2>
        
        {/* Show what the PO ID will be */}
        <div className="mb-4 p-3 bg-gray-100 rounded">
          <span className="text-sm text-gray-600">Purchase Order ID will be: </span>
          <span className="font-semibold">{generatePOId()}</span>
        </div>

        <div className="space-y-4">
          {Object.keys(formData).map((key) => {
            console.log(`Rendering field: ${key}`);
            return (
              <div key={key} className="flex flex-col gap-2">
                <label className="font-semibold text-sm">{getLabel(key)}</label>
                {key === "supplier_id" ? (
                  <NewSupplyDropdown
                    suppliers={suppliers}
                    placeholder="Select Supplier"
                    onSelect={(supplier) =>
                      handleInputChange(key, supplier.supplier_id)
                    }
                  />
                ) : key === "product_id" ? (
                  <NewSupplyDropdown
                    suppliers={products}
                    placeholder="Select Product"
                    onSelect={(product) =>
                      handleInputChange(key, product.product_id)
                    }
                  />
                ) : (
                  <EditInboundInput
                    label=""
                    value={formData[key]}
                    type={typeof formData[key] === "number" ? "number" : "text"}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="flex gap-2 mt-6">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProcurementPopup;