function OrderItemTile({ columns, order, onClick }) {
  return (
    <button
      onClick={() =>
        onClick(
          order.cust_id,
          order.order_id,
          order.amount,
          order.status,
          order.date
        )
      }
      type="button"
      className="w-full"
    >
      <div
        className={`grid grid-cols-${columns.length} gap-4 items-center mb-5 p-4 bg-[#FFFFFF] h-[100%] rounded-md shadow-2xl hover:bg-gray-100`}
      >
        {columns.map((col, index) => {
          if (col.field === "status") {
            let statusText = "";
            let statusBg = "";
            switch ((order.status || "").toLowerCase()) {
              case "ready":
                statusText = "Ready For Shipping";
                statusBg = "bg-[#60A32D]";
                break;
              case "progress":
                statusText = "In Progress";
                statusBg = "bg-[#CCD042]";
                break;
              case "completed":
                statusText = "Completed";
                statusBg = "bg-[#6C7EC2]";
                break;
              case "paid":
                statusText = "Paid";
                statusBg = "bg-[#74D71D]";
                break;
              case "pending":
                statusText = "In Progress";
                statusBg = "bg-[#D7891D]";
                break;
              case "cancelled":
                statusText = "Cancelled";
                statusBg = "bg-[#EA8D8D]";
                break;
                 case "shipped":
                statusText = "Shipped";
                statusBg = "bg-[#3C7B0C]";
                break;
                 case "partial":
                statusText = "Partial";
                statusBg = "bg-[#D7891D]";
                break;
                 case "returned":
                statusText = "Returned";
                statusBg = "bg-[#6C7EC2]";
                break;
              default:
                statusText = order.status;
                statusBg = "bg-gray-400";
            }
            return (
              <div
                key={index}
                className={
                  statusBg + " min-w-[120px] rounded-xl py-1 self-center"
                }
              >
                <div className="flex justify-center items-center h-[100%]">
                  <h1 className="text-white text-center font-semibold">
                    {statusText}
                  </h1>
                </div>
              </div>
            );
          }
          return <h1 key={index}>{order[col.field]}</h1>;
        })}
      </div>
    </button>
  );
}

export default OrderItemTile;
