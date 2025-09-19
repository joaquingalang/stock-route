import OrderItemTile from "../components/OrderItemTile";
import { useState, useEffect } from "react";
import ApprovalItemDetails from "../components/ApprovalItemDetails";
import OrderTableHeader from "../components/OrderTableHeader";
import { getPendingApprovalOrders, approveOrder, rejectOrder } from "../services/OrderService.js";
import { getAllRetailers } from "../services/RetailerService.js";
import { useAuth } from "../contexts/AuthContext.js";

function ApprovalsPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState("all");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [retailers, setRetailers] = useState([]);
  const { user } = useAuth();

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

  // Fetch pending approval orders from Supabase
  useEffect(() => {
    const fetchPendingOrders = async () => {
      try {
        setLoading(true);
        const { data, error } = await getPendingApprovalOrders();
        
        if (error) {
          console.error('Error fetching pending orders:', error);
        } else {
          setOrders(data || []);
        }
      } catch (error) {
        console.error('Error fetching pending orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingOrders();
  }, []);

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
    const formattedDate = new Date(order.created_at).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit'
    });

    return {
      order_id: `#${order.order_id}`,
      cust_id: order.retailer?.name || getRetailerName(order.retailer_id),
      amount: order.total_amount ? order.total_amount.toFixed(2) : "0.00",
      date: formattedDate,
      items: order.order_items?.length || 0,
      originalOrder: order
    };
  };

  const handleOrderClick = (formattedOrder) => {
    const { originalOrder } = formattedOrder;
    const formattedDate = new Date(originalOrder.created_at).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit'
    });

    // Get retailer location
    const retailerLocation = originalOrder.retailer?.location || getRetailerLocation(originalOrder.retailer_id);

    setSelectedOrder({ 
      cust_id: originalOrder.retailer?.name || getRetailerName(originalOrder.retailer_id),
      order_id: originalOrder.order_id,
      amount: originalOrder.total_amount ? originalOrder.total_amount.toFixed(2) : "0.00",
      date: formattedDate,
      orderItems: originalOrder.order_items || [],
      retailerLocation: retailerLocation,
      originalOrder: originalOrder
    });
    setShowModal(true);
  };

  const handleApprove = async () => {
    try {
      const { error } = await approveOrder(selectedOrder.originalOrder.order_id, user.id);
      if (error) {
        console.error('Error approving order:', error);
        alert('Failed to approve order. Please try again.');
      } else {
        alert('Order approved successfully!');
        setShowModal(false);
        // Refresh the orders list
        window.location.reload();
      }
    } catch (error) {
      console.error('Error approving order:', error);
      alert('Failed to approve order. Please try again.');
    }
  };

  const handleReject = async () => {
    try {
      const { error } = await rejectOrder(selectedOrder.originalOrder.order_id);
      if (error) {
        console.error('Error rejecting order:', error);
        alert('Failed to reject order. Please try again.');
      } else {
        alert('Order rejected successfully!');
        setShowModal(false);
        // Refresh the orders list
        window.location.reload();
      }
    } catch (error) {
      console.error('Error rejecting order:', error);
      alert('Failed to reject order. Please try again.');
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const columns = [
    { field: "order_id", label: "order_ID" },
    { field: "cust_id", label: "customer_ID"},
    { field: "amount", label: "Amount"},
    { field: "date", label: "Date Ordered"},
    { field: "items", label: "Items"},
  ];

  const filters = [
    {
      value: "all",
      label: "All Orders"
    }
  ];

  if (loading) {
    return (
      <div className="col-span-16 h-screen flex items-center justify-center">
        <div className="text-lg">Loading pending orders...</div>
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
                <h1 className="font font-semibold text-lg mb-2">New Orders</h1>
                <OrderTableHeader columns={columns} />

                <div className="overflow-y-auto max-h-150">
                  {orders.map((order, idx) => {
                    const formattedOrder = formatOrderForDisplay(order);
                    return (
                      <OrderItemTile
                        key={order.order_id + idx}
                        columns={columns}
                        order={formattedOrder}
                        onClick={() => handleOrderClick(formattedOrder)}
                      />
                    );
                  })}
                  {orders.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No pending orders found
                    </div>
                  )}
                  {showModal && selectedOrder && (
                    <ApprovalItemDetails
                      show={showModal}
                      onClick={() => setShowModal(false)}
                      onApprove={handleApprove}
                      onReject={handleReject}
                      onCancel={handleCancel}
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

export default ApprovalsPage;