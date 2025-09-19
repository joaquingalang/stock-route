import ClipboardIcon from "../assets/green_clipboard_icon.png";

function ProductCard({onClick, isSelected, image, name, id, desc, quantity}) {

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

    return (
        <div onClick={() => onClick()} className="cursor-pointer">
            <img src={image} className="object-cover rounded-t-xl w-full h-60"></img>
            <div className={"bg-white w-full h-50 rounded-b-xl shadow-2xl " + (isSelected && "border-x-2 border-b-2 border-[#D72A1D]")}>
                <div className="p-5">
                    <p className="text-xl font-semibold mb-2">{name}</p>
                    <p className="text-sm text-gray-500 font-regular mb-1">Product ID: <span className="font-semibold text-[#293A7A]">{id}</span></p>
                    <p className="text-sm text-gray-500 font-regular mb-1">Description: <span className="font-semibold text-[#293A7A]">{desc}</span></p>
                    <div className="flex items-center mb-1">
                        <div className={"w-2 h-2 rounded-md ml-0.75 mr-3 mt-0.4 " + backgroundColor}></div>
                        <p className="text-sm text-gray-500 font-regular">{quanityStatus}</p>
                    </div>
                    <div className="flex items-center">
                        <img src={ClipboardIcon} className="w-3.5 mr-2"/>
                        <p className="text-sm text-gray-500 font-regular">Quantity in Stock: <span span className="font-semibold text-[#293A7A] ml-2">{quantity} Units</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;