import OrderItemRow from "./OrderItemRow";

function ApprovalItemDetails({
  show,
  onClick,
  cust_id,
  order_id,
  amount,
  date,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h1 className="font-bold">Approval Request</h1>
            <h1 className="font-bold">Order ID: {order_id}</h1>
          </div>
          <div className="col-span-3 bg-[#eff6ff] border-1 border-[#d1e5ff] rounded-md p-3">
            <h2 className="font-bold text-[#1c39ab]">Pending Approval</h2>
            <h3 className="text-[#1c39ab]">This request requires your approval to proceed.</h3>
          </div>

          <div className="flex justify-between col-span-3">
            <div>
              <h1 className="font-semibold">Requested By</h1>
              <h1>{cust_id}</h1>
              <h1 className="font-semibold pt-3">Location</h1>
              <h1 className="max-w-xs break-words">
                Blk 12 Lot 8, Mabini Street, Brgy. San Isidro Quezon City, Metro
                Manila, 1105 Philippines
              </h1>
            </div>
            <div>
              <h1 className="text-end font-semibold">Request Date</h1>
              <h1 className="text-end">{date}</h1>
            </div>
          </div>
        
        <hr className="col-span-3"></hr>
        <div className="col-span-3">
          <div className="grid grid-cols-3 gap-3 p-3 bg-[#D9D9D9] rounded-t-md text-center">
            <h1>Order Items</h1>
            <h1>Quantity</h1>
            <h1>Amount</h1>
          </div>

          {/* The more orders, the more rows here. */}
          <div className="rounded-b-md overflow-y-auto max-h-50">
            <OrderItemRow itemName="Joaquin" quantity="1" amount="5" />
            <OrderItemRow itemName="Aaron" quantity="5" amount="254.29" />
            <OrderItemRow itemName="Kyle" quantity="10" amount="-2" />
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
            className="mt-4 px-4 py-2 bg-red-500 text-red-400 rounded bg-white border-1 border-red- hover:bg-red-200 hover:text-black text-red-400"
            onClick={onClick}
          >
            Decline
          </button>
          <button
            className="mt-4 px-4 py-2 text-white bg-[#293A7A] rounded border-1 hover:bg-blue-500"
            onClick={onClick}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ApprovalItemDetails;
