import CloseIcon from "../assets/close_icon.png";

function DetailedProductCard({onClose, image, name, id, desc, quantity, costPrice, sellPrice, createdAt, updatedAt}) {

    let quanityStatus = "";
    let backgroundColor = "";

    if (quantity === 0) {
        quanityStatus = "Out of Stock";
        backgroundColor = "bg-[#D72A1D]";
    } else if (quantity >= 1 && quantity <= 5) {
        quanityStatus = "Low in Stock";
        backgroundColor = "bg-[#CCD042]";
    } else {
        quanityStatus = "In Stock";
        backgroundColor = "bg-[#60A32D]";
    }

    // formatter for PHP currency
    const currencyFormatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    });


    return (
        <div className="sticky top-20 w-full">
            <div onClick={() => onClose()} className="bg-white rounded-2xl p-1 absolute -right-2 -top-2 cursor-pointer">
                <img src={CloseIcon} className="w-6"/>
            </div>
            <img src={image} className="object-cover rounded-t-xl w-full h-60"></img>
            <div className="bg-white w-full rounded-b-xl shadow-2xl">
                <div className="p-5">
                    <p className="text-xl font-semibold mb-2">{name}</p>
                    <p className="text-sm text-gray-500 font-regular mb-1">Product ID: <span className="font-semibold text-[#293A7A]">PRD-{id}</span></p>
                    <p className="text-sm text-gray-500 font-regular mb-1">Description: <span className="font-semibold text-[#293A7A]">{desc}</span></p>
                    <div className="flex items-center mb-1">
                        <p className="text-sm text-gray-500 font-regular mr-3">Status: </p>
                        <div className={"rounded-lg px-2 py-0.5 " + backgroundColor}>
                            <p className="text-sm text-white font-semibold">{quanityStatus}</p>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 font-regular">Quantity in Stock: <span span className="font-semibold text-[#293A7A] ml-2">{quantity} Units</span></p>
                    <div className="flex items-center mb-1">
                        <p className="text-sm text-gray-500 font-regular mr-3">Category: </p>
                        <div className={"rounded-lg px-2 py-0.5 bg-[#E6C4C4]"}>
                            <p className="text-sm text-[#D72A1D] font-semibold">Clothes</p>
                        </div>
                    </div>

                    <hr className="my-3 bg-[#D9D9D9] h-px border-none"></hr>

                    <p className="text-xl font-semibold mb-2">Price</p>
                    <p className="text-sm text-gray-500 font-regular">
                    Cost Price:
                    <span className="font-semibold text-[#293A7A] ml-2">
                        {currencyFormatter.format(costPrice)}
                    </span>
                    </p>

                    <p className="text-sm text-gray-500 font-regular">
                    Selling Price:
                    <span className="font-semibold text-[#293A7A] ml-2">
                        {currencyFormatter.format(sellPrice)}
                    </span>
                    </p>


                    <hr className="my-3 bg-[#D9D9D9] h-px border-none"></hr>

                    <p className="text-xl font-semibold mb-2">History</p>
                    <p className="text-sm text-gray-500 font-regular">Date Added: <span span className="font-semibold text-[#293A7A] ml-2">{createdAt}</span></p>
                    <p className="text-sm text-gray-500 font-regular mb-2">Last Updated: <span span className="font-semibold text-[#293A7A] ml-2">{updatedAt}</span></p>

                </div>
            </div>
        </div>
    );
}

export default DetailedProductCard;