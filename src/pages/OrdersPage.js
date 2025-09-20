import OrderItemTile from "../components/OrderItemTile";
import { useState, useEffect } from "react";
import OrderItemDetails from "../components/OrderItemDetails";
import OrderTableHeader from "../components/OrderTableHeader";
import OrderFilterButtons from "../components/OrderFilterButtons";
import addCircleIcon from "../assets/add_circle_icon.png";
import { getAllOrders } from "../services/OrderService.js";
import { getAllRetailers } from "../services/RetailerService.js";
import { useRole } from "../hooks/useRole.js";

function OrdersPage({ onNavigate }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState("all");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [retailers, setRetailers] = useState([]);
  const { roleId } = useRole();

  // Fetch retailers
  useEffect(() => {
    const fetchRetailers = async () => {
      try {
        const { data, error } = await getAllRetailers();
        if (error) {
          console.error('Error fetching retailers:', error);
        } else {
          setRetailers(data || []);
        }
      } catch (error) {
        console.error('Error fetching retailers:', error);
      }
    };
    fetchRetailers();
  }, []);

  // Fetch orders from Supabase
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const { data, error } = await getAllOrders();
        
        if (error) {
          console.error('Error fetching orders:', error);
        } else {
          setOrders(data || []);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Function to determine order status based on approved_by and billed_by
  const getOrderStatus = (order) => {
    if (order.isRejected) {
      return "rejected"; // Rejected - red color
    }
    if (!order.approved_by && !order.isRejected) {
      return "progress"; // Waiting for approval - yellow color
    } 
    if (!order.billed_by && !order.isRejected) {
      return "ready"; // Ready for shipping - green color
    }
    if (order.isShipped) {
      return "shipped"; // Shipped - dark green color
    }
    if (order.billed_by && !order.isRejected) {
      return "paid"; // Paid - blue color
    } 
  };

  // Function to get retailer name by ID
  const getRetailerName = (retailerId) => {
    const retailer = retailers.find(r => r.retailer_id === retailerId);
    return retailer ? retailer.name : `Retailer ${retailerId}`;
  };

  // Function to get retailer location by ID
  const getRetailerLocation = (retailerId) => {
    const retailer = retailers.find(r => r.retailer_id === retailerId);
    return retailer ? retailer.location : "Location not available";
  };

  // Function to format order data for display
  const formatOrderForDisplay = (order) => {
    const status = getOrderStatus(order);
    const formattedDate = new Date(order.created_at).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit'
    });

    return {
      order_id: `#${order.order_id}`,
      cust_id: order.retailer?.name || getRetailerName(order.retailer_id), // Use retailer name from order or fallback
      amount: order.total_amount ? order.total_amount.toFixed(2) : "0.00",
      date: formattedDate,
      status: status,
      originalOrder: order
    };
  };

  const handleOrderClick = (formattedOrder) => {
    const { originalOrder } = formattedOrder;
    const status = getOrderStatus(originalOrder);
    const formattedDate = new Date(originalOrder.created_at).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit'
    });

    // Debug logging
    console.log('Original order:', originalOrder);
    console.log('Order retailer data:', originalOrder.retailer);
    console.log('Retailer ID:', originalOrder.retailer_id);
    console.log('All retailers:', retailers);

    // Get retailer location - try multiple approaches
    let retailerLocation = "Location not available";
    
    // First try to get from the order's retailer data
    if (originalOrder.retailer?.location) {
      retailerLocation = originalOrder.retailer.location;
      console.log('Using retailer location from order data:', retailerLocation);
    } 
    // Fallback to looking up by retailer_id
    else if (originalOrder.retailer_id) {
      retailerLocation = getRetailerLocation(originalOrder.retailer_id);
      console.log('Using retailer location from lookup:', retailerLocation);
    }

    console.log('Final retailer location:', retailerLocation);

    setSelectedOrder({ 
      cust_id: originalOrder.retailer?.name || getRetailerName(originalOrder.retailer_id),
      order_id: originalOrder.order_id,
      amount: originalOrder.total_amount ? originalOrder.total_amount.toFixed(2) : "0.00",
      status: status,
      date: formattedDate,
      orderItems: originalOrder.order_items || [],
      retailerLocation: retailerLocation
    });
    setShowModal(true);
  };

  const columns = [
    { field: "order_id", label: "order_ID" },
    { field: "cust_id", label: "Retailer" },
    { field: "amount", label: "Amount" },
    { field: "date", label: "Date Ordered" },
    { field: "status", label: "Status"},
  ];

  const filters = [
    {
      value: "all",
      label: "All Orders"
    },
    {
      value: "progress",
      label: "In Progress"
    },
    {
      value: "ready",
      label: "Ready For Shipping"
    },
    {
      value: "paid",
      label: "Paid"
    },
    {
      value: "rejected",
      label: "Rejected"
    },
  ];

  // Filter orders based on selected filter
  const filteredOrders = filter !== "all" 
    ? orders.filter(order => getOrderStatus(order) === filter)
    : orders;

  const displayOrders = filteredOrders.map(formatOrderForDisplay);

  if (loading) {
    return (
      <div className="col-span-16 h-screen flex items-center justify-center">
        <div className="text-lg">Loading orders...</div>
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
                <h1 className="font font-semibold text-lg mb-2">Orders</h1>
                <div className="flex justify-between items-center mb-3">
                  <OrderFilterButtons
                    currentFilter={filter}
                    onFilterChange={setFilter}
                    filters={filters}
                  />
                  {roleId === 1 && (
                    <button 
                    onClick={() => onNavigate("createOrder")}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold"
                  >
                    <img src={addCircleIcon} alt="Add" className="w-5 h-5" />
                    Add Order
                  </button>
                  )}
                </div>
                <OrderTableHeader columns={columns} />

                <div className="overflow-y-auto max-h-150">
                  {displayOrders.map((order, index) => (
                    <OrderItemTile
                      key={order.order_id + index}
                      columns={columns}
                      order={order}
                      onClick={() => handleOrderClick(order)}
                    />
                  ))}
                  {displayOrders.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No orders found
                    </div>
                  )}
                  {showModal && selectedOrder && (
                    <OrderItemDetails
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
    </div>
  );
}

export default OrdersPage;