import ProductSample from "../assets/product_sample.png";
import SubtractCircleIcon from "../assets/minus_circle_icon.png";
import AddCircleIcon from "../assets/add_circle_icon.png";

function OrderDetailsTile({ item, onUpdateQuantity, onRemoveFromCart }) {
    const { item_id, image_url, name, unit_price, quantity, stock_quantity } = item;

    // formatter for PHP currency
    const currencyFormatter = new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    const handleIncreaseQuantity = () => {
        onUpdateQuantity(item_id, quantity + 1);
    }

    const handleDecreaseQuantity = () => {
        onUpdateQuantity(item_id, quantity - 1);
    }

    const subtotal = unit_price * quantity;
    const isMaxQuantity = quantity >= stock_quantity;

    return (
        <div className="w-full mb-4 grid grid-cols-3">
            <div className="col-span-1 w-25 h-25 rounded-xl border border-gray-300 shadow-md flex justify-center items-center">
                <img src={image_url || ProductSample} alt={name} className="w-full h-full object-cover rounded-xl"/>
            </div>
            <div className="col-span-2 flex flex-col">
                <p className="font-semibold">{name}</p>
                <div className="flex justify-between mb-5">
                    <p className="font-semibold text-gray-500">Quantity</p>
                    <div className="w-25 flex justify-between items-center">
                        <img 
                            src={SubtractCircleIcon} 
                            className="w-6 h-6 cursor-pointer" 
                            onClick={handleDecreaseQuantity}
                            alt="Decrease quantity"
                        />
                        <p className="mx-2">{quantity}</p>
                        <img 
                            src={AddCircleIcon} 
                            className={`w-6 h-6 ${isMaxQuantity ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                            onClick={isMaxQuantity ? undefined : handleIncreaseQuantity}
                            alt={isMaxQuantity ? "Maximum quantity reached" : "Increase quantity"}
                        />
                    </div>
                </div>
                <div className="flex justify-between">
                    <p className="font-semibold text-gray-500">Subtotal</p>
                    <p className="font-semibold">{currencyFormatter.format(subtotal)}</p>
                </div>
                {isMaxQuantity && (
                    <p className="text-xs text-red-500 mt-1">Max quantity reached</p>
                )}
            </div>
        </div>
    );
}

export default OrderDetailsTile;