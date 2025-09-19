import ProductSample from "../assets/product_sample.png";
import SubtractCircleIcon from "../assets/minus_circle_icon.png";
import AddCircleIcon from "../assets/add_circle_icon.png";

function OrderDetailsTile(onAdd, onSubtract, image=ProductSample, name="Product Name", quantity=0, price=0) {

    // formatter for PHP currency
    const currencyFormatter = new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return (
        <div className="w-full mb-4 grid grid-cols-3">
            <div className="col-span-1 w-25 h-25 rounded-xl border border-gray-300 shadow-md flex justify-center items-center">
                <img src={image}/>
            </div>
            <div className="col-span-2 flex flex-col">
                <p className="font-semibold">{name}</p>
                <div className="flex justify-between mb-5">
                    <p className="font-semibold text-gray-500">Quantity</p>
                    <div className="w-25 flex justify-between">
                        <img src={SubtractCircleIcon} className="w-6 h-6 cursor-pointer"/>
                        <p>{quantity}</p>
                        <img src={AddCircleIcon} className="w-6 h-6 cursor-pointer"/>
                    </div>
                </div>
                <div className="flex justify-between">
                    <p className="font-semibold text-gray-500">Subtotal</p>
                    <p className="font-semibold">{currencyFormatter.format(price)}</p>
                </div>
            </div>

        </div>
    );
}

export default OrderDetailsTile;