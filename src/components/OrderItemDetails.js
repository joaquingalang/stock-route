import OrderItemRow from "./OrderItemRow";

function OrderItemDetails({
  show,
  onClick,
  cust_id,
  order_id,
  amount,
  status,
  date,
  orderItems = [],
  retailerLocation = "Location not available"
}) {

  let statusText = "";
  let statusBg = "";

  // Use the orderItems prop instead of hardcoded data
  const orders = orderItems.map(item => ({
    itemName: item.items?.name || "Unknown Item",
    quantity: item.quantity.toString(),
    amount: item.total_price?.toFixed(2) || "0.00",
  }));

  if (!show) return null;

  function setStatusDetails() {
    let cleaned = status.toLowerCase();
    switch (cleaned) {
      case "ready":
        statusText = "Approved";
        statusBg = "bg-[#60A32D]";
        break;
      case "progress":
        statusText = "In Progress";
        statusBg = "bg-[#CCD042]";
        break;
      case "paid":
        statusText = "Paid";
        statusBg = "bg-[#6C7EC2]";
        break;
      case "rejected":
        statusText = "Rejected";
        statusBg = "bg-[#DC2626]";
        break;
      case "cancelled":
        statusText = "Cancelled";
        statusBg = "bg-[#EA8D8D]";
        break;
      case "shipped":
        statusText = "Shipped";
        statusBg = "bg-[#3C7B0C]";
        break;
      default:
        statusText = cleaned;
        statusBg = "bg-gray-500";
    }
  }

  setStatusDetails();

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="grid grid-cols-3 gap-8">
          <h1 className="font-bold text-l">Order ID: {order_id}</h1>
          <hr className="col-span-3"></hr>
          <div className="flex justify-between col-span-3">
            <div>
              <h1 className="text-xs font-semibold text-gray-400">BILL TO</h1>
              <h1 className="font-bold text-xl">{cust_id}</h1>
              <h1 className="text-xs font-semibold text-gray-400 mt-2">
                Location
              </h1>
              <h1 className="max-w-xs break-words">
                {retailerLocation}
              </h1>
            </div>
            <div>
              <h1 className="text-end text-xs font-semibold text-gray-400">
                ORDER DATE
              </h1>
              <h1 className="text-end font-bold text-xl">{date}</h1>
              <div
                className={
                  statusBg + " min-w-[80px] rounded-sm py-1 self-center mt-7"
                }
              >
                <div className="justify-center items-center h-[100%] p-1">
                  <h1 className="text-white text-center">{statusText}</h1>
                </div>
              </div>
            </div>
          </div>

          <hr className="col-span-3"></hr>
          <div className="col-span-3">
            <div className="grid grid-cols-3 gap-3 p-3 bg-[#D9D9D9] rounded-t-md text-center">
              <h1 className="text-gray-500 font-semibold">Order Items</h1>
              <h1 className="text-gray-500 font-semibold">Quantity</h1>
              <h1>Amount</h1>
            </div>

            {/* Display actual order items */}
            <div className="rounded-b-md overflow-y-auto max-h-50">
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <OrderItemRow
                    key={`${order_id}-item-${index}`}
                    itemName={order.itemName}
                    quantity={order.quantity}
                    amount={order.amount}
                  />
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No items found
                </div>
              )}
            </div>
          </div>

          <hr className="col-span-3"></hr>
          <div className="flex justify-between col-span-3">
            <h1 className="font-bold">Total</h1>
            <h1 className="font-bold">₱{amount}</h1>
          </div>
          <div></div>
          <div className="col-span-2 flex justify-end gap-3">
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded bg-[#D72A1D]"
              onClick={onClick}
            >
              Close
            </button>
            <button
              className="mt-4 px-4 py-2 border border-solid border-black text-black rounded"
              onClick={onClick}
            >
              Print Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderItemDetails;