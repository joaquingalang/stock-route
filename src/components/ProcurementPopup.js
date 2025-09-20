import { useState, useEffect } from "react";
import EditInboundInput from "./EditInboundInput";
import NewSupplyDropdown from "./NewSupplyDropdown";
import { getItemsBySupplier } from "../services/WarehouseService";
import { getAllSuppliers } from "../services/SupplierService";

function ProcurementPopup({
  show,
  onClose,
  onClick,
  suppliers: propSuppliers, 
  products: propProducts, 
}) {
  const [suppliers, setSuppliers] = useState([]);
  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [errors, setErrors] = useState({});

  // Initialize state without missing and rejected (they will be calculated)
  const [formData, setFormData] = useState({
    supplier_id: "",
    product_id: "",
    order_qty: 0,
    received_qty: 0,
    damaged: 0,
  });

  // Fetch suppliers from Supabase when component mounts
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const result = await getAllSuppliers();
        if (result.error) {
          console.error('Error fetching suppliers:', result.error);
          // Fallback to prop suppliers if API fails
          setSuppliers(propSuppliers || []);
        } else {
          setSuppliers(result.data || []);
        }
      } catch (error) {
        console.error('Error fetching suppliers:', error);
        // Fallback to prop suppliers if API fails
        setSuppliers(propSuppliers || []);
      }
    };

    if (show) {
      fetchSuppliers();
      // Clear form and errors when popup opens
      setFormData({
        supplier_id: "",
        product_id: "",
        order_qty: 0,
        received_qty: 0,
        damaged: 0,
      });
      setErrors({});
    }
  }, [show, propSuppliers]);

  // Fetch items when supplier is selected
  useEffect(() => {
    const fetchItems = async () => {
      if (!formData.supplier_id) {
        setItems([]);
        return;
      }

      setLoadingItems(true);
      try {
        const result = await getItemsBySupplier(formData.supplier_id);
        if (result.error) {
          console.error('Error fetching items:', result.error);
          setItems([]);
        } else {
          setItems(result.data || []);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
        setItems([]);
      } finally {
        setLoadingItems(false);
      }
    };

    fetchItems();
  }, [formData.supplier_id]);

  function getLabel(data) {
    switch (data) {
      case "supplier_id":
        return "Supplier";
      case "product_id":
        return "Product";
      case "order_qty":
        return "Order Quantity";
      case "received_qty":
        return "Received Quantity";
      case "damaged":
        return "Damaged";
      default:
        return data;
    }
  }

  const validateForm = () => {
    const newErrors = {};

    // Validate required fields
    if (!formData.supplier_id) {
      newErrors.supplier_id = "Please select a supplier";
    }

    if (!formData.product_id) {
      newErrors.product_id = "Please select a product";
    }

    // Validate received quantity doesn't exceed order quantity
    if (parseInt(formData.received_qty) > parseInt(formData.order_qty)) {
      newErrors.received_qty = "Received quantity cannot exceed order quantity";
    }

    // Validate damaged quantity doesn't exceed received quantity
    if (parseInt(formData.damaged) > parseInt(formData.received_qty)) {
      newErrors.damaged = "Damaged quantity cannot exceed received quantity";
    }

    // Validate non-negative values
    if (parseInt(formData.order_qty) <= 0) {
      newErrors.order_qty = "Order quantity must be greater than 0";
    }

    if (parseInt(formData.received_qty) < 0) {
      newErrors.received_qty = "Received quantity cannot be negative";
    }

    if (parseInt(formData.damaged) < 0) {
      newErrors.damaged = "Damaged quantity cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    const numValue = field === "supplier_id" || field === "product_id" ? value : (parseInt(value) || 0);
    
    setFormData((prev) => ({
      ...prev,
      [field]: numValue,
    }));

    // If supplier changes, reset product selection and clear related errors
    if (field === "supplier_id") {
      setFormData((prev) => ({
        ...prev,
        [field]: numValue,
        product_id: "", // Reset product when supplier changes
      }));
    }

    // Clear error for this field when user starts typing/selecting
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

    // Calculate missing and rejected values
    const missing = formData.order_qty - formData.received_qty;
    const rejected = formData.damaged;
    const net_qty = formData.order_qty - missing - formData.damaged;
    
    const completeFormData = {
      ...formData,
      missing: missing,
      rejected: rejected,
      net_qty: net_qty,
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

        <div className="space-y-4">
          {Object.keys(formData).map((key) => {
            console.log(`Rendering field: ${key}`);
            return (
              <div key={key} className="flex flex-col gap-2">
                <label className="font-semibold text-sm">{getLabel(key)}</label>
                {key === "supplier_id" ? (
                  <div>
                    <NewSupplyDropdown
                      suppliers={suppliers}
                      placeholder="Select Supplier"
                      onSelect={(supplier) =>
                        handleInputChange(key, supplier.supplier_id)
                      }
                    />
                    {errors[key] && (
                      <p className="text-red-500 text-xs mt-1">{errors[key]}</p>
                    )}
                  </div>
                ) : key === "product_id" ? (
                  <div>
                    {!formData.supplier_id ? (
                      <div className="w-32 border rounded-md p-2 text-sm text-gray-500 bg-gray-100">
                        Select supplier first
                      </div>
                    ) : loadingItems ? (
                      <div className="w-32 border rounded-md p-2 text-sm text-gray-500">
                        Loading items...
                      </div>
                    ) : items.length === 0 ? (
                      <div className="w-32 border rounded-md p-2 text-sm text-gray-500">
                        No items available
                      </div>
                    ) : (
                      <NewSupplyDropdown
                        suppliers={items.map(item => ({
                          product_id: item.item_id,
                          product_name: item.name,
                          unit_price: item.unit_price
                        }))}
                        placeholder="Select Product"
                        onSelect={(product) =>
                          handleInputChange(key, product.product_id)
                        }
                      />
                    )}
                    {errors[key] && (
                      <p className="text-red-500 text-xs mt-1">{errors[key]}</p>
                    )}
                  </div>
                ) : (
                  <div>
                    <EditInboundInput
                      label=""
                      value={formData[key]}
                      type={typeof formData[key] === "number" ? "number" : "text"}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                    />
                    {errors[key] && (
                      <p className="text-red-500 text-xs mt-1">{errors[key]}</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Display calculated values */}
        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <h4 className="font-semibold text-sm mb-2">Calculated Values:</h4>
          <div className="text-sm text-gray-600">
            <div>Missing: {formData.order_qty - formData.received_qty}</div>
            <div>Rejected: {formData.damaged}</div>
            <div>Net Quantity: {formData.order_qty - (formData.order_qty - formData.received_qty) - formData.damaged}</div>
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