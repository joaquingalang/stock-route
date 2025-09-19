import OrderItemTile from "../components/OrderItemTile";
import { useState, useEffect } from "react";
import ApprovalItemDetails from "../components/ApprovalItemDetails";
import OrderTableHeader from "../components/OrderTableHeader";
import OrderFilterButtons from "../components/OrderFilterButtons";
import { useAuth } from "../contexts/AuthContext";
import { getBillingOrders, billOrder, cancelOrder } from "../services/OrderService";

function BillingPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState("all");
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Fetch billing orders from Supabase
  useEffect(() => {
    const fetchBillingOrders = async () => {
      try {
        setLoading(true);
        const { data, error } = await getBillingOrders();
        if (error) {
          console.error('Error fetching billing orders:', error);
        } else {
          setBills(data || []);
        }
      } catch (error) {
        console.error('Error fetching billing orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBillingOrders();
  }, []);

  const handleOrderClick = (order) => {
    setSelectedOrder({
      cust_id: order.retailer?.name || "Unknown",
      order_id: order.order_id,
      amount: order.total_amount?.toFixed(2) || "0.00",
      status: order.billed_by ? "paid" : "pending",
      date: new Date(order.created_at).toLocaleDateString(),
      orderItems: order.order_items || []
    });
    setShowModal(true);
  };

  const handleApprove = async () => {
    if (!selectedOrder || !user) return;

    try {
      const { error } = await billOrder(selectedOrder.order_id, user.id);
      if (error) {
        console.error('Error billing order:', error);
        alert('Failed to bill order. Please try again.');
      } else {
        // Update local state
        setBills(prevBills => 
          prevBills.map(bill => 
            bill.order_id === selectedOrder.order_id 
              ? { ...bill, billed_by: user.id, status: "paid" }
              : bill
          )
        );
        setShowModal(false);
        alert('Order billed successfully!');
      }
    } catch (error) {
      console.error('Error billing order:', error);
      alert('Failed to bill order. Please try again.');
    }
  };

  const handleCancel = async () => {
    if (!selectedOrder) return;

    try {
      const { error } = await cancelOrder(selectedOrder.order_id);
      if (error) {
        console.error('Error cancelling order:', error);
        alert('Failed to cancel order. Please try again.');
      } else {
        // Update local state
        setBills(prevBills => 
          prevBills.map(bill => 
            bill.order_id === selectedOrder.order_id 
              ? { ...bill, isCancelled: true, status: "cancelled" }
              : bill
          )
        );
        setShowModal(false);
        alert('Order cancelled successfully!');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('Failed to cancel order. Please try again.');
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const columns = [
    { field: "order_id", label: "Order ID" },
    { field: "retailer", label: "Customer" },
    { field: "total_amount", label: "Amount" },
    { field: "created_at", label: "Date Ordered" },
    { field: "status", label: "Status" },
  ];

  const filters = [
    {
      value: "all",
      label: "All Bills"
    },
    {
      value: "paid",
      label: "Paid"
    },
    {
      value: "pending", 
      label: "Pending"
    },
    {
      value: "cancelled",
      label: "Cancelled"
    },
  ];

  // Transform data for display
  const transformedBills = bills.map(bill => ({
    order_id: bill.order_id,
    retailer: bill.retailer?.name || "Unknown",
    total_amount: bill.total_amount?.toFixed(2) || "0.00",
    created_at: new Date(bill.created_at).toLocaleDateString(),
    status: bill.isCancelled ? "cancelled" : (bill.billed_by ? "paid" : "pending")
  }));

  if (loading) {
    return (
      <div className="col-span-16 h-screen flex justify-center items-center">
        <div className="text-lg">Loading billing orders...</div>
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
                <h1 className="font font-semibold text-3xl mb-5">Billing</h1>
                <OrderFilterButtons
                  currentFilter={filter}
                  onFilterChange={setFilter}
                  filters={filters}
                />
                <OrderTableHeader columns={columns} />

                <div className="overflow-y-auto max-h-150">
                  {(filter !== "all"
                    ? transformedBills.filter((bill) => bill.status === filter)
                    : transformedBills
                  ).map((bill, idx) => (
                    <OrderItemTile
                      key={bill.order_id + idx}
                      columns={columns}
                      order={bill}
                      onClick={() => handleOrderClick(bills.find(b => b.order_id === bill.order_id))}
                    />
                  ))}
                  {showModal && selectedOrder && (
                    <ApprovalItemDetails
                      show={showModal}
                      action="Billing"
                      onClick={() => setShowModal(false)}
                      onApprove={handleApprove}
                      onCancel={handleCancel}
                      onClose={handleClose}
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

export default BillingPage;