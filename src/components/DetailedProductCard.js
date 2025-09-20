import CloseIcon from "../assets/close_icon.png";

function DetailedProductCard({onClose, image, name, id, desc, quantity, unitPrice, category, createdAt, updatedAt}) {

    let quantityStatus = "";
    let backgroundColor = "";

    if (quantity === 0) {
        quantityStatus = "Out of Stock";
        backgroundColor = "bg-[#D72A1D]";
    } else if (quantity >= 1 && quantity <= 5) {
        quantityStatus = "Low in Stock";
        backgroundColor = "bg-[#CCD042]";
    } else {
        quantityStatus = "In Stock";
        backgroundColor = "bg-[#60A32D]";
    }

    // formatter for PHP currency
    const currencyFormatter = new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    // Get the latest update date (updatedAt if available, otherwise createdAt)
    const getLatestUpdateDate = () => {
        return updatedAt || createdAt;
    };

    return (
        <div className="sticky top-20 w-full">
            <div onClick={() => onClose()} className="bg-white rounded-2xl p-1 absolute -right-2 -top-2 cursor-pointer">
                <img src={CloseIcon} className="w-6"/>
            </div>
            <img src={image || "/placeholder-image.png"} className="object-cover rounded-t-xl w-full h-60"></img>
            <div className="bg-white w-full rounded-b-xl shadow-2xl">
                <div className="p-5">
                    <p className="text-xl font-semibold mb-2">{name || "N/A"}</p>
                    <p className="text-sm text-gray-500 font-regular mb-1">Product ID: <span className="font-semibold text-[#293A7A]">{id || "N/A"}</span></p>
                    <p className="text-sm text-gray-500 font-regular mb-1">Description: <span className="font-semibold text-[#293A7A]">{desc || "N/A"}</span></p>
                    <div className="flex items-center mb-1">
                        <p className="text-sm text-gray-500 font-regular mr-3">Status: </p>
                        <div className={"rounded-lg px-2 py-0.5 " + backgroundColor}>
                            <p className="text-sm text-white font-semibold">{quantityStatus}</p>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 font-regular">Quantity in Stock: <span className="font-semibold text-[#293A7A] ml-2">{quantity || 0} Units</span></p>
                    <div className="flex items-center mb-1">
                        <p className="text-sm text-gray-500 font-regular mr-3">Category: </p>
                        <div className={"rounded-lg px-2 py-0.5 bg-[#E6C4C4]"}>
                            <p className="text-sm text-[#D72A1D] font-semibold">{category || "N/A"}</p>
                        </div>
                    </div>

                    <hr className="my-3 bg-[#D9D9D9] h-px border-none"></hr>

                    <p className="text-xl font-semibold mb-2">Price</p>
                    <p className="text-sm text-gray-500 font-regular">
                        Unit Price:
                        <span className="font-semibold text-[#293A7A] ml-2">
                            {unitPrice ? currencyFormatter.format(unitPrice) : "₱0.00"}
                        </span>
                    </p>

                    <hr className="my-3 bg-[#D9D9D9] h-px border-none"></hr>

                    <p className="text-xl font-semibold mb-2">History</p>
                    <p className="text-sm text-gray-500 font-regular">Date Added: <span className="font-semibold text-[#293A7A] ml-2">{formatDate(createdAt)}</span></p>
                    <p className="text-sm text-gray-500 font-regular">Last Updated: <span className="font-semibold text-[#293A7A] ml-2">{formatDate(getLatestUpdateDate())}</span></p>

                </div>
            </div>
        </div>
    );
}

export default DetailedProductCard;