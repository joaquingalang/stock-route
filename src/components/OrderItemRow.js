function OrderItemRow({ itemName, quantity, amount }) {
  return (
    <div className="grid grid-cols-3 gap-3 p-2 bg-[#EAEAEA] w-full text-center">
      <span>{itemName}</span>
      <span>{quantity}</span>
      <span>₱{amount}</span>
    </div>
  );
}

export default OrderItemRow;