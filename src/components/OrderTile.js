import checkIcon from "../assets/check_icon.png";
import clockIcon from "../assets/clock_icon.png";
import completedIcon from "../assets/completed_icon.png";

function OrderTile({ id, name, quantity, status }) {
  let idBackgroundColor = id % 2 === 0 ? "bg-[#293A7A]" : "bg-[#E36A61]";

  let statusText = "";
  let statusBackgroundColor = "";
  let statusTextColor = "";
  let statusIcon = "";

  switch (status.toLowerCase()) {
    case "ready":
      statusText = "Ready";
      statusBackgroundColor = "bg-[#60A32D]";
      statusTextColor = "text-[#3C7B0C]";
      statusIcon = checkIcon;
      break;
    case "in progress": // <- matches your data better
    case "progress":
      statusText = "In Progress";
      statusBackgroundColor = "bg-[#CCD042]";
      statusTextColor = "text-[#7B6A0C]";
      statusIcon = clockIcon;
      break;
    case "completed":
      statusText = "Completed";
      statusBackgroundColor = "bg-[#6C7EC2]";
      statusTextColor = "text-[#293A7A]";
      statusIcon = completedIcon;
      break;
    default:
      statusText = "Unknown";
      statusBackgroundColor = "bg-gray-300";
      statusTextColor = "text-gray-700";
      statusIcon = "";
  }

  return (
    <div className="flex justify-between mb-3">
      <div className="flex">
        <div
          className={`w-12 h-12 rounded-md flex justify-center items-center mr-5 ${idBackgroundColor}`}
        >
          <h1 className="text-sm font-bold text-white">{`E${id}`}</h1>
        </div>

        <div className="flex flex-col justify-between">
          <h1 className="text-sm font-semibold">{name}</h1>
          <h1 className="text-xs mb-2">{`${quantity} Items`}</h1>
        </div>
      </div>

      <div className={`${statusBackgroundColor} rounded-md my-2 cursor-default`}>
        <div className="flex justify-center items-center h-[100%] mx-2">
          {statusIcon && <img src={statusIcon} alt="" className="mr-1" />}
          <h1 className={`${statusTextColor} text-xs font-semibold`}>
            {statusText}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default OrderTile;
