import OrderDetailsTile from "./OrderDetailsTile";

function OrderDetailsList({ cart, onUpdateQuantity, onRemoveFromCart, onClearCart }) {

    return (
        <div className="bg-[#FFFFFF] rounded-xl shadow-2xl">
            <div className="px-6 py-4">
                <p className="text-xl font-semibold mb-3">Order Details</p>

                <div className="flex justify-between">
                    <p className="text-sm font-semibold text-gray-500 mb-2">
                        {cart.length} Item{cart.length !== 1 ? 's' : ''} Select
                    </p>
                    {cart.length > 0 && (
                        <p 
                            className="text-sm text-[#D72A1D] cursor-pointer"
                            onClick={onClearCart}
                        >
                            Clear All
                        </p>
                    )}
                </div>

                {cart.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No items in cart</p>
                ) : (
                    cart.map(item => (
                        <OrderDetailsTile
                            key={item.item_id}
                            item={item}
                            onUpdateQuantity={onUpdateQuantity}
                            onRemoveFromCart={onRemoveFromCart}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default OrderDetailsList;