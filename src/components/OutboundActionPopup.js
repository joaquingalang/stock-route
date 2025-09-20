import { useState } from "react";

function OutboundActionPopup({
  show,
  onClose,
  onShip,
  orderData = {},
  allOrderItems = []
}) {
  const [loading, setLoading] = useState(false);

  const handleShip = async () => {
    setLoading(true);
    try {
      await onShip();
      onClose();
    } catch (error) {
      console.error('Error shipping order:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate total quantity for all items in this order
  const totalQuantity = allOrderItems.reduce((sum, item) => sum + item.order_qty, 0);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-6 text-center">Ship Order</h2>
        
        {/* Order Header Details */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-3">Order Summary</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium">Order ID:</span>
              <p className="text-gray-700">{orderData.order_id}</p>
            </div>
            <div>
              <span className="font-medium">Retailer:</span>
              <p className="text-gray-700">{orderData.retailer_name}</p>
            </div>
            <div>
              <span className="font-medium">Total Items:</span>
              <p className="text-gray-700">{allOrderItems.length}</p>
            </div>
            <div className="col-span-3">
              <span className="font-medium">Total Quantity:</span>
              <p className="text-gray-700">{totalQuantity}</p>
            </div>
          </div>
        </div>

        {/* Order Items List */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Items to Ship</h3>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium">Item ID</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Product</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Quantity</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {allOrderItems.map((item, index) => (
                  <tr key={item.order_item_id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-2 text-sm">{item.order_item_id}</td>
                    <td className="px-4 py-2 text-sm">{item.product_name}</td>
                    <td className="px-4 py-2 text-sm">{item.order_qty}</td>
                    <td className="px-4 py-2 text-sm">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleShip}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Shipping..." : "Ship All Items"}
          </button>
        </div>

        {/* Warning Message */}
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> This action will mark the entire order as shipped and update stock quantities for all items.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OutboundActionPopup;