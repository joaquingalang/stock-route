function OrderTile({ id, name, quantity, status }) {
  let idBackgroundColor = id % 2 === 0 ? "bg-[#293A7A]" : "bg-[#E36A61]";

  let statusText = "";
  let statusBackgroundColor = "";
  let statusTextColor = "";
  let statusIcon = "";

  switch ((status || "").toLowerCase()) {
    case "ready":
      statusText = "Approved";
      statusBackgroundColor = "bg-[#60A32D]";
      statusTextColor = "text-white";
      break;
    case "progress":
      statusText = "In Progress";
      statusBackgroundColor = "bg-[#CCD042]";
      statusTextColor = "text-white";
      break;
    case "paid":
      statusText = "Paid";
      statusBackgroundColor = "bg-[#6C7EC2]";
      statusTextColor = "text-white";
      break;
    case "pending":
      statusText = "In Progress";
      statusBackgroundColor = "bg-[#D7891D]";
      statusTextColor = "text-white";
      break;
    case "cancelled":
      statusText = "Cancelled";
      statusBackgroundColor = "bg-[#EA8D8D]";
      statusTextColor = "text-white";
      statusIcon = "";
      break;
    case "rejected":
      statusText = "Rejected";
      statusBackgroundColor = "bg-[#DC2626]";
      statusTextColor = "text-white"; 
      break;
    case "shipped":
      statusText = "Shipped";
      statusBackgroundColor = "bg-[#3C7B0C]";
      statusTextColor = "text-white";
      break;
    default:
      statusText = status || "Unknown";
      statusBackgroundColor = "bg-gray-400";
      statusTextColor = "text-white";
  }

  return (
    <div className="flex justify-between mb-3">
      <div className="flex">
        <div
          className={`w-12 h-12 rounded-md flex justify-center items-center mr-5 ${idBackgroundColor}`}
        >
          <h1 className="text-sm font-bold text-white">{`${id}`}</h1>
        </div>

        <div className="flex flex-col justify-between">
          <h1 className="text-sm font-semibold">{name}</h1>
          <h1 className="text-xs mb-2">{`${quantity} Items`}</h1>
        </div>
      </div>

      <div className={`${statusBackgroundColor} rounded-md my-2 cursor-default`}>
        <div className="flex justify-center items-center h-[100%] mx-2">
          <h1 className={`${statusTextColor} text-xs font-semibold`}>
            {statusText}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default OrderTile;