import { useState, useEffect } from "react";
import EditInboundInput from "./EditInboundInput";
import NewSupplyDropdown from "./NewSupplyDropdown";

function EditInboundPopup({
  show,
  onClick,
  onSave,
  suppliers,
  products,
  po_id,
  supplier_id,
  supplier_name,
  product_id,
  product_name,
  order_qty,
  received_qty,
  damaged,
  missing,
  rejected,
}) {
  const [formData, setFormData] = useState({
    order_qty: order_qty || 0,
    received_qty: received_qty || 0,
    damaged: damaged || 0,
  });

  const [errors, setErrors] = useState({});

  // Update form data when props change
  useEffect(() => {
    setFormData({
      order_qty: order_qty || 0,
      received_qty: received_qty || 0,
      damaged: damaged || 0,
    });
    setErrors({}); // Clear errors when props change
  }, [order_qty, received_qty, damaged]);

  // Calculate missing, rejected, and net quantity
  const missing_qty = formData.order_qty - formData.received_qty;
  const rejected_qty = formData.damaged;
  const net_qty = formData.order_qty - missing_qty - formData.damaged;

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
      case "net_qty":
        return "Net Quantity";
      default:
        return data;
    }
  }

  const validateForm = () => {
    const newErrors = {};

    // Validate received quantity doesn't exceed order quantity
    if (parseInt(formData.received_qty) > parseInt(formData.order_qty)) {
      newErrors.received_qty = "Received quantity cannot exceed order quantity";
    }

    // Validate damaged quantity doesn't exceed received quantity
    if (parseInt(formData.damaged) > parseInt(formData.received_qty)) {
      newErrors.damaged = "Damaged quantity cannot exceed received quantity";
    }

    // Validate non-negative values
    if (parseInt(formData.received_qty) < 0) {
      newErrors.received_qty = "Received quantity cannot be negative";
    }

    if (parseInt(formData.damaged) < 0) {
      newErrors.damaged = "Damaged quantity cannot be negative";
    }

    if (parseInt(formData.order_qty) < 0) {
      newErrors.order_qty = "Order quantity cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    const numValue = parseInt(value) || 0;
    
    setFormData((prev) => ({
      ...prev,
      [field]: numValue,
    }));

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSave = () => {
    if (!validateForm()) {
      return; // Don't save if validation fails
    }

    const updatedData = {
      po_id, // Include po_id in the saved data
      order_qty: formData.order_qty,
      received_qty: formData.received_qty,
      damaged: formData.damaged,
      missing: missing_qty,
      rejected: rejected_qty,
      net_qty: net_qty
    };
    
    console.log("Saving updated inbound data:", updatedData);
 
    if (onSave) {
      onSave(updatedData);
    }
    
    // Close the modal
    onClick();
  };

  if (!show) return null;

  // Use the passed names directly instead of looking them up
  const displaySupplierName = supplier_name || suppliers?.find(s => s.supplier_id === supplier_id)?.supplier_name || supplier_id;
  const displayProductName = product_name || products?.find(p => p.item_id === product_id)?.name || product_id;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Edit Inbound Item</h2>

        <div className="space-y-4">
          {/* Non-editable fields */}
          <div className="grid grid-cols-2 gap-4">
            <h1 className="font-semibold">Supplier</h1>
            <div className="border rounded-md p-2 bg-gray-100 text-gray-700">
              {displaySupplierName}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <h1 className="font-semibold">Product</h1>
            <div className="border rounded-md p-2 bg-gray-100 text-gray-700">
              {displayProductName}
            </div>
          </div>

          {/* Editable fields */}
          {Object.keys(formData).map((key) => {
            return (
              <div key={key} className="grid grid-cols-2 gap-4">
                <h1 className="font-semibold">{getLabel(key)}</h1>
                <div>
                  <EditInboundInput
                    label={getLabel(key)}
                    value={formData[key]}
                    type={typeof formData[key] === "number" ? "number" : "text"}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                  />
                  {errors[key] && (
                    <p className="text-red-500 text-xs mt-1">{errors[key]}</p>
                  )}
                </div>
              </div>
            );
          })}

          {/* Calculated fields (read-only) */}
          <div className="grid grid-cols-2 gap-4">
            <h1 className="font-semibold">Missing</h1>
            <div className="border rounded-md p-2 bg-gray-100 text-gray-700">
              {missing_qty}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <h1 className="font-semibold">Rejected</h1>
            <div className="border rounded-md p-2 bg-gray-100 text-gray-700">
              {rejected_qty}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <h1 className="font-semibold">Net Quantity</h1>
            <div className="border rounded-md p-2 bg-gray-100 text-gray-700">
              {net_qty}
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <button
            onClick={handleSave}
            className={`px-4 py-2 rounded ${
              Object.keys(errors).length > 0 
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            disabled={Object.keys(errors).length > 0}
          >
            Save
          </button>
          <button
            onClick={onClick}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditInboundPopup;