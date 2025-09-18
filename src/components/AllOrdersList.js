import OrderItemTile from "./OrderItemTile";
import { useState } from "react";
import OrderItemDetails from "./OrderItemDetails";
import OrderTableHeader from "./OrderTableHeader";
import OrderFilterButtons from "./OrderFilterButtons";

function AllOrdersList() {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState("all");

  const handleOrderClick = (cust_id, order_id, amount, status, date) => {
    setSelectedOrder({ cust_id, order_id, amount, status, date });
    setShowModal(true);
  };
 
  const [orders, setOrders] = useState([
    {
      order_id: "#23DFDS",
      cust_id: "E23",
      amount: "508.59",
      date: "01/27/23",
      status: "ready",
    },
    {
      order_id: "#23TRES",
      cust_id: "E58",
      amount: "508.59",
      date: "01/30/23",
      status: "progress",
    },
    {
      order_id: "#23DFDS",
      cust_id: "E78",
      amount: "508.59",
      date: "01/02/23",
      status: "completed",
    },
  ]);

  return (
    <div className="col-span-12 row-span-10 p-4">
      <OrderFilterButtons currentFilter={filter} onFilterChange={setFilter}/>
      <OrderTableHeader/>
      <div className="overflow-y-auto max-h-150">
        {filter !== "all"
          ? orders
              .filter((order) => order.status === filter)
              .map((order) => (
                <OrderItemTile
                  order_id={order.order_id}
                  cust_id={order.cust_id}
                  amount={order.amount}
                  date={order.date}
                  status={order.status}
                  onClick={handleOrderClick}
                />
              ))
          : orders.map((order) => (
              <OrderItemTile
                order_id={order.order_id}
                cust_id={order.cust_id}
                amount={order.amount}
                date={order.date}
                status={order.status}
                onClick={handleOrderClick}
              />
            ))}
        {showModal && selectedOrder && (
          <OrderItemDetails
            show={showModal}
            onClick={() => setShowModal(false)}
            {...selectedOrder}
          />
        )}
      </div>
    </div>
  );
}

export default AllOrdersList;
