// OrderTableHeader.js
function OrderTableHeader() {
  return (
    <div className="grid grid-cols-5 gap-4 p-4 mb-3 shadow-2xl rounded-lg items-center bg-[#D9D9D9] border border-[#000000]">
      <h1 className="font-semibold">order_ID</h1>
      <h1 className="font-semibold">customer_ID</h1>
      <h1 className="font-semibold">Amount</h1>
      <h1 className="font-semibold">Date Ordered</h1>
      <h1 className="font-semibold text-center">Status</h1>
    </div>
  );
}

export default OrderTableHeader;