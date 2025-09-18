function OrderItemTile({ order_id, cust_id, amount, date, status, onClick }) {
  let statusText = "";
  let statusBg = "";

  function setStatusDetails() {
    let cleaned = status.toLowerCase();
    switch (cleaned) {
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
    }
  }

  setStatusDetails();

  return (
    <button
      onClick={() => onClick(cust_id, order_id, amount, status, date)}
      type="button"
      className="w-full"
    >
      <div className="grid grid-cols-5 text-left gap-4 items-center mb-5 p-4 bg-[#FFFFFF] h-[100%] rounded-md shadow-2xl hover:bg-gray-100">
        <h1>{order_id}</h1>
        <h1>${cust_id}</h1>
        <h1>${amount}</h1>
        <h1>{date}</h1>

        <div
          className={statusBg + " min-w-[120px] rounded-xl py-1 self-center"}
        >
          <div className=" flex justify-center items-center h-[100%]">
            <h1 className="text-white text- font-semibold">{statusText}</h1>
          </div>
        </div>
      </div>
    </button>
  );
}

export default OrderItemTile;
