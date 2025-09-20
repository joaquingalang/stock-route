import OrderItemTile from "../components/OrderItemTile";
import { useState, useEffect } from "react";
import OrderTableHeader from "../components/OrderTableHeader";
import WarehouseTabs from "../components/WarehouseTabs";
import EditInboundPopup from "../components/EditInboundPopup";
import ProcurementPopup from "../components/ProcurementPopup";
import OutboundActionPopup from "../components/OutboundActionPopup";
import { 
  getInboundData, 
  getOutboundData, 
  getStockData, 
  updateInboundData,
  createProcurementOrder,
  updateOrderShippingStatus,
  getSuppliers,
  getItems
} from "../services/WarehouseService";
import { useAuth } from "../contexts/AuthContext";

function WarehousePage() {
  const [showModal, setShowModal] = useState(false);
  const [showProcurementModal, setShowProcurementModal] = useState(false);
  const [showOutboundModal, setShowOutboundModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOutboundOrder, setSelectedOutboundOrder] = useState(null);
  const [selectedOutboundItems, setSelectedOutboundItems] = useState([]);
  const [activeTab, setActiveTab] = useState("inbound");
  const [loading, setLoading] = useState(true);
  
  // Data states
  const [inboundData, setInboundData] = useState([]);
  const [outboundData, setOutboundData] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  
  const { user } = useAuth();

  // Function to fetch all data
  const fetchAllData = async () => {
    try {
      setLoading(true);
      
      // Fetch all data in parallel
      const [inboundResult, outboundResult, stockResult, suppliersResult, itemsResult] = await Promise.all([
        getInboundData(),
        getOutboundData(),
        getStockData(),
        getSuppliers(),
        getItems()
      ]);

      if (inboundResult.error) {
        console.error('Error fetching inbound data:', inboundResult.error);
      } else {
        setInboundData(inboundResult.data || []);
      }

      if (outboundResult.error) {
        console.error('Error fetching outbound data:', outboundResult.error);
      } else {
        setOutboundData(outboundResult.data || []);
      }

      if (stockResult.error) {
        console.error('Error fetching stock data:', stockResult.error);
      } else {
        setStockData(stockResult.data || []);
      }

      if (suppliersResult.error) {
        console.error('Error fetching suppliers:', suppliersResult.error);
      } else {
        setSuppliers(suppliersResult.data || []);
      }

      if (itemsResult.error) {
        console.error('Error fetching items:', itemsResult.error);
      } else {
        setProducts(itemsResult.data || []);
      }

    } catch (error) {
      console.error('Error fetching warehouse data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchAllData();
  }, []);

  // Fetch data when tab changes
  useEffect(() => {
    if (!loading) { // Only refresh if not initial load
      fetchAllData();
    }
  }, [activeTab]);

  // Column definitions
  const inboundColumns = [
    { field: "po_id", label: "Product Order ID" },
    { field: "supplier_name", label: "Supplier Name" },
    { field: "product_name", label: "Product Name" },
    { field: "order_qty", label: "Ordered Qty" },
    { field: "received_qty", label: "Received Qty" },
    { field: "damaged", label: "Damaged" },
    { field: "missing", label: "Missing" },
    { field: "rejected", label: "Rejected" },
  ];

  const outboundColumns = [
    { field: "order_item_id", label: "Order Item ID" },
    { field: "order_id", label: "Order ID" },
    { field: "retailer_name", label: "Retailer Name" },
    { field: "product_name", label: "Product Name" },
    { field: "order_qty", label: "Ordered Qty" },
    { field: "status", label: "Status" },
  ];

  const stockColumns = [
    { field: "product_name", label: "Product Name" },
    { field: "product_id", label: "Product ID" },
    { field: "available_stock", label: "Available Stock" },
    { field: "last_updated", label: "Last Updated" },
  ];

  const handleOrderClick = (order) => {
    if (activeTab === "inbound") {
      setSelectedOrder({
        po_id: order.po_id,
        supplier_id: order.supplier_id,
        supplier_name: order.supplier_name,
        product_id: order.product_id,
        product_name: order.product_name,
        order_qty: order.order_qty,
        received_qty: order.received_qty,
        damaged: order.damaged || 0,
        missing: order.missing || 0,
        rejected: order.rejected || 0,
      });
      setShowModal(true);
    } else if (activeTab === "outbound") {
      // Find all order items with the same order_id
      const allItemsForOrder = outboundData.filter(item => item.order_id === order.order_id);
      
      setSelectedOutboundOrder({
        order_id: order.order_id,
        retailer_name: order.retailer_name,
      });
      setSelectedOutboundItems(allItemsForOrder);
      setShowOutboundModal(true);
    }
    // Add handling for stock tab if needed
  };

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

  // Handle inbound data update
  const handleInboundUpdate = async (updatedData) => {
    try {
      const result = await updateInboundData(selectedOrder.po_id, selectedOrder.product_id, updatedData);
      if (result.error) {
        console.error('Error updating inbound data:', result.error);
        alert(`Error: ${result.error.message || result.error}`);
        return;
      }

      // Update local state
      setInboundData((prev) =>
        prev.map((item) =>
          item.po_id === selectedOrder.po_id && item.product_id === selectedOrder.product_id
            ? { ...item, ...updatedData }
            : item
        )
      );
      setShowModal(false);
    } catch (error) {
      console.error('Error updating inbound data:', error);
      alert(`Error: ${error.message}`);
    }
  };

  // Handle new procurement order creation
  const handleNewProcurement = async (newProcurementData) => {
    try {
      const procurementData = {
        ...newProcurementData,
        created_by: user?.id
      };

      const result = await createProcurementOrder(procurementData);
      if (result.error) {
        console.error('Error creating procurement order:', result.error);
        alert(`Error: ${result.error.message || result.error}`);
        return;
      }

      // Refresh all data to get updated stock quantities
      await fetchAllData();
      
      setShowProcurementModal(false);
    } catch (error) {
      console.error('Error creating procurement order:', error);
      alert(`Error: ${error.message}`);
    }
  };

  // Handle outbound shipping
  const handleShipOrder = async () => {
    try {
      const result = await updateOrderShippingStatus(selectedOutboundOrder.order_id);
      if (result.error) {
        console.error('Error updating shipping status:', result.error);
        alert(`Error: ${result.error.message || result.error}`);
        return;
      }

      // Refresh outbound data to show updated status
      await fetchAllData();
      
      console.log(`Order ${selectedOutboundOrder.order_id} marked as shipped`);
    } catch (error) {
      console.error('Error shipping order:', error);
      alert(`Error: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="col-span-16 h-screen flex items-center justify-center">
        <div className="text-xl">Loading warehouse data...</div>
      </div>
    );
  }

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
                      key={value.po_id || value.order_item_id || value.product_id}
                      columns={columns}
                      order={value}
                      onClick={handleOrderClick}
                    />
                  ))}
                </div>

                {/* Inbound Edit Modal */}
                {showModal && selectedOrder && activeTab === "inbound" && (
                  <EditInboundPopup
                    show={showModal}
                    suppliers={suppliers}
                    products={products}
                    onClick={() => setShowModal(false)}
                    onSave={handleInboundUpdate}
                    {...selectedOrder}
                  />
                )}

                {/* Procurement Modal */}
                {showProcurementModal && (
                  <ProcurementPopup
                    show={showProcurementModal}
                    suppliers={suppliers}
                    products={products}
                    inboundDataLength={inboundData.length}
                    onClose={() => setShowProcurementModal(false)}
                    onClick={handleNewProcurement}
                  />
                )}

                {/* Outbound Action Modal */}
                {showOutboundModal && selectedOutboundOrder && selectedOutboundItems.length > 0 && activeTab === "outbound" && (
                  <OutboundActionPopup
                    show={showOutboundModal}
                    orderData={selectedOutboundOrder}
                    allOrderItems={selectedOutboundItems}
                    onClose={() => setShowOutboundModal(false)}
                    onShip={handleShipOrder}
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