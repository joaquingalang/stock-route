import ProductSample from "../assets/product_sample.png";
import SubtractCircleIcon from "../assets/minus_circle_icon.png";
import AddCircleIcon from "../assets/add_circle_icon.png";
import OrderDetailsTile from "./OrderDetailsTile";

function OrderDetailsList() {

    return (
        <div className="bg-[#FFFFFF] rounded-xl shadow-2xl">
            <div className="px-6 py-4">

                <p className="text-xl font-semibold mb-3">Order Details</p>

                <div className="flex justify-between">
                    <p className="text-sm font-semibold text-gray-500 mb-2">4 Item Select</p>
                    <p className="text-sm text-[#D72A1D] cursor-pointer">Clear All</p>
                </div>

                <OrderDetailsTile></OrderDetailsTile>
                <OrderDetailsTile></OrderDetailsTile>
                <OrderDetailsTile></OrderDetailsTile>

            </div>

        </div>
    );
}

export default OrderDetailsList;