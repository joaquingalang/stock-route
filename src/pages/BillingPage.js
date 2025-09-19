import OrderItemTile from "../components/OrderItemTile";
import { useState } from "react";
import ApprovalItemDetails from "../components/ApprovalItemDetails";
import OrderTableHeader from "../components/OrderTableHeader";
import OrderFilterButtons from "../components/OrderFilterButtons";

function ApprovalsPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState("all");

  const handleOrderClick = (cust_id, order_id, amount, status, date) => {
    setSelectedOrder({ cust_id, order_id, amount, status, date });
    setShowModal(true);
  };

  const columns = [
    { field: "order_id", label: "order_ID" },
    { field: "cust_id", label: "customer_ID"},
    { field: "amount", label: "Amount"},
    { field: "date", label: "Date Ordered"},
    { field: "status", label: "Status"},
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

  const [bills, setBills] = useState([
    {
      order_id: "#23DFDS",
      cust_id: "E23",
      amount: "508.59",
      date: "01/27/23",
      status: "paid"
    },
    {
      order_id: "#23TRES",
      cust_id: "E58",
      amount: "508.59",
      date: "01/30/23",
    status: "pending"
    },
    {
      order_id: "#23DFDS",
      cust_id: "E78",
      amount: "508.59",
      date: "01/02/23",
      status: "cancelled"
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
                 <OrderFilterButtons
        currentFilter={filter}
        onFilterChange={setFilter}
        filters={filters}
      />
                <OrderTableHeader columns={columns} />

                <div className="overflow-y-auto max-h-150">
                  {(filter !== "all"
                    ? bills.filter((order) => order.status === filter)
                    : bills
                  ).map((bill, idx) => (
                    <OrderItemTile
                    key={bill.order_id + idx}
                      columns={columns}
                      order={bill}
                      onClick={handleOrderClick}
                    />
                  ))}
                  {showModal && selectedOrder && (
                    <ApprovalItemDetails
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

export default ApprovalsPage;
